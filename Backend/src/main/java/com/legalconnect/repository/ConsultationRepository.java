package com.legalconnect.repository;

import com.legalconnect.entity.ConsultationEntity;
import com.legalconnect.entity.enums.ConsultationStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ConsultationRepository extends JpaRepository<ConsultationEntity, String> {
    List<ConsultationEntity> findByUserIdOrderByCreatedAtDesc(String userId);
    List<ConsultationEntity> findByLawyerIdOrderByCreatedAtDesc(String lawyerId);
    List<ConsultationEntity> findAllByOrderByCreatedAtDesc();
    long countByLawyerIdAndStatus(String lawyerId, ConsultationStatus status);
    long countByLawyerId(String lawyerId);
    long countByStatus(ConsultationStatus status);
}
