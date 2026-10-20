package com.legalconnect.service;

import com.legalconnect.dto.ConsultationDto;
import com.legalconnect.dto.ConsultationRequestPayload;
import com.legalconnect.entity.ConsultationEntity;
import com.legalconnect.entity.LawyerEntity;
import com.legalconnect.entity.UserEntity;
import com.legalconnect.entity.enums.ConsultationStatus;
import com.legalconnect.exception.BadRequestException;
import com.legalconnect.exception.ForbiddenException;
import com.legalconnect.exception.ResourceNotFoundException;
import com.legalconnect.repository.ConsultationRepository;
import com.legalconnect.repository.LawyerRepository;
import com.legalconnect.repository.UserRepository;
import com.legalconnect.security.UserPrincipal;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ConsultationService {

    private final ConsultationRepository consultationRepository;
    private final UserRepository userRepository;
    private final LawyerRepository lawyerRepository;

    public ConsultationService(ConsultationRepository consultationRepository,
                              UserRepository userRepository,
                              LawyerRepository lawyerRepository) {
        this.consultationRepository = consultationRepository;
        this.userRepository = userRepository;
        this.lawyerRepository = lawyerRepository;
    }

    @Transactional
    public ConsultationDto createConsultation(ConsultationRequestPayload request, Authentication authentication) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();

        UserEntity user = userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        LawyerEntity lawyer = lawyerRepository.findById(request.getLawyerId())
                .orElseThrow(() -> new ResourceNotFoundException("Lawyer not found"));

        ConsultationEntity consultation = new ConsultationEntity();
        consultation.setId(UUID.randomUUID().toString());
        consultation.setUserId(user.getId());
        consultation.setUserName(user.getFullName());
        consultation.setLawyerId(lawyer.getId());
        consultation.setLawyerName(lawyer.getFullName());
        consultation.setCaseId(request.getCaseId());
        consultation.setCaseTitle(request.getCaseTitle());
        consultation.setPreferredDate(request.getPreferredDate());
        consultation.setPreferredTime(request.getPreferredTime());
        consultation.setDescription(request.getDescription());
        consultation.setType(request.getType());
        consultation.setStatus(ConsultationStatus.PENDING);

        consultation = consultationRepository.save(consultation);
        return mapToConsultationDto(consultation);
    }

    public List<ConsultationDto> getMyConsultations(Authentication authentication) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();

        if (userPrincipal.getRole().name().equals("LAWYER")) {
            LawyerEntity lawyer = lawyerRepository.findByUserId(userPrincipal.getId())
                    .orElseThrow(() -> new ResourceNotFoundException("Lawyer profile not found for this user"));

            return consultationRepository.findByLawyerIdOrderByCreatedAtDesc(lawyer.getId())
                    .stream()
                    .map(this::mapToConsultationDto)
                    .collect(Collectors.toList());
        } else {
            return consultationRepository.findByUserIdOrderByCreatedAtDesc(userPrincipal.getId())
                    .stream()
                    .map(this::mapToConsultationDto)
                    .collect(Collectors.toList());
        }
    }

    public ConsultationDto getConsultationById(String consultationId, Authentication authentication) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();

        ConsultationEntity consultation = consultationRepository.findById(consultationId)
                .orElseThrow(() -> new ResourceNotFoundException("Consultation not found"));

        if (!canAccessConsultation(consultation, userPrincipal)) {
            throw new ForbiddenException("You do not have permission to access this consultation");
        }

        return mapToConsultationDto(consultation);
    }

    @Transactional
    public ConsultationDto acceptConsultation(String consultationId, Authentication authentication) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();

        LawyerEntity lawyer = lawyerRepository.findByUserId(userPrincipal.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Lawyer profile not found for this user"));

        ConsultationEntity consultation = consultationRepository.findById(consultationId)
                .orElseThrow(() -> new ResourceNotFoundException("Consultation not found"));

        if (!consultation.getLawyerId().equals(lawyer.getId())) {
            throw new ForbiddenException("You can only accept consultations assigned to you");
        }

        if (consultation.getStatus() != ConsultationStatus.PENDING) {
            throw new BadRequestException("Consultation is not in pending status");
        }

        consultation.setStatus(ConsultationStatus.ACCEPTED);
        consultation = consultationRepository.save(consultation);

        return mapToConsultationDto(consultation);
    }

    @Transactional
    public ConsultationDto rejectConsultation(String consultationId, Authentication authentication) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();

        LawyerEntity lawyer = lawyerRepository.findByUserId(userPrincipal.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Lawyer profile not found for this user"));

        ConsultationEntity consultation = consultationRepository.findById(consultationId)
                .orElseThrow(() -> new ResourceNotFoundException("Consultation not found"));

        if (!consultation.getLawyerId().equals(lawyer.getId())) {
            throw new ForbiddenException("You can only reject consultations assigned to you");
        }

        if (consultation.getStatus() != ConsultationStatus.PENDING) {
            throw new BadRequestException("Consultation is not in pending status");
        }

        consultation.setStatus(ConsultationStatus.REJECTED);
        consultation = consultationRepository.save(consultation);

        return mapToConsultationDto(consultation);
    }

    public List<ConsultationDto> getAllConsultations(Authentication authentication) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();

        if (!userPrincipal.getRole().name().equals("ADMIN")) {
            throw new ForbiddenException("Only admins can view all consultations");
        }

        return consultationRepository.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(this::mapToConsultationDto)
                .collect(Collectors.toList());
    }

    private boolean canAccessConsultation(ConsultationEntity consultation, UserPrincipal userPrincipal) {
        if (userPrincipal.getRole().name().equals("ADMIN")) {
            return true;
        }

        if (userPrincipal.getRole().name().equals("USER")) {
            return consultation.getUserId().equals(userPrincipal.getId());
        }

        if (userPrincipal.getRole().name().equals("LAWYER")) {
            return consultation.getLawyerId().equals(
                    lawyerRepository.findByUserId(userPrincipal.getId())
                            .map(LawyerEntity::getId)
                            .orElse(null)
            );
        }

        return false;
    }

    private ConsultationDto mapToConsultationDto(ConsultationEntity consultation) {
        ConsultationDto dto = new ConsultationDto();
        dto.setId(consultation.getId());
        dto.setUserId(consultation.getUserId());
        dto.setUserName(consultation.getUserName());
        dto.setLawyerId(consultation.getLawyerId());
        dto.setLawyerName(consultation.getLawyerName());
        dto.setCaseId(consultation.getCaseId());
        dto.setCaseTitle(consultation.getCaseTitle());
        dto.setPreferredDate(consultation.getPreferredDate());
        dto.setPreferredTime(consultation.getPreferredTime());
        dto.setDescription(consultation.getDescription());
        dto.setType(consultation.getType());
        dto.setStatus(consultation.getStatus());
        dto.setCreatedAt(consultation.getCreatedAt() != null ? consultation.getCreatedAt().toString() : null);
        return dto;
    }
}
