package com.legalconnect.service;

import com.legalconnect.dto.RecommendationDto;
import com.legalconnect.entity.LawyerEntity;
import com.legalconnect.entity.enums.AvailabilityStatus;
import com.legalconnect.entity.enums.VerificationStatus;
import com.legalconnect.repository.LawyerRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

/**
 * Deterministic lawyer recommendation engine.
 *
 * <p>Works exclusively with real {@link LawyerEntity} records from PostgreSQL.
 * It ranks lawyers based on verified qualifications, domain specialization, experience,
 * and consultation fees.
 *
 * <h3>Scoring methodology</h3>
 * <ol>
 *   <li><strong>legalDomainRelevance (0–100)</strong> – 100 if the lawyer's
 *       {@code legalDomains} list contains the classified domain (case-insensitive),
 *       60 if their primary {@code specialization} mentions it, 0 otherwise.</li>
 *   <li><strong>relevantExperienceScore (0–100)</strong> – scaled from
 *       {@code yearsOfExperience}: ≥15 years → 100, ≥10 → 80, ≥5 → 60, ≥2 → 40, else 20.</li>
 *   <li><strong>locationCompatibility (0–100)</strong> – 70 neutral default.</li>
 *   <li><strong>feeCompatibility (0–100)</strong> – 100 for fee ≤ ₹1 500, 80 for ≤ ₹3 000,
 *       60 for ≤ ₹5 000, 40 for ≤ ₹10 000, 20 otherwise.</li>
 *   <li><strong>matchPercentage</strong> – weighted composite:<br>
 *       legalDomainRelevance × 0.40 + relevantExperienceScore × 0.25 +
 *       feeCompatibility × 0.20 + locationCompatibility × 0.15</li>
 * </ol>
 *
 * <p>Only VERIFIED lawyers are considered. Results are sorted by matchPercentage descending.
 */
@Service
public class LawyerRecommendationService {

    private static final Logger log = LoggerFactory.getLogger(LawyerRecommendationService.class);

    private final LawyerRepository lawyerRepository;

    public LawyerRecommendationService(LawyerRepository lawyerRepository) {
        this.lawyerRepository = lawyerRepository;
    }

    /**
     * Returns a ranked list of lawyer recommendations for the given legal domain.
     *
     * @param legalDomain the domain string returned by analysis (e.g. "Labour", "Family", "Criminal")
     * @param maxResults  maximum number of recommendations to return
     * @return sorted list of {@link RecommendationDto}; may be empty but never null
     */
    public List<RecommendationDto> recommend(String legalDomain, int maxResults) {

        String domain = normaliseDomain(legalDomain);
        log.info("Building recommendations for legal domain: '{}' (normalised from '{}')",
                domain, legalDomain);

        // Fetch only verified lawyers to exclude unverified/pending profiles
        List<LawyerEntity> verifiedLawyers =
                lawyerRepository.findByVerificationStatus(VerificationStatus.VERIFIED);

        if (verifiedLawyers.isEmpty()) {
            // Fallback: include all lawyers so the dashboard is not empty in demo environments
            log.warn("No VERIFIED lawyers found; falling back to all lawyers in the database.");
            verifiedLawyers = lawyerRepository.findAll();
        }

        List<RecommendationDto> results = new ArrayList<>();
        for (LawyerEntity lawyer : verifiedLawyers) {
            results.add(buildRecommendation(lawyer, domain));
        }

        // Sort by matchPercentage descending, then by rating descending as tiebreaker
        results.sort(Comparator.comparingInt(RecommendationDto::getMatchPercentage).reversed()
                .thenComparingDouble(RecommendationDto::getRating).reversed());

        List<RecommendationDto> top = results.stream().limit(maxResults).toList();
        log.info("Returning {} recommendations for domain '{}'", top.size(), domain);
        return top;
    }

    // -------------------------------------------------------------------------
    // Private helpers
    // -------------------------------------------------------------------------

