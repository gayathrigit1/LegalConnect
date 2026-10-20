package com.legalconnect.repository;

import com.legalconnect.entity.LegalDocumentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LegalDocumentRepository extends JpaRepository<LegalDocumentEntity, String> {
    List<LegalDocumentEntity> findByUserIdOrderByUploadedAtDesc(String userId);
}
