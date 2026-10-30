package com.legalconnect.service;

import com.legalconnect.dto.ConsultationDto;
import com.legalconnect.dto.ConsultationRequestPayload;
import com.legalconnect.entity.ConsultationEntity;
import com.legalconnect.entity.LawyerEntity;
import com.legalconnect.entity.UserEntity;
import com.legalconnect.entity.enums.ConsultationType;
import com.legalconnect.entity.enums.UserRole;
import com.legalconnect.exception.ResourceNotFoundException;
import com.legalconnect.repository.ConsultationRepository;
import com.legalconnect.repository.LawyerRepository;
import com.legalconnect.repository.UserRepository;
import com.legalconnect.security.UserPrincipal;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;

import java.util.Collections;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class ConsultationServiceTest {

    @Mock
    private ConsultationRepository consultationRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private LawyerRepository lawyerRepository;

    @InjectMocks
    private ConsultationService consultationService;

    private UserEntity user;
    private LawyerEntity lawyer;
    private Authentication authentication;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        user = new UserEntity();
        user.setId("user-1");
        user.setEmail("user@demo.com");
        user.setFullName("Ananya Mehta");
        user.setRole(UserRole.USER);

        lawyer = new LawyerEntity();
        lawyer.setId("lawyer-1");
        lawyer.setLawyerCode("L0001");
        lawyer.setFullName("Kavya Iyer (Demo)");
        lawyer.setConsultationFee(1500.0);

        UserPrincipal principal = new UserPrincipal(
                user.getId(),
                user.getEmail(),
                "password",
                user.getRole(),
                user.getFullName(),
                Collections.emptyList()
        );
        authentication = new UsernamePasswordAuthenticationToken(principal, null, principal.getAuthorities());
    }

    @Test
    @DisplayName("Should create consultation when lawyer is found by primary ID")
    void testCreateConsultationByLawyerId() {
        ConsultationRequestPayload payload = new ConsultationRequestPayload();
        payload.setLawyerId("lawyer-1");
        payload.setPreferredDate("2026-11-01");
        payload.setPreferredTime("14:00");
        payload.setDescription("Need civil contract consultation");
        payload.setType(ConsultationType.VIDEO);

        when(userRepository.findById("user-1")).thenReturn(Optional.of(user));
        when(lawyerRepository.findById("lawyer-1")).thenReturn(Optional.of(lawyer));
        when(consultationRepository.save(any(ConsultationEntity.class))).thenAnswer(invocation -> invocation.getArgument(0));

        ConsultationDto result = consultationService.createConsultation(payload, authentication);

        assertNotNull(result);
        assertEquals("user-1", result.getUserId());
        assertEquals("lawyer-1", result.getLawyerId());
        assertEquals("Kavya Iyer (Demo)", result.getLawyerName());
        assertEquals("UNPAID", result.getPaymentStatus());
        verify(consultationRepository, times(1)).save(any(ConsultationEntity.class));
    }

    @Test
    @DisplayName("Should create consultation when lawyer is found by lawyer code")
    void testCreateConsultationByLawyerCode() {
        ConsultationRequestPayload payload = new ConsultationRequestPayload();
        payload.setLawyerId("L0001");
        payload.setPreferredDate("2026-11-01");
        payload.setPreferredTime("14:00");
        payload.setDescription("Need family law advice");
        payload.setType(ConsultationType.VIDEO);

        when(userRepository.findById("user-1")).thenReturn(Optional.of(user));
        when(lawyerRepository.findById("L0001")).thenReturn(Optional.empty());
        when(lawyerRepository.findByLawyerCode("L0001")).thenReturn(Optional.of(lawyer));
        when(consultationRepository.save(any(ConsultationEntity.class))).thenAnswer(invocation -> invocation.getArgument(0));

        ConsultationDto result = consultationService.createConsultation(payload, authentication);

        assertNotNull(result);
        assertEquals("lawyer-1", result.getLawyerId());
        assertEquals("Kavya Iyer (Demo)", result.getLawyerName());
    }

    @Test
    @DisplayName("Should throw ResourceNotFoundException when lawyer does not exist")
    void testCreateConsultationLawyerNotFound() {
        ConsultationRequestPayload payload = new ConsultationRequestPayload();
        payload.setLawyerId("non-existent");
        payload.setPreferredDate("2026-11-01");
        payload.setPreferredTime("14:00");
        payload.setDescription("Inquiry");

        when(userRepository.findById("user-1")).thenReturn(Optional.of(user));
        when(lawyerRepository.findById("non-existent")).thenReturn(Optional.empty());
        when(lawyerRepository.findByLawyerCode("non-existent")).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () ->
                consultationService.createConsultation(payload, authentication)
        );
    }
}

