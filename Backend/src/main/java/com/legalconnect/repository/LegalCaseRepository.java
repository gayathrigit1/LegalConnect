package com.legalconnect.repository;

import com.legalconnect.entity.LegalCaseEntity;
import com.legalconnect.entity.enums.CaseStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LegalCaseRepository extends JpaRepository<LegalCaseEntity, String> {
    List<LegalCaseEntity> findByUserIdOrderByCreatedAtDesc(String userId);
    List<LegalCaseEntity> findByAssignedLawyerIdOrderByCreatedAtDesc(String assignedLawyerId);
    List<LegalCaseEntity> findAllByOrderByCreatedAtDesc();
    long countByStatusNot(CaseStatus status);
}