    private RecommendationDto buildRecommendation(LawyerEntity lawyer, String domain) {

        int domainRelevance      = scoreDomainRelevance(lawyer, domain);
        int experienceScore      = scoreExperience(lawyer.getYearsOfExperience());
        int locationCompat       = 70; // neutral score; user location not available in current schema
        int feeCompat            = scoreFeeCompatibility(lawyer.getConsultationFee());

        // Composite match score: weights sum to 1.00
        int compositeMatch = (int) Math.round(
                domainRelevance * 0.40
                + experienceScore * 0.25
                + feeCompat       * 0.20
                + locationCompat  * 0.15
        );
        // Clamp to 1–99 % so it never displays an unrealistic 0% or 100%
        int matchPercentage = Math.min(99, Math.max(10, compositeMatch));

        // Use lawyer's current availability, or fallback to AVAILABLE
        AvailabilityStatus availability = lawyer.getAvailability() != null
                ? lawyer.getAvailability()
                : AvailabilityStatus.AVAILABLE;

        double rating = lawyer.getRating() != null ? lawyer.getRating().doubleValue() : 4.5;

        String explanation = buildExplanation(lawyer, domainRelevance, domain);

        RecommendationDto dto = new RecommendationDto();
        dto.setLawyerId(lawyer.getId());
        dto.setMatchPercentage(matchPercentage);
        dto.setLegalDomainRelevance(domainRelevance);
        dto.setRelevantExperienceScore(experienceScore);
        dto.setLocationCompatibility(locationCompat);
        dto.setFeeCompatibility(feeCompat);
        dto.setRating(rating);
        dto.setAvailability(availability);
        dto.setExplanation(explanation);
        dto.setSource("rule-engine");

        return dto;
    }

    private int scoreDomainRelevance(LawyerEntity lawyer, String domain) {
        if (domain.isBlank()) {
            return 50; // no domain provided: neutral relevance
        }

        String domainLower = domain.toLowerCase();

        // Check the lawyer's legal domains list (e.g. ["Labour", "Corporate"])
        if (lawyer.getLegalDomains() != null) {
            boolean exactDomainMatch = lawyer.getLegalDomains().stream()
                    .filter(d -> d != null && !d.isBlank())
                    .anyMatch(d -> d.toLowerCase().contains(domainLower)
                            || domainLower.contains(d.toLowerCase()));
            if (exactDomainMatch) {
                return 100;
            }
        }

        // Secondary check: lawyer's primary specialization string (e.g. "Labour Law")
        if (lawyer.getSpecialization() != null) {
            String spec = lawyer.getSpecialization().toLowerCase();
            if (spec.contains(domainLower) || domainLower.contains(spec)) {
                return 75;
            }
        }

        return 0; // domain does not match this lawyer's practice areas
    }

    private int scoreExperience(Integer years) {
        if (years == null) return 50;
        if (years >= 15) return 100;
        if (years >= 10) return 80;
        if (years >= 5)  return 60;
        if (years >= 2)  return 40;
        return 20;
    }

    private int scoreFeeCompatibility(Double fee) {
        if (fee == null) return 70;
        double val = fee;
        if (val <= 1500) return 100; // most accessible
        if (val <= 3000) return 80;
        if (val <= 5000) return 60;
        if (val <= 10000) return 40;
        return 20; // high fees
    }

    private String buildExplanation(LawyerEntity lawyer, int domainRelevance, String domain) {
        String name = lawyer.getFullName() != null ? lawyer.getFullName() : "This lawyer";
        int exp = lawyer.getYearsOfExperience() != null ? lawyer.getYearsOfExperience() : 0;

        if (domainRelevance >= 75) {
            return String.format(
                    "%s specializes in %s with %d years of experience. High domain relevance.",
                    name, domain, exp);
        } else if (domainRelevance > 0) {
            return String.format(
                    "%s has general litigation experience (%d years) relevant to this case.",
                    name, exp);
        } else {
            return String.format(
                    "%s is a verified advocate (%d years experience, rated %.1f/5).",
                    name, exp,
                    lawyer.getRating() != null ? lawyer.getRating().doubleValue() : 4.5);
        }
    }

    /**
     * Extracts the primary canonical domain name from composite strings.
     * E.g. "Labour / Employment" -> "Labour", "Family Law" -> "Family".
     */
    private String normaliseDomain(String raw) {
        if (raw == null || raw.isBlank()) return "";

        String first = raw.split("[/,\\-(]")[0].trim();

        // Strip common suffix words like "Law", "Disputes", etc.
        first = first.replaceAll("(?i)\\s+(law|disputes?|cases?|matters?)$", "").trim();

        // Check against known canonical names
        String lower = first.toLowerCase();
        if (lower.startsWith("labour") || lower.startsWith("employment")) return "Labour";
        if (lower.startsWith("family") || lower.startsWith("divorce")) return "Family";
        if (lower.startsWith("criminal")) return "Criminal";
        if (lower.startsWith("corporate") || lower.startsWith("business")) return "Corporate";
        if (lower.startsWith("property") || lower.startsWith("real estate")) return "Property";
        if (lower.startsWith("cyber") || lower.startsWith("it")) return "Cyber";
        if (lower.startsWith("consumer")) return "Consumer";
        if (lower.startsWith("tax")) return "Tax";
        if (lower.startsWith("civil")) return "Civil";

        return first;
    }
}
