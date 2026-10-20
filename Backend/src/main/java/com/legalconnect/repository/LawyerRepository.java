package com.legalconnect.repository;

import com.legalconnect.entity.LawyerEntity;
import com.legalconnect.entity.enums.VerificationStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LawyerRepository extends JpaRepository<LawyerEntity, String> {

    Optional<LawyerEntity> findByUserId(String userId);

    Optional<LawyerEntity> findByLawyerCode(String lawyerCode);

    Optional<LawyerEntity> findByEmailIgnoreCase(String email);

    boolean existsByUserId(String userId);

    List<LawyerEntity> findByVerificationStatus(
            VerificationStatus verificationStatus
    );

    long countByVerificationStatus(
            VerificationStatus verificationStatus
    );
}