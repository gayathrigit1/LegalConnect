package com.legalconnect.dto;

import jakarta.validation.constraints.NotBlank;

public class CreateOrderRequest {

    @NotBlank(message = "Consultation ID is required")
    private String consultationId;

    public CreateOrderRequest() {
    }

    public CreateOrderRequest(String consultationId) {
        this.consultationId = consultationId;
    }

    public String getConsultationId() {
        return consultationId;
    }

    public void setConsultationId(String consultationId) {
        this.consultationId = consultationId;
    }
}
