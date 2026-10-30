package com.legalconnect.repository;

import com.legalconnect.entity.PaymentEntity;
import com.legalconnect.entity.enums.PaymentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PaymentRepository extends JpaRepository<PaymentEntity, String> {

    Optional<PaymentEntity> findByRazorpayOrderId(String razorpayOrderId);

    Optional<PaymentEntity> findByRazorpayPaymentId(String razorpayPaymentId);

    List<PaymentEntity> findByUserIdOrderByCreatedAtDesc(String userId);

    List<PaymentEntity> findByConsultationIdOrderByCreatedAtDesc(String consultationId);

    Optional<PaymentEntity> findFirstByConsultationIdAndStatusOrderByCreatedAtDesc(String consultationId, PaymentStatus status);

    List<PaymentEntity> findAllByOrderByCreatedAtDesc();

    boolean existsByRazorpayOrderId(String razorpayOrderId);

    long countByStatus(PaymentStatus status);
}
