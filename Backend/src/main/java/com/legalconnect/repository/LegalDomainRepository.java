package com.legalconnect.repository;

import com.legalconnect.entity.LegalDomainEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LegalDomainRepository extends JpaRepository<LegalDomainEntity, String> {
    List<LegalDomainEntity> findByActiveTrue();
}
