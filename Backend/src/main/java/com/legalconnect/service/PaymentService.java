package com.legalconnect.service;

import com.legalconnect.config.RazorpayConfig;
import com.legalconnect.dto.CreateOrderRequest;
import com.legalconnect.dto.CreateOrderResponse;
import com.legalconnect.dto.PaymentDto;
import com.legalconnect.dto.VerifyPaymentRequest;
import com.legalconnect.entity.ConsultationEntity;
import com.legalconnect.entity.LawyerEntity;
import com.legalconnect.entity.PaymentEntity;
import com.legalconnect.entity.UserEntity;
import com.legalconnect.entity.enums.PaymentStatus;
import com.legalconnect.entity.enums.UserRole;
import com.legalconnect.exception.BadRequestException;
import com.legalconnect.exception.ForbiddenException;
import com.legalconnect.exception.ResourceNotFoundException;
import com.legalconnect.repository.ConsultationRepository;
import com.legalconnect.repository.LawyerRepository;
import com.legalconnect.repository.PaymentRepository;
import com.legalconnect.repository.UserRepository;
import com.legalconnect.security.UserPrincipal;
import com.razorpay.Order;
import com.razorpay.Payment;
import com.razorpay.RazorpayException;
import com.razorpay.Utils;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class PaymentService {

    private static final Logger logger = LoggerFactory.getLogger(PaymentService.class);

    private final PaymentRepository paymentRepository;
    private final ConsultationRepository consultationRepository;
    private final LawyerRepository lawyerRepository;
    private final UserRepository userRepository;
    private final RazorpayConfig razorpayConfig;

    public PaymentService(
            PaymentRepository paymentRepository,
            ConsultationRepository consultationRepository,
            LawyerRepository lawyerRepository,
            UserRepository userRepository,
            RazorpayConfig razorpayConfig) {

        this.paymentRepository = paymentRepository;
        this.consultationRepository = consultationRepository;
        this.lawyerRepository = lawyerRepository;
        this.userRepository = userRepository;
        this.razorpayConfig = razorpayConfig;
    }

    /**
     * Create Razorpay Order for a consultation.
     * Only authenticated USER role can create orders for their own consultations.
     * The fee is strictly retrieved from the database lawyer record (never trusted from frontend).
     */
    @Transactional
    public CreateOrderResponse createOrder(CreateOrderRequest request, Authentication authentication) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();

        if (userPrincipal.getRole() != UserRole.USER) {
            throw new ForbiddenException("Only clients can initiate payments for consultations");
        }

        UserEntity user = userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        ConsultationEntity consultation = consultationRepository.findById(request.getConsultationId())
                .orElseThrow(() -> new ResourceNotFoundException("Consultation not found"));

        if (!consultation.getUserId().equals(user.getId())) {
            throw new ForbiddenException("You can only pay for your own consultation requests");
        }

        // Check if consultation is already successfully paid
        Optional<PaymentEntity> existingSuccess = paymentRepository
                .findFirstByConsultationIdAndStatusOrderByCreatedAtDesc(consultation.getId(), PaymentStatus.SUCCESS);
        if (existingSuccess.isPresent()) {
            throw new BadRequestException("This consultation has already been paid for");
        }

        // Fetch lawyer record to get actual consultation fee
        LawyerEntity lawyer = lawyerRepository.findById(consultation.getLawyerId())
                .orElseGet(() -> lawyerRepository.findByLawyerCode(consultation.getLawyerId())
                        .orElseThrow(() -> new ResourceNotFoundException("Lawyer not found for this consultation")));

        Double fee = lawyer.getConsultationFee();
        if (fee == null || fee <= 0) {
            fee = 500.0; // fallback minimum fee in INR if unconfigured
        }

        // Convert INR to paise (1 INR = 100 paise)
        long amountInPaise = Math.round(fee * 100);

        try {
            JSONObject orderRequest = new JSONObject();
            orderRequest.put("amount", amountInPaise);
            orderRequest.put("currency", "INR");

            // Receipt max 40 chars
            String receipt = "lc_" + UUID.randomUUID().toString().replace("-", "").substring(0, 16);
            orderRequest.put("receipt", receipt);

            JSONObject notes = new JSONObject();
            notes.put("consultationId", consultation.getId());
            notes.put("userId", user.getId());
            notes.put("lawyerId", lawyer.getId());
            notes.put("lawyerName", lawyer.getFullName());
            notes.put("platform", "LegalConnect");
            orderRequest.put("notes", notes);

            Order razorpayOrder = razorpayConfig.getClient().orders.create(orderRequest);
            String razorpayOrderId = razorpayOrder.get("id");

            // Save Payment record in database
            PaymentEntity payment = new PaymentEntity();
            payment.setId(UUID.randomUUID().toString());
            payment.setUserId(user.getId());
            payment.setConsultationId(consultation.getId());
            payment.setLawyerId(lawyer.getId());
            payment.setAmount(fee);
            payment.setAmountInPaise(amountInPaise);
            payment.setCurrency("INR");
            payment.setRazorpayOrderId(razorpayOrderId);
            payment.setStatus(PaymentStatus.CREATED);
            payment.setNotes("Consultation with " + lawyer.getFullName());
            payment.setCreatedAt(Instant.now());
            payment.setUpdatedAt(Instant.now());

            payment = paymentRepository.save(payment);

            logger.info("Created Razorpay TEST order {} for user {} consultation {} (Amount: INR {})",
                    razorpayOrderId, user.getId(), consultation.getId(), fee);

            CreateOrderResponse response = new CreateOrderResponse();
            response.setOrderId(razorpayOrderId);
            response.setAmount(fee);
            response.setAmountInPaise(amountInPaise);
            response.setCurrency("INR");
            response.setKeyId(razorpayConfig.getKeyId());
            response.setConsultationId(consultation.getId());
            response.setLawyerId(lawyer.getId());
            response.setLawyerName(lawyer.getFullName());
            response.setUserEmail(user.getEmail());
            response.setUserPhone(user.getPhone());
            response.setUserName(user.getFullName());
            response.setPaymentId(payment.getId());

            return response;

        } catch (RazorpayException e) {
            logger.error("Razorpay error creating order: {}", e.getMessage());
            throw new BadRequestException("Razorpay error: " + e.getMessage());
        }
    }

    /**
     * Verify payment signature and capture state.
     * Idempotent: safe against repeated calls.
     */
    @Transactional
    public PaymentDto verifyPayment(VerifyPaymentRequest request, Authentication authentication) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();

        PaymentEntity payment = paymentRepository.findByRazorpayOrderId(request.getRazorpayOrderId())
                .orElseThrow(() -> new ResourceNotFoundException("Payment record not found for order: " + request.getRazorpayOrderId()));

        if (!payment.getUserId().equals(userPrincipal.getId())) {
            throw new ForbiddenException("You can only verify your own payments");
        }

        // Idempotency: already marked SUCCESS
        if (payment.getStatus() == PaymentStatus.SUCCESS) {
            logger.info("Payment for order {} already verified successfully (idempotent return)", payment.getRazorpayOrderId());
            return mapToDto(payment);
        }

        // Verify Razorpay HMAC SHA-256 signature
        try {
            JSONObject options = new JSONObject();
            options.put("razorpay_order_id", request.getRazorpayOrderId());
            options.put("razorpay_payment_id", request.getRazorpayPaymentId());
            options.put("razorpay_signature", request.getRazorpaySignature());

            boolean isValidSignature = Utils.verifyPaymentSignature(options, razorpayConfig.getKeySecret());
            if (!isValidSignature) {
                payment.setStatus(PaymentStatus.FAILED);
                payment.setFailureReason("Signature verification failed");
                payment.setUpdatedAt(Instant.now());
                paymentRepository.save(payment);
                throw new BadRequestException("Invalid payment signature");
            }
        } catch (RazorpayException e) {
            payment.setStatus(PaymentStatus.FAILED);
            payment.setFailureReason("Signature verification exception: " + e.getMessage());
            payment.setUpdatedAt(Instant.now());
            paymentRepository.save(payment);
            throw new BadRequestException("Signature verification failed: " + e.getMessage());
        }

        // Fetch payment details directly from Razorpay API to confirm capture status
        String paymentMethod = "online";
        try {
            Payment razorpayPayment = razorpayConfig.getClient().payments.fetch(request.getRazorpayPaymentId());
            String rzpStatus = razorpayPayment.get("status");
            if (razorpayPayment.has("method") && razorpayPayment.get("method") != null) {
                paymentMethod = razorpayPayment.get("method").toString();
            }

            if (!"captured".equalsIgnoreCase(rzpStatus) && !"authorized".equalsIgnoreCase(rzpStatus)) {
                payment.setStatus(PaymentStatus.FAILED);
                payment.setFailureReason("Razorpay payment status is not captured: " + rzpStatus);
                payment.setUpdatedAt(Instant.now());
                paymentRepository.save(payment);
                throw new BadRequestException("Payment was not captured by Razorpay. Current status: " + rzpStatus);
            }
        } catch (RazorpayException e) {
            logger.warn("Could not fetch payment from Razorpay API, proceeding with signature verification: {}", e.getMessage());
        }

        // Payment successfully verified
        payment.setStatus(PaymentStatus.SUCCESS);
        payment.setRazorpayPaymentId(request.getRazorpayPaymentId());
        payment.setRazorpaySignature(request.getRazorpaySignature());
        payment.setPaymentMethod(paymentMethod);
        payment.setFailureReason(null);
        payment.setUpdatedAt(Instant.now());
        final PaymentEntity savedPayment = paymentRepository.save(payment);

        // Update Consultation payment status
        consultationRepository.findById(savedPayment.getConsultationId()).ifPresent(consultation -> {
            consultation.setPaymentStatus("PAID");
            consultation.setPaymentId(savedPayment.getId());
            consultationRepository.save(consultation);
            logger.info("Updated consultation {} paymentStatus to PAID", consultation.getId());
        });

        logger.info("Payment verified successfully: Payment ID {}, Order ID {}, Amount: INR {}",
                savedPayment.getId(), savedPayment.getRazorpayOrderId(), savedPayment.getAmount());

        return mapToDto(savedPayment);
    }

    /**
     * Process Razorpay Webhook.
     * Server-to-server request without JWT authentication.
     */
    @Transactional
    public void processWebhook(String rawPayload, String signatureHeader) {
        if (!razorpayConfig.isConfigured()) {
            logger.warn("Razorpay webhook received but credentials not configured");
            return;
        }

        String webhookSecret = razorpayConfig.getWebhookSecret();
        if (webhookSecret == null || webhookSecret.isEmpty()) {
            logger.warn("Razorpay webhook received but RAZORPAY_WEBHOOK_SECRET is not configured");
            throw new BadRequestException("Webhook secret not configured on server");
        }

        // Verify webhook signature
        try {
            boolean isValid = Utils.verifyWebhookSignature(rawPayload, signatureHeader, webhookSecret);
            if (!isValid) {
                logger.error("Invalid Razorpay webhook signature");
                throw new BadRequestException("Invalid webhook signature");
            }
        } catch (RazorpayException e) {
            logger.error("Razorpay webhook signature verification error: {}", e.getMessage());
            throw new BadRequestException("Webhook signature verification failed");
        }

        // Parse payload
        JSONObject payload = new JSONObject(rawPayload);
        String event = payload.optString("event");
        logger.info("Processing Razorpay webhook event: {}", event);

        JSONObject payloadData = payload.optJSONObject("payload");
        if (payloadData == null) {
            return;
        }

        JSONObject paymentEntityJson = null;
        if (payloadData.has("payment")) {
            JSONObject paymentObj = payloadData.optJSONObject("payment");
            if (paymentObj != null) {
                paymentEntityJson = paymentObj.optJSONObject("entity");
            }
        }

        if (paymentEntityJson == null) {
            return;
        }

        String orderId = paymentEntityJson.optString("order_id");
        String paymentId = paymentEntityJson.optString("id");
        String method = paymentEntityJson.optString("method");

        if (orderId == null || orderId.isEmpty()) {
            return;
        }

        Optional<PaymentEntity> paymentOpt = paymentRepository.findByRazorpayOrderId(orderId);
        if (paymentOpt.isEmpty()) {
            logger.warn("Webhook: no payment found for order {}", orderId);
            return;
        }

        PaymentEntity payment = paymentOpt.get();

        switch (event) {
            case "payment.captured":
                if (payment.getStatus() != PaymentStatus.SUCCESS) {
                    payment.setStatus(PaymentStatus.SUCCESS);
                    payment.setRazorpayPaymentId(paymentId);
                    if (method != null && !method.isEmpty()) {
                        payment.setPaymentMethod(method);
                    }
                    payment.setFailureReason(null);
                    payment.setUpdatedAt(Instant.now());
                    paymentRepository.save(payment);

                    consultationRepository.findById(payment.getConsultationId()).ifPresent(c -> {
                        c.setPaymentStatus("PAID");
                        c.setPaymentId(payment.getId());
                        consultationRepository.save(c);
                    });
                    logger.info("Webhook payment.captured: order {} updated to SUCCESS", orderId);
                }
                break;

            case "payment.failed":
                // Do not overwrite SUCCESS state with older failed events
                if (payment.getStatus() != PaymentStatus.SUCCESS) {
                    payment.setStatus(PaymentStatus.FAILED);
                    JSONObject errorObj = paymentEntityJson.optJSONObject("error");
                    String desc = errorObj != null ? errorObj.optString("description") : "Payment failed";
                    payment.setFailureReason(desc);
                    payment.setUpdatedAt(Instant.now());
                    paymentRepository.save(payment);
                    logger.info("Webhook payment.failed: order {} marked FAILED: {}", orderId, desc);
                }
                break;

            case "refund.processed":
                payment.setStatus(PaymentStatus.REFUNDED);
                payment.setUpdatedAt(Instant.now());
                paymentRepository.save(payment);
                logger.info("Webhook refund.processed: order {} marked REFUNDED", orderId);
                break;

            default:
                logger.debug("Webhook event {} ignored", event);
                break;
        }
    }

    /**
     * Get payment history for authenticated user.
     */
    public List<PaymentDto> getMyPayments(Authentication authentication) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        return paymentRepository.findByUserIdOrderByCreatedAtDesc(userPrincipal.getId())
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    /**
     * Get payment details by consultation ID.
     */
    public PaymentDto getPaymentByConsultation(String consultationId, Authentication authentication) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();

        ConsultationEntity consultation = consultationRepository.findById(consultationId)
                .orElseThrow(() -> new ResourceNotFoundException("Consultation not found"));

        // Access check: User who booked, Lawyer assigned, or Admin
        boolean isOwner = consultation.getUserId().equals(userPrincipal.getId());
        boolean isAdmin = userPrincipal.getRole() == UserRole.ADMIN;
        boolean isAssignedLawyer = userPrincipal.getRole() == UserRole.LAWYER &&
                lawyerRepository.findByUserId(userPrincipal.getId())
                        .map(l -> l.getId().equals(consultation.getLawyerId()))
                        .orElse(false);

        if (!isOwner && !isAdmin && !isAssignedLawyer) {
            throw new ForbiddenException("You do not have permission to view this payment");
        }

        PaymentEntity payment = paymentRepository.findByConsultationIdOrderByCreatedAtDesc(consultationId)
                .stream()
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException("No payment found for consultation: " + consultationId));

        return mapToDto(payment);
    }

    /**
     * Get payment by ID.
     */
    public PaymentDto getPaymentById(String paymentId, Authentication authentication) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();

        PaymentEntity payment = paymentRepository.findById(paymentId)
                .orElseThrow(() -> new ResourceNotFoundException("Payment not found"));

        if (!payment.getUserId().equals(userPrincipal.getId()) && userPrincipal.getRole() != UserRole.ADMIN) {
            throw new ForbiddenException("You do not have permission to view this payment");
        }

        return mapToDto(payment);
    }

    /**
     * Get all platform payments (Admin only).
     */
    public List<PaymentDto> getAllPayments(Authentication authentication) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        if (userPrincipal.getRole() != UserRole.ADMIN) {
            throw new ForbiddenException("Only admins can view all payments");
        }

        return paymentRepository.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    private PaymentDto mapToDto(PaymentEntity entity) {
        PaymentDto dto = new PaymentDto();
        dto.setId(entity.getId());
        dto.setUserId(entity.getUserId());
        dto.setConsultationId(entity.getConsultationId());
        dto.setLawyerId(entity.getLawyerId());
        dto.setAmount(entity.getAmount());
        dto.setAmountInPaise(entity.getAmountInPaise());
        dto.setCurrency(entity.getCurrency());
        dto.setRazorpayOrderId(entity.getRazorpayOrderId());
        dto.setRazorpayPaymentId(entity.getRazorpayPaymentId());
        dto.setStatus(entity.getStatus());
        dto.setPaymentMethod(entity.getPaymentMethod());
        dto.setFailureReason(entity.getFailureReason());
        dto.setCreatedAt(entity.getCreatedAt() != null ? entity.getCreatedAt().toString() : null);
        dto.setUpdatedAt(entity.getUpdatedAt() != null ? entity.getUpdatedAt().toString() : null);

        // Enrich with user and lawyer names
        userRepository.findById(entity.getUserId())
                .ifPresent(u -> dto.setUserName(u.getFullName()));

        lawyerRepository.findById(entity.getLawyerId())
                .ifPresent(l -> dto.setLawyerName(l.getFullName()));

        consultationRepository.findById(entity.getConsultationId())
                .ifPresent(c -> dto.setCaseTitle(c.getCaseTitle() != null ? c.getCaseTitle() : c.getDescription()));

        return dto;
    }
}
