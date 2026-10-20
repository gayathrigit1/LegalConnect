package com.legalconnect.dto;

import com.legalconnect.entity.enums.CaseStatus;
import jakarta.validation.constraints.NotBlank;

public class LegalCaseRequestDto {

    @NotBlank(message = "Case title is required")
    private String title;

    private String domain;
    private String summary;
    private String assignedLawyerId;
    private CaseStatus status = CaseStatus.OPEN;

    public LegalCaseRequestDto() {
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDomain() {
        return domain;
    }

    public void setDomain(String domain) {
        this.domain = domain;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public String getAssignedLawyerId() {
        return assignedLawyerId;
    }

    public void setAssignedLawyerId(String assignedLawyerId) {
        this.assignedLawyerId = assignedLawyerId;
    }

    public CaseStatus getStatus() {
        return status;
    }

    public void setStatus(CaseStatus status) {
        this.status = status;
    }
}
