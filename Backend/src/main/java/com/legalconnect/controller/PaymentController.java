package com.legalconnect.controller;

import com.legalconnect.config.RazorpayConfig;
import com.legalconnect.dto.CreateOrderRequest;
import com.legalconnect.dto.CreateOrderResponse;
import com.legalconnect.dto.PaymentDto;
import com.legalconnect.dto.VerifyPaymentRequest;
import com.legalconnect.service.PaymentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/payments")
@Tag(name = "Payments", description = "Razorpay TEST MODE payment integration endpoints")
public class PaymentController {

    private final PaymentService paymentService;
    private final RazorpayConfig razorpayConfig;

    public PaymentController(PaymentService paymentService, RazorpayConfig razorpayConfig) {
        this.paymentService = paymentService;
        this.razorpayConfig = razorpayConfig;
    }

    @GetMapping("/config")
    @Operation(summary = "Get Razorpay Public Configuration", description = "Returns public Key ID and currency for checkout initialization")
    public ResponseEntity<Map<String, Object>> getConfig() {
        Map<String, Object> config = new HashMap<>();
        config.put("keyId", razorpayConfig.getKeyId());
        config.put("currency", "INR");
        config.put("isConfigured", razorpayConfig.isConfigured());
        config.put("mode", "TEST");
        return ResponseEntity.ok(config);
    }

    @PostMapping("/create-order")
    @Operation(summary = "Create Razorpay Order", description = "Creates a Razorpay order for a consultation. Authenticated USER only.")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<CreateOrderResponse> createOrder(
            @Valid @RequestBody CreateOrderRequest request,
            Authentication authentication) {
        CreateOrderResponse response = paymentService.createOrder(request, authentication);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/verify")
    @Operation(summary = "Verify Payment", description = "Verifies Razorpay HMAC signature and confirms payment capture")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<PaymentDto> verifyPayment(
            @Valid @RequestBody VerifyPaymentRequest request,
            Authentication authentication) {
        PaymentDto payment = paymentService.verifyPayment(request, authentication);
        return ResponseEntity.ok(payment);
    }

    @PostMapping("/webhook")
    @Operation(summary = "Razorpay Webhook Endpoint", description = "Server-to-server webhook endpoint for payment event notifications. No JWT required.")
    public ResponseEntity<Map<String, String>> handleWebhook(
            @RequestBody String rawPayload,
            @RequestHeader(value = "X-Razorpay-Signature", required = false) String signatureHeader) {
        if (signatureHeader == null || signatureHeader.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("status", "error", "message", "Missing X-Razorpay-Signature header"));
        }
        paymentService.processWebhook(rawPayload, signatureHeader);
        return ResponseEntity.ok(Map.of("status", "success"));
    }

    @GetMapping("/my-payments")
    @Operation(summary = "Get My Payments", description = "Get list of payments made by the authenticated user")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<List<PaymentDto>> getMyPayments(Authentication authentication) {
        List<PaymentDto> payments = paymentService.getMyPayments(authentication);
        return ResponseEntity.ok(payments);
    }

    @GetMapping("/consultation/{consultationId}")
    @Operation(summary = "Get Consultation Payment", description = "Get payment details for a specific consultation")
    public ResponseEntity<PaymentDto> getPaymentByConsultation(
            @PathVariable String consultationId,
            Authentication authentication) {
        PaymentDto payment = paymentService.getPaymentByConsultation(consultationId, authentication);
        return ResponseEntity.ok(payment);
    }

    @GetMapping("/{paymentId}")
    @Operation(summary = "Get Payment Details", description = "Get details of an individual payment by ID")
    public ResponseEntity<PaymentDto> getPaymentById(
            @PathVariable String paymentId,
            Authentication authentication) {
        PaymentDto payment = paymentService.getPaymentById(paymentId, authentication);
        return ResponseEntity.ok(payment);
    }

    @GetMapping("/all")
    @Operation(summary = "Get All Payments", description = "Get all payments platform-wide (Admin only)")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<PaymentDto>> getAllPayments(Authentication authentication) {
        List<PaymentDto> payments = paymentService.getAllPayments(authentication);
        return ResponseEntity.ok(payments);
    }
}
