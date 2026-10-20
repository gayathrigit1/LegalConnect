package com.legalconnect.dto;

import com.legalconnect.entity.enums.VerificationStatus;
import jakarta.validation.constraints.NotNull;

public class VerificationUpdateRequest {

    @NotNull(message = "Verification status is required")
    private VerificationStatus verificationStatus;

    public VerificationUpdateRequest() {
    }

    public VerificationUpdateRequest(VerificationStatus verificationStatus) {
        this.verificationStatus = verificationStatus;
    }

    public VerificationStatus getVerificationStatus() {
        return verificationStatus;
    }

    public void setVerificationStatus(VerificationStatus verificationStatus) {
        this.verificationStatus = verificationStatus;
    }
}
