package com.legalconnect.service;

import com.legalconnect.dto.AiAnalysisResultDto;
import com.legalconnect.exception.BadRequestException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class LegalAnalysisServiceTest {

    private LegalAnalysisService service;

    @BeforeEach
    void setUp() {
        service = new LegalAnalysisService();
    }

    @Test
    @DisplayName("Should correctly classify a Labour / Employment case")
    void testLabourCaseClassification() {
        String problem = "I was terminated from my job without any notice period or severance pay. My employer is refusing to pay unpaid salary of Rs 75,000.";
        AiAnalysisResultDto result = service.analyse(problem);

        assertNotNull(result);
        assertEquals("Labour / Employment", result.getProbableLegalDomain());
        assertNotNull(result.getCaseSummary());
        assertFalse(result.getImportantInformation().isEmpty());
        assertFalse(result.getKeyPoints().isEmpty());
        assertNotNull(result.getRecommendation());
        assertNotNull(result.getDisclaimer());
        assertEquals("rule-engine", result.getSource());
    }

    @Test
    @DisplayName("Should correctly classify a Family law case")
    void testFamilyCaseClassification() {
        String problem = "My spouse and I are seeking divorce and mutual separation. We need to resolve child custody and monthly maintenance.";
        AiAnalysisResultDto result = service.analyse(problem);

        assertNotNull(result);
        assertEquals("Family", result.getProbableLegalDomain());
        assertTrue(result.getRecommendation().toLowerCase().contains("family"));
    }

    @Test
    @DisplayName("Should correctly classify a Criminal law case")
    void testCriminalCaseClassification() {
        String problem = "An FIR has been filed at the police station alleging fraud and cheating under section 420. We need urgent anticipatory bail.";
        AiAnalysisResultDto result = service.analyse(problem);

        assertNotNull(result);
        assertEquals("Criminal", result.getProbableLegalDomain());
        assertTrue(result.getRecommendation().toLowerCase().contains("bail"));
    }

    @Test
    @DisplayName("Should correctly classify a Property law case")
    void testPropertyCaseClassification() {
        String problem = "The landlord is threatening illegal eviction from the rented apartment without notice and withholding the security deposit of Rs 50,000.";
        AiAnalysisResultDto result = service.analyse(problem);

        assertNotNull(result);
        assertEquals("Property", result.getProbableLegalDomain());
    }

    @Test
    @DisplayName("Should extract monetary values and document mentions into important information")
    void testFactExtraction() {
        String problem = "I signed an employment contract 6 months ago. The employer breached the agreement and withheld Rs 1,50,000 in gratuity.";
        AiAnalysisResultDto result = service.analyse(problem);

        assertNotNull(result);
        boolean foundMoney = result.getImportantInformation().stream().anyMatch(info -> info.contains("monetary value"));
        boolean foundDoc = result.getImportantInformation().stream().anyMatch(info -> info.contains("contract") || info.contains("agreement"));
        assertTrue(foundMoney, "Should identify monetary dispute");
        assertTrue(foundDoc, "Should identify key documents");
    }

    @Test
    @DisplayName("Should throw BadRequestException for short descriptions")
    void testValidationShortDescription() {
        assertThrows(BadRequestException.class, () -> service.analyse("too short"));
    }

    @Test
    @DisplayName("Should gracefully handle brief input between 10 and 24 characters without exception")
    void testBriefInputHandledGracefully() {
        String problem = "Salary not paid yet"; // 19 chars
        AiAnalysisResultDto result = service.analyse(problem);

        assertNotNull(result);
        assertEquals("Labour / Employment", result.getProbableLegalDomain());
        assertTrue(result.getImportantInformation().stream().anyMatch(info -> info.contains("Input is brief")));
    }

    @Test
    @DisplayName("Should throw BadRequestException for null description")
    void testValidationNullDescription() {
        assertThrows(BadRequestException.class, () -> service.analyse(null));
    }
}

