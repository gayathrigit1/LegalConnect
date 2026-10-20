package com.legalconnect.controller;

import com.legalconnect.dto.AdminStatsDto;
import com.legalconnect.dto.ConsultationDto;
import com.legalconnect.dto.LawyerDto;
import com.legalconnect.dto.UserDto;
import com.legalconnect.entity.LawyerEntity;
import com.legalconnect.entity.UserEntity;
import com.legalconnect.entity.enums.ConsultationStatus;
import com.legalconnect.repository.ConsultationRepository;
import com.legalconnect.repository.LawyerRepository;
import com.legalconnect.repository.UserRepository;
import com.legalconnect.service.ConsultationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin")
@Tag(name = "Admin Management", description = "Admin-only endpoints for platform management")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    private final UserRepository userRepository;
    private final LawyerRepository lawyerRepository;
    private final ConsultationRepository consultationRepository;
    private final ConsultationService consultationService;

    public AdminController(
            UserRepository userRepository,
            LawyerRepository lawyerRepository,
            ConsultationRepository consultationRepository,
            ConsultationService consultationService) {

        this.userRepository = userRepository;
        this.lawyerRepository = lawyerRepository;
        this.consultationRepository = consultationRepository;
        this.consultationService = consultationService;
    }

    @GetMapping("/stats")
    @Operation(
            summary = "Get platform statistics",
            description = "Get platform-wide statistics"
    )
    public ResponseEntity<AdminStatsDto> getPlatformStats() {

        AdminStatsDto stats = new AdminStatsDto();

        stats.setTotalUsers(userRepository.count());
        stats.setTotalLawyers(lawyerRepository.count());
        stats.setTotalConsultations(consultationRepository.count());

        stats.setPendingConsultations(
                consultationRepository.countByStatus(ConsultationStatus.PENDING)
        );

        stats.setAcceptedConsultations(
                consultationRepository.countByStatus(ConsultationStatus.ACCEPTED)
        );

        stats.setRejectedConsultations(
                consultationRepository.countByStatus(ConsultationStatus.REJECTED)
        );

        return ResponseEntity.ok(stats);
    }

    @GetMapping("/users")
    @Operation(
            summary = "Get all users",
            description = "Get all users in the system"
    )
    public ResponseEntity<List<UserDto>> getAllUsers() {

        List<UserDto> users = userRepository.findAll()
                .stream()
                .map(this::mapToUserDto)
                .collect(Collectors.toList());

        return ResponseEntity.ok(users);
    }

    @GetMapping("/lawyers")
    @Operation(
            summary = "Get all lawyers",
            description = "Get all lawyers in the system"
    )
    public ResponseEntity<List<LawyerDto>> getAllLawyers() {

        List<LawyerDto> lawyers = lawyerRepository.findAll()
                .stream()
                .map(this::mapToLawyerDto)
                .collect(Collectors.toList());

        return ResponseEntity.ok(lawyers);
    }

    @GetMapping("/consultations")
    @Operation(
            summary = "Get all consultations",
            description = "Get all consultations in the system"
    )
    public ResponseEntity<List<ConsultationDto>> getAllConsultations(
            Authentication authentication) {

        List<ConsultationDto> consultations =
                consultationService.getAllConsultations(authentication);

        return ResponseEntity.ok(consultations);
    }

    @DeleteMapping("/users/{userId}")
    @Operation(
            summary = "Delete user",
            description = "Delete a user by ID"
    )
    public ResponseEntity<Void> deleteUser(
            @PathVariable String userId) {

        if (!userRepository.existsById(userId)) {
            return ResponseEntity.notFound().build();
        }

        userRepository.deleteById(userId);

        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/lawyers/{lawyerId}")
    @Operation(
            summary = "Delete lawyer",
            description = "Delete a lawyer by ID"
    )
    public ResponseEntity<Void> deleteLawyer(
            @PathVariable String lawyerId) {

        if (!lawyerRepository.existsById(lawyerId)) {
            return ResponseEntity.notFound().build();
        }

        lawyerRepository.deleteById(lawyerId);

        return ResponseEntity.noContent().build();
    }

    private UserDto mapToUserDto(UserEntity user) {

        return new UserDto(
                user.getId(),
                user.getFullName(),
                user.getEmail(),
                user.getPhone(),
                user.getRole(),
                user.getAvatarUrl(),
                user.getLocation(),
                user.getCreatedAt()
        );
    }

    private LawyerDto mapToLawyerDto(LawyerEntity lawyer) {

        LawyerDto dto = new LawyerDto();

        dto.setId(lawyer.getId());
        dto.setUserId(lawyer.getUserId());
        dto.setFullName(lawyer.getFullName());
        dto.setEmail(lawyer.getEmail());
        dto.setPhone(lawyer.getPhone());
        dto.setAvatarInitials(lawyer.getAvatarInitials());
        dto.setSpecialization(lawyer.getSpecialization());
        dto.setSpecializations(lawyer.getSpecializations());
        dto.setLegalDomains(lawyer.getLegalDomains());
        dto.setYearsOfExperience(lawyer.getYearsOfExperience());
        dto.setLocation(lawyer.getLocation());
        dto.setConsultationFee(lawyer.getConsultationFee());
        dto.setRating(lawyer.getRating());
        dto.setReviewCount(lawyer.getReviewCount());
        dto.setAvailability(lawyer.getAvailability());
        dto.setVerificationStatus(lawyer.getVerificationStatus());
        dto.setQualifications(lawyer.getQualifications());
        dto.setRelevantExperience(lawyer.getRelevantExperience());
        dto.setBio(lawyer.getBio());
        dto.setProfileCompletion(lawyer.getProfileCompletion());
        dto.setDemo(
                lawyer.getIsDemo() != null && lawyer.getIsDemo()
        );

        return dto;
    }
}