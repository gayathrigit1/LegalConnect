package com.legalconnect.controller;

import com.legalconnect.dto.AvailabilityUpdateRequest;
import com.legalconnect.dto.LawyerDto;
import com.legalconnect.dto.LawyerFiltersDto;
import com.legalconnect.dto.VerificationUpdateRequest;
import com.legalconnect.service.LawyerService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/lawyers")
@Tag(name = "Lawyer Management", description = "Lawyer profile and consultation management endpoints")
public class LawyerController {

    private final LawyerService lawyerService;

    public LawyerController(LawyerService lawyerService) {
        this.lawyerService = lawyerService;
    }

    @GetMapping("/browse")
    @Operation(summary = "Browse lawyers", description = "Browse all lawyers with optional filters")
    public ResponseEntity<List<LawyerDto>> browseLawyers(
            @RequestParam(required = false) String specialization,
            @RequestParam(required = false) String location) {
        LawyerFiltersDto filters = new LawyerFiltersDto();
        filters.setSpecialization(specialization);
        filters.setLocation(location);
        List<LawyerDto> lawyers = lawyerService.browseLawyers(filters);
        return ResponseEntity.ok(lawyers);
    }

    @GetMapping("/{lawyerId}")
    @Operation(summary = "Get lawyer profile", description = "Get lawyer profile by ID")
    public ResponseEntity<LawyerDto> getLawyerProfile(@PathVariable String lawyerId) {
        LawyerDto lawyer = lawyerService.getLawyerProfile(lawyerId);
        return ResponseEntity.ok(lawyer);
    }

    @GetMapping("/my-profile")
    @Operation(summary = "Get my lawyer profile", description = "Get the authenticated lawyer's own profile")
    @PreAuthorize("hasRole('LAWYER')")
    public ResponseEntity<LawyerDto> getMyLawyerProfile(Authentication authentication) {
        LawyerDto lawyer = lawyerService.getMyLawyerProfile(authentication);
        return ResponseEntity.ok(lawyer);
    }

    @PutMapping("/my-profile")
    @Operation(summary = "Update my lawyer profile", description = "Update the authenticated lawyer's own profile")
    @PreAuthorize("hasRole('LAWYER')")
    public ResponseEntity<LawyerDto> updateMyLawyerProfile(@Valid @RequestBody LawyerDto lawyerDto, Authentication authentication) {
        LawyerDto updatedLawyer = lawyerService.updateMyLawyerProfile(lawyerDto, authentication);
        return ResponseEntity.ok(updatedLawyer);
    }

    @PutMapping("/my-profile/availability")
    @Operation(summary = "Update availability", description = "Update the authenticated lawyer's availability status")
    @PreAuthorize("hasRole('LAWYER')")
    public ResponseEntity<LawyerDto> updateAvailability(@Valid @RequestBody AvailabilityUpdateRequest request, Authentication authentication) {
        LawyerDto updatedLawyer = lawyerService.updateAvailability(request, authentication);
        return ResponseEntity.ok(updatedLawyer);
    }

    @PutMapping("/{lawyerId}/verification")
    @Operation(summary = "Update verification status", description = "Update lawyer verification status (Admin only)")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<LawyerDto> updateVerificationStatus(@PathVariable String lawyerId, @Valid @RequestBody VerificationUpdateRequest request, Authentication authentication) {
        LawyerDto updatedLawyer = lawyerService.updateVerificationStatus(lawyerId, request, authentication);
        return ResponseEntity.ok(updatedLawyer);
    }
}
