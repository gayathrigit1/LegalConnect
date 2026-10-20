package com.legalconnect.repository;

import com.legalconnect.entity.UserEntity;
import com.legalconnect.entity.enums.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, String> {
    Optional<UserEntity> findByEmailIgnoreCase(String email);
    boolean existsByEmailIgnoreCase(String email);
    List<UserEntity> findByRole(UserRole role);
    long countByRole(UserRole role);
}
