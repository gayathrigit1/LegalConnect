package com.legalconnect.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.legalconnect.dto.AvailabilityUpdateRequest;
import com.legalconnect.dto.LawyerDto;
import com.legalconnect.dto.LawyerFiltersDto;
import com.legalconnect.dto.VerificationUpdateRequest;
import com.legalconnect.entity.LawyerEntity;
import com.legalconnect.exception.ForbiddenException;
import com.legalconnect.exception.ResourceNotFoundException;
import com.legalconnect.repository.LawyerRepository;
import com.legalconnect.security.UserPrincipal;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class LawyerService {

    private final LawyerRepository lawyerRepository;
    private final ObjectMapper objectMapper;

    public LawyerService(
            LawyerRepository lawyerRepository,
            ObjectMapper objectMapper) {

        this.lawyerRepository = lawyerRepository;
        this.objectMapper = objectMapper;
    }

    public List<LawyerDto> browseLawyers(
            LawyerFiltersDto filters) {

        List<LawyerEntity> lawyers;

        if (filters == null ||
                (filters.getSpecialization() == null &&
                 filters.getLocation() == null)) {

            lawyers = lawyerRepository.findAll();

        } else {

            lawyers = lawyerRepository.findAll()
                    .stream()
                    .filter(lawyer -> {

                        boolean matchesSpecialization =
                                filters.getSpecialization() == null ||
                                (lawyer.getSpecializations() != null &&
                                 lawyer.getSpecializations()
                                         .contains(
                                                 filters.getSpecialization()
                                         ));

                        boolean matchesLocation =
                                filters.getLocation() == null ||
                                (lawyer.getLocation() != null &&
                                 filters.getLocation()
                                         .equalsIgnoreCase(
                                                 lawyer.getLocation()
                                         ));

                        return matchesSpecialization &&
                                matchesLocation;
                    })
                    .collect(Collectors.toList());
        }

        return lawyers.stream()
                .map(this::mapToLawyerDto)
                .collect(Collectors.toList());
    }

    /*
     * Get a lawyer by database ID (e.g. lawyer-1) or public code (e.g. L0001).
     */
    public LawyerDto getLawyerProfile(String lawyerId) {

        LawyerEntity lawyer = lawyerRepository.findById(lawyerId)
                .or(() -> lawyerRepository.findByLawyerCode(lawyerId))
                .orElseThrow(() -> new ResourceNotFoundException("Lawyer not found: " + lawyerId));

        return mapToLawyerDto(lawyer);
    }

    /*
     * Get the currently logged-in lawyer's profile.
     * This uses the internal user UUID from JWT.
     */
    public LawyerDto getMyLawyerProfile(
            Authentication authentication) {

        UserPrincipal userPrincipal =
                (UserPrincipal) authentication.getPrincipal();

        LawyerEntity lawyer =
                lawyerRepository.findByUserId(
                        userPrincipal.getId()
                ).orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Lawyer profile not found for this user"
                        ));

        return mapToLawyerDto(lawyer);
    }

    /*
     * Update the currently logged-in lawyer's profile.
     */
    public LawyerDto updateMyLawyerProfile(
            LawyerDto lawyerDto,
            Authentication authentication) {

        UserPrincipal userPrincipal =
                (UserPrincipal) authentication.getPrincipal();

        LawyerEntity lawyer =
                lawyerRepository.findByUserId(
                        userPrincipal.getId()
                ).orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Lawyer profile not found for this user"
                        ));

        if (lawyerDto.getFullName() != null) {
            lawyer.setFullName(lawyerDto.getFullName());
        }

        if (lawyerDto.getPhone() != null) {
            lawyer.setPhone(lawyerDto.getPhone());
        }

        if (lawyerDto.getSpecialization() != null) {
            lawyer.setSpecialization(
                    lawyerDto.getSpecialization()
            );
        }

        if (lawyerDto.getSpecializations() != null) {
            lawyer.setSpecializations(
                    lawyerDto.getSpecializations()
            );
        }

        if (lawyerDto.getLegalDomains() != null) {
            lawyer.setLegalDomains(
                    lawyerDto.getLegalDomains()
            );
        }

        if (lawyerDto.getYearsOfExperience() > 0) {
            lawyer.setYearsOfExperience(
                    lawyerDto.getYearsOfExperience()
            );
        }

        if (lawyerDto.getConsultationFee() > 0) {
            lawyer.setConsultationFee(
                    lawyerDto.getConsultationFee()
            );
        }

        if (lawyerDto.getLocation() != null) {
            lawyer.setLocation(
                    lawyerDto.getLocation()
            );
        }

        if (lawyerDto.getQualifications() != null) {
            lawyer.setQualifications(
                    lawyerDto.getQualifications()
            );
        }

        if (lawyerDto.getRelevantExperience() != null) {
            lawyer.setRelevantExperience(
                    lawyerDto.getRelevantExperience()
            );
        }

        if (lawyerDto.getBio() != null) {
            lawyer.setBio(
                    lawyerDto.getBio()
            );
        }

        lawyer = lawyerRepository.save(lawyer);

        return mapToLawyerDto(lawyer);
    }

    /*
     * Update availability of the logged-in lawyer.
     */
    @Transactional
    public LawyerDto updateAvailability(
            AvailabilityUpdateRequest request,
            Authentication authentication) {

        UserPrincipal userPrincipal =
                (UserPrincipal) authentication.getPrincipal();

        LawyerEntity lawyer =
                lawyerRepository.findByUserId(
                        userPrincipal.getId()
                ).orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Lawyer profile not found for this user"
                        ));

        lawyer.setAvailability(
                request.getAvailability()
        );

        if (request.getAvailabilitySlots() != null) {

            try {

                String slotsJson =
                        objectMapper.writeValueAsString(
                                request.getAvailabilitySlots()
                        );

                lawyer.setAvailabilitySlotsJson(slotsJson);

            } catch (JsonProcessingException e) {

                throw new RuntimeException(
                        "Failed to process availability slots",
                        e
                );
            }
        }

        lawyer = lawyerRepository.save(lawyer);

        return mapToLawyerDto(lawyer);
    }

    /*
     * Admin updates lawyer verification status.
     *
     * The lawyer is identified using the public code:
     * L0001, L0002, etc.
     */
    @Transactional
    public LawyerDto updateVerificationStatus(
            String lawyerId,
            VerificationUpdateRequest request,
            Authentication authentication) {

        UserPrincipal userPrincipal =
                (UserPrincipal) authentication.getPrincipal();

        if (!userPrincipal.getRole().name().equals("ADMIN")) {

            throw new ForbiddenException(
                    "Only admins can update verification status"
            );
        }

        LawyerEntity lawyer = lawyerRepository.findById(lawyerId)
                .or(() -> lawyerRepository.findByLawyerCode(lawyerId))
                .orElseThrow(() -> new ResourceNotFoundException("Lawyer not found: " + lawyerId));

        lawyer.setVerificationStatus(
                request.getVerificationStatus()
        );

        lawyer = lawyerRepository.save(lawyer);

        return mapToLawyerDto(lawyer);
    }

    /*
     * Convert database entity to API DTO.
     *
     * Important:
     * DTO id = L0001
     * Database id = UUID
     */
    private LawyerDto mapToLawyerDto(
            LawyerEntity lawyer) {

        LawyerDto dto = new LawyerDto();

        // Primary ID matches database entity (e.g. lawyer-1 or UUID) for seamless booking
        dto.setId(lawyer.getId() != null ? lawyer.getId() : lawyer.getLawyerCode());

        // Same public code exposed separately
        dto.setLawyerCode(lawyer.getLawyerCode());

        // Internal user UUID
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
        dto.setVerificationStatus(
                lawyer.getVerificationStatus()
        );
        dto.setQualifications(lawyer.getQualifications());
        dto.setRelevantExperience(
                lawyer.getRelevantExperience()
        );
        dto.setBio(lawyer.getBio());
        dto.setProfileCompletion(
                lawyer.getProfileCompletion()
        );

        dto.setDemo(
                lawyer.getIsDemo() != null &&
                lawyer.getIsDemo()
        );

        return dto;
    }
}