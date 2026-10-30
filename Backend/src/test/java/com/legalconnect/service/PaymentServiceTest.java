package com.legalconnect.service;

import com.legalconnect.config.RazorpayConfig;
import com.legalconnect.dto.CreateOrderRequest;
import com.legalconnect.dto.PaymentDto;
import com.legalconnect.dto.VerifyPaymentRequest;
import com.legalconnect.entity.ConsultationEntity;
import com.legalconnect.entity.PaymentEntity;
import com.legalconnect.entity.UserEntity;
import com.legalconnect.entity.enums.PaymentStatus;
import com.legalconnect.entity.enums.UserRole;
import com.legalconnect.exception.BadRequestException;
import com.legalconnect.exception.ForbiddenException;
import com.legalconnect.repository.ConsultationRepository;
import com.legalconnect.repository.LawyerRepository;
import com.legalconnect.repository.PaymentRepository;
import com.legalconnect.repository.UserRepository;
import com.legalconnect.security.UserPrincipal;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;

import java.time.Instant;
import java.util.Collections;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class PaymentServiceTest {

    @Mock
    private PaymentRepository paymentRepository;

    @Mock
    private ConsultationRepository consultationRepository;

    @Mock
    private LawyerRepository lawyerRepository;

    @Mock
    private UserRepository userRepository;

    private RazorpayConfig razorpayConfig;

    private PaymentService paymentService;

    private UserEntity user;
    private Authentication userAuth;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        razorpayConfig = new RazorpayConfig();

        paymentService = new PaymentService(
                paymentRepository,
                consultationRepository,
                lawyerRepository,
                userRepository,
                razorpayConfig
        );

        user = new UserEntity();
        user.setId("user-1");
        user.setEmail("user@demo.com");
        user.setFullName("Ananya Mehta");
        user.setRole(UserRole.USER);

        UserPrincipal principal = new UserPrincipal(
                user.getId(),
                user.getEmail(),
                "password",
                user.getRole(),
                user.getFullName(),
                Collections.emptyList()
        );
        userAuth = new UsernamePasswordAuthenticationToken(principal, null, principal.getAuthorities());
    }

    @Test
    @DisplayName("Should prevent duplicate payments on already paid consultation")
    void testAlreadyPaidConsultation() {
        CreateOrderRequest request = new CreateOrderRequest("consult-123");

        ConsultationEntity consultation = new ConsultationEntity();
        consultation.setId("consult-123");
        consultation.setUserId("user-1");

        PaymentEntity existingPayment = new PaymentEntity();
        existingPayment.setId("pay-1");
        existingPayment.setStatus(PaymentStatus.SUCCESS);

        when(userRepository.findById("user-1")).thenReturn(Optional.of(user));
        when(consultationRepository.findById("consult-123")).thenReturn(Optional.of(consultation));
        when(paymentRepository.findFirstByConsultationIdAndStatusOrderByCreatedAtDesc("consult-123", PaymentStatus.SUCCESS))
                .thenReturn(Optional.of(existingPayment));

        BadRequestException ex = assertThrows(BadRequestException.class, () ->
                paymentService.createOrder(request, userAuth)
        );
        assertEquals("This consultation has already been paid for", ex.getMessage());
    }

    @Test
    @DisplayName("Should enforce consultation ownership for order creation")
    void testConsultationOwnershipCheck() {
        CreateOrderRequest request = new CreateOrderRequest("consult-123");

        ConsultationEntity otherUserConsultation = new ConsultationEntity();
        otherUserConsultation.setId("consult-123");
        otherUserConsultation.setUserId("other-user-999");

        when(userRepository.findById("user-1")).thenReturn(Optional.of(user));
        when(consultationRepository.findById("consult-123")).thenReturn(Optional.of(otherUserConsultation));

        assertThrows(ForbiddenException.class, () ->
                paymentService.createOrder(request, userAuth)
        );
    }

    @Test
    @DisplayName("VerifyPayment should be idempotent when payment is already marked SUCCESS")
    void testVerifyPaymentIdempotency() {
        VerifyPaymentRequest request = new VerifyPaymentRequest("order_123", "pay_456", "sig_789");

        PaymentEntity successPayment = new PaymentEntity();
        successPayment.setId("payment-id-1");
        successPayment.setUserId("user-1");
        successPayment.setConsultationId("consult-123");
        successPayment.setRazorpayOrderId("order_123");
        successPayment.setStatus(PaymentStatus.SUCCESS);
        successPayment.setCreatedAt(Instant.now());

        when(paymentRepository.findByRazorpayOrderId("order_123")).thenReturn(Optional.of(successPayment));

        PaymentDto result = paymentService.verifyPayment(request, userAuth);

        assertNotNull(result);
        assertEquals(PaymentStatus.SUCCESS, result.getStatus());
        assertEquals("order_123", result.getRazorpayOrderId());
        // Verify no duplicate updates or saves happened
        verify(paymentRepository, never()).save(any(PaymentEntity.class));
    }
}
