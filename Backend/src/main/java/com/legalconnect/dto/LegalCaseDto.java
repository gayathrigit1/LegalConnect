package com.legalconnect.dto;

import com.legalconnect.entity.enums.CaseStatus;

public class LegalCaseDto {

    private String id;
    private String userId;
    private String title;
    private String domain;
    private String summary;
    private CaseStatus status;
    private String assignedLawyerId;
    private String createdAt;
    private String updatedAt;

    public LegalCaseDto() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
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

    public CaseStatus getStatus() {
        return status;
    }

    public void setStatus(CaseStatus status) {
        this.status = status;
    }

    public String getAssignedLawyerId() {
        return assignedLawyerId;
    }

    public void setAssignedLawyerId(String assignedLawyerId) {
        this.assignedLawyerId = assignedLawyerId;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }

    public String getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(String updatedAt) {
        this.updatedAt = updatedAt;
    }
}
