package com.legalconnect.dto;

import com.legalconnect.entity.enums.ConsultationType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class ConsultationRequestPayload {

    private String userId;
    private String userName;

    @NotBlank(message = "Lawyer ID is required")
    private String lawyerId;

    private String lawyerName;
    private String caseId;
    private String caseTitle;

    @NotBlank(message = "Preferred date is required")
    private String preferredDate;

    @NotBlank(message = "Preferred time is required")
    private String preferredTime;

    @NotBlank(message = "Description is required")
    private String description;

    @NotNull(message = "Consultation type is required")
    private ConsultationType type = ConsultationType.VIDEO;

    public ConsultationRequestPayload() {
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getLawyerId() {
        return lawyerId;
    }

    public void setLawyerId(String lawyerId) {
        this.lawyerId = lawyerId;
    }

    public String getLawyerName() {
        return lawyerName;
    }

    public void setLawyerName(String lawyerName) {
        this.lawyerName = lawyerName;
    }

    public String getCaseId() {
        return caseId;
    }

    public void setCaseId(String caseId) {
        this.caseId = caseId;
    }

    public String getCaseTitle() {
        return caseTitle;
    }

    public void setCaseTitle(String caseTitle) {
        this.caseTitle = caseTitle;
    }

    public String getPreferredDate() {
        return preferredDate;
    }

    public void setPreferredDate(String preferredDate) {
        this.preferredDate = preferredDate;
    }

    public String getPreferredTime() {
        return preferredTime;
    }

    public void setPreferredTime(String preferredTime) {
        this.preferredTime = preferredTime;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public ConsultationType getType() {
        return type;
    }

    public void setType(ConsultationType type) {
        this.type = type;
    }
}
