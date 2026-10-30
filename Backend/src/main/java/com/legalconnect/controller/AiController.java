package com.legalconnect.controller;

import com.legalconnect.dto.AiAnalysisResultDto;
import com.legalconnect.dto.RecommendationDto;
import com.legalconnect.exception.BadRequestException;
import com.legalconnect.service.LegalAnalysisService;
import com.legalconnect.service.LawyerRecommendationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * REST controller for legal case analysis and lawyer recommendations.
 *
 * <p>Both endpoints require a valid JWT ({@code Authorization: Bearer <token>}).
 * Case analysis is performed deterministically on the backend.
 */
@RestController
@RequestMapping("/api/ai")
@Validated
@Tag(name = "AI Legal Analysis", description = "Deterministic legal case analysis and lawyer matching")
public class AiController {

    private static final Logger log = LoggerFactory.getLogger(AiController.class);

    /** Maximum number of recommendations to return per request. */
    private static final int MAX_RECOMMENDATIONS = 5;

    private final LegalAnalysisService analysisService;
    private final LawyerRecommendationService recommendationService;

    public AiController(LegalAnalysisService analysisService,
                        LawyerRecommendationService recommendationService) {
        this.analysisService = analysisService;
        this.recommendationService = recommendationService;
    }

    // =========================================================================
    // POST /api/ai/analyze
    // =========================================================================

    /**
     * Accepts a user's legal problem description (JSON) and returns a structured legal analysis.
     *
     * <p>Request body (JSON):
     * <pre>{ "problemDescription": "..." }</pre>
     *
     * <p>Response: {@link AiAnalysisResultDto} JSON.
     */
    @PostMapping(value = "/analyze", consumes = {MediaType.APPLICATION_JSON_VALUE})
    @Operation(
            summary = "Analyse a legal case (JSON)",
            description = "Analyzes the user's problem description and returns a structured " +
                          "legal analysis. Requires USER or LAWYER authentication.")
    public ResponseEntity<AiAnalysisResultDto> analyzeCaseJson(
            @RequestBody(required = false) Map<String, Object> body,
            Authentication authentication) {

        String requestedBy = authentication != null ? authentication.getName() : "anonymous";
        log.info("AI case analysis requested by: {}", requestedBy);

        String problemDescription = extractDescription(body);
        AiAnalysisResultDto result = analysisService.analyse(problemDescription);
        return ResponseEntity.ok(result);
    }

    /**
     * Accepts multipart/form-data with optional uploaded document attachment.
     */
    @PostMapping(value = "/analyze", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    @Operation(
            summary = "Analyse a legal case with optional file (Multipart)",
            description = "Analyzes problem description with optional uploaded file. Requires authentication.")
    public ResponseEntity<AiAnalysisResultDto> analyzeCaseMultipart(
            @RequestParam(value = "problemDescription", required = false) String problemDescription,
            @RequestParam(value = "problem", required = false) String problem,
            @RequestParam(value = "file", required = false) MultipartFile file,
            Authentication authentication) {

        String requestedBy = authentication != null ? authentication.getName() : "anonymous";
        log.info("AI multipart case analysis requested by: {}", requestedBy);

        String description = (problemDescription != null && !problemDescription.isBlank())
                ? problemDescription : problem;

        AiAnalysisResultDto result = analysisService.analyse(description);

        if (file != null && !file.isEmpty()) {
            List<String> info = new ArrayList<>(result.getImportantInformation());
            String fileName = file.getOriginalFilename() != null ? file.getOriginalFilename() : "document";
            long sizeKb = Math.max(1, file.getSize() / 1024);
            info.add(0, String.format("Attached document: '%s' (%d KB) uploaded for case review.", fileName, sizeKb));
            result.setImportantInformation(info);
        }

        return ResponseEntity.ok(result);
    }

    private String extractDescription(Map<String, Object> body) {
        if (body == null || body.isEmpty()) {
            throw new BadRequestException("Request body must not be empty. Please include 'problemDescription'.");
        }
        for (String key : new String[]{"problemDescription", "problem", "description", "caseDescription", "text", "summary"}) {
            Object val = body.get(key);
            if (val != null) {
                String str = val.toString().trim();
                if (!str.isEmpty()) {
                    return str;
                }
            }
        }
        throw new BadRequestException("Please provide a description of your legal problem using field 'problemDescription'.");
    }

    // =========================================================================
    // GET /api/ai/recommendations
    // =========================================================================

    /**
     * Returns lawyer recommendations from the database, scored against the legal domain.
     *
     * <p>Query parameters:
     * <ul>
     *   <li>{@code domain} – classified legal domain string from the analysis response
     *       (optional; defaults to empty string → neutral scoring)
     * </ul>
     *
     * <p>Response: JSON array of {@link RecommendationDto}.
     */
    @GetMapping("/recommendations")
    @Operation(
            summary = "Get lawyer recommendations",
            description = "Returns verified lawyers ranked by match score against the given legal domain. " +
                          "All lawyer IDs are real database records. Requires authentication.")
    public ResponseEntity<List<RecommendationDto>> getRecommendations(
            @RequestParam(value = "domain", defaultValue = "") String domain,
            Authentication authentication) {

        String requestedBy = authentication != null ? authentication.getName() : "anonymous";
        log.info("Lawyer recommendations requested by: {} for domain: '{}'", requestedBy, domain);

        List<RecommendationDto> recommendations =
                recommendationService.recommend(domain, MAX_RECOMMENDATIONS);

        return ResponseEntity.ok(recommendations);
    }
}
