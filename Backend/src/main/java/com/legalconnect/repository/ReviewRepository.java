package com.legalconnect.repository;

import com.legalconnect.entity.ReviewEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<ReviewEntity, String> {
    List<ReviewEntity> findByLawyerIdOrderByCreatedAtDesc(String lawyerId);
    List<ReviewEntity> findByUserIdOrderByCreatedAtDesc(String userId);
    List<ReviewEntity> findAllByOrderByCreatedAtDesc();
    long countByLawyerId(String lawyerId);
}
