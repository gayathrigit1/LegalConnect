package com.legalconnect.controller;

import com.legalconnect.config.RazorpayConfig;
import com.legalconnect.dto.AiAnalysisResultDto;
import com.legalconnect.entity.ConsultationEntity;
import com.legalconnect.entity.LawyerEntity;
import com.legalconnect.entity.UserEntity;
import com.legalconnect.entity.enums.ConsultationStatus;
import com.legalconnect.entity.enums.ConsultationType;
import com.legalconnect.repository.ConsultationRepository;
import com.legalconnect.repository.LawyerRepository;
import com.legalconnect.repository.UserRepository;
import com.legalconnect.security.UserPrincipal;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import org.json.JSONObject;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import java.time.Instant;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class AiAndPaymentIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private RazorpayConfig razorpayConfig;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private LawyerRepository lawyerRepository;

    @Autowired
    private ConsultationRepository consultationRepository;

    @Test
    @WithMockUser(username = "user@demo.com", roles = {"USER"})
    @DisplayName("AI Analysis: Should analyze Labour issue with JSON payload")
    void testAiAnalyzeLabour() throws Exception {
        String json = """
            {
                "problemDescription": "My employer suddenly terminated my contract without paying my 2 months notice period and Rs 50,000 salary."
            }
            """;

        mockMvc.perform(post("/api/ai/analyze")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.probableLegalDomain").value("Labour / Employment"))
                .andExpect(jsonPath("$.source").value("rule-engine"))
                .andExpect(jsonPath("$.caseSummary").isNotEmpty())
                .andExpect(jsonPath("$.keyPoints").isArray())
                .andExpect(jsonPath("$.importantInformation").isArray())
                .andExpect(jsonPath("$.recommendation").isNotEmpty())
                .andExpect(jsonPath("$.disclaimer").isNotEmpty());
    }

    @Test
    @WithMockUser(username = "user@demo.com", roles = {"USER"})
    @DisplayName("AI Analysis: Should accept alternative field name 'problem'")
    void testAiAnalyzeAlias() throws Exception {
        String json = """
            {
                "problem": "The landlord is threatening to evict me from my flat and refusing to return the advance rent deposit."
            }
            """;

        mockMvc.perform(post("/api/ai/analyze")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.probableLegalDomain").value("Property"))
                .andExpect(jsonPath("$.source").value("rule-engine"));
    }

    @Test
    @WithMockUser(username = "user@demo.com", roles = {"USER"})
    @DisplayName("AI Analysis: Should reject empty request body with 400 Bad Request")
    void testAiAnalyzeEmpty() throws Exception {
        mockMvc.perform(post("/api/ai/analyze")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{}"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message").isNotEmpty());
    }

    @Test
    @WithMockUser(username = "user@demo.com", roles = {"USER"})
    @DisplayName("AI Recommendations: Should return ranked recommendations for Labour domain")
    void testAiRecommendations() throws Exception {
        mockMvc.perform(get("/api/ai/recommendations").param("domain", "Labour"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$[0].lawyerId").isNotEmpty())
                .andExpect(jsonPath("$[0].matchPercentage").isNumber())
                .andExpect(jsonPath("$[0].source").value("rule-engine"));
    }

    @Test
    @DisplayName("Razorpay Config: Public config endpoint should return configured status and test key")
    void testRazorpayPublicConfig() throws Exception {
        mockMvc.perform(get("/api/payments/config"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.isConfigured").value(true))
                .andExpect(jsonPath("$.mode").value("TEST"))
                .andExpect(jsonPath("$.currency").value("INR"))
                .andExpect(jsonPath("$.keyId").value(org.hamcrest.Matchers.startsWith("rzp_test_")));
    }

    @Test
    @DisplayName("Razorpay Order Creation: Directly verifies order creation with Razorpay TEST API")
    void testRazorpayDirectOrderCreation() throws Exception {
        assertTrue(razorpayConfig.isConfigured(), "Razorpay must be configured");

        RazorpayClient client = razorpayConfig.getClient();
        assertNotNull(client, "Razorpay client must not be null");

        JSONObject orderRequest = new JSONObject();
        orderRequest.put("amount", 10000); // 100 INR in paise
        orderRequest.put("currency", "INR");
        orderRequest.put("receipt", "test_" + UUID.randomUUID().toString().substring(0, 10));

        JSONObject notes = new JSONObject();
        notes.put("test", "LegalConnect-Integration-Test");
        orderRequest.put("notes", notes);

        // Creates an actual order in Razorpay TEST mode
        Order order = client.orders.create(orderRequest);
        assertNotNull(order, "Created order should not be null");
        String orderId = order.get("id");
        assertNotNull(orderId, "Order ID should not be null");
        assertTrue(orderId.startsWith("order_"), "Order ID must start with 'order_' prefix");
    }
}

