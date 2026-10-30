package com.legalconnect.controller;

import com.legalconnect.dto.ConsultationDto;
import com.legalconnect.dto.ConsultationRequestPayload;
import com.legalconnect.service.ConsultationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/consultations")
@Tag(name = "Consultation Management", description = "Consultation request and management endpoints")
public class ConsultationController {

    private final ConsultationService consultationService;

    public ConsultationController(ConsultationService consultationService) {
        this.consultationService = consultationService;
    }

    @PostMapping({"", "/"})
    @Operation(summary = "Create consultation request", description = "Create a new consultation request (User only)")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<ConsultationDto> createConsultation(@Valid @RequestBody ConsultationRequestPayload request, Authentication authentication) {
        ConsultationDto consultation = consultationService.createConsultation(request, authentication);
        return ResponseEntity.ok(consultation);
    }

    @GetMapping({"", "/", "/my-consultations"})
    @Operation(summary = "Get my consultations", description = "Get consultations for the authenticated user or lawyer")
    public ResponseEntity<List<ConsultationDto>> getMyConsultations(Authentication authentication) {
        List<ConsultationDto> consultations = consultationService.getMyConsultations(authentication);
        return ResponseEntity.ok(consultations);
    }

    @GetMapping("/{consultationId}")
    @Operation(summary = "Get consultation by ID", description = "Get a specific consultation by ID")
    public ResponseEntity<ConsultationDto> getConsultationById(@PathVariable String consultationId, Authentication authentication) {
        ConsultationDto consultation = consultationService.getConsultationById(consultationId, authentication);
        return ResponseEntity.ok(consultation);
    }

    @PutMapping("/{consultationId}/accept")
    @Operation(summary = "Accept consultation", description = "Accept a consultation request (Lawyer only)")
    @PreAuthorize("hasRole('LAWYER')")
    public ResponseEntity<ConsultationDto> acceptConsultation(@PathVariable String consultationId, Authentication authentication) {
        ConsultationDto consultation = consultationService.acceptConsultation(consultationId, authentication);
        return ResponseEntity.ok(consultation);
    }

    @PutMapping("/{consultationId}/reject")
    @Operation(summary = "Reject consultation", description = "Reject a consultation request (Lawyer only)")
    @PreAuthorize("hasRole('LAWYER')")
    public ResponseEntity<ConsultationDto> rejectConsultation(@PathVariable String consultationId, Authentication authentication) {
        ConsultationDto consultation = consultationService.rejectConsultation(consultationId, authentication);
        return ResponseEntity.ok(consultation);
    }

    @GetMapping("/all")
    @Operation(summary = "Get all consultations", description = "Get all consultations (Admin only)")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<ConsultationDto>> getAllConsultations(Authentication authentication) {
        List<ConsultationDto> consultations = consultationService.getAllConsultations(authentication);
        return ResponseEntity.ok(consultations);
    }
}
