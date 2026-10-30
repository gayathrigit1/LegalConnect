package com.legalconnect.entity;

import com.legalconnect.entity.enums.ConsultationStatus;
import com.legalconnect.entity.enums.ConsultationType;
import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "consultations", indexes = {
    @Index(name = "idx_consultation_user_id", columnList = "user_id"),
    @Index(name = "idx_consultation_lawyer_id", columnList = "lawyer_id"),
    @Index(name = "idx_consultation_status", columnList = "status")
})
public class ConsultationEntity {

    @Id
    @Column(name = "id", length = 64)
    private String id;

    @Column(name = "user_id", nullable = false, length = 64)
    private String userId;

    @Column(name = "user_name")
    private String userName;

    @Column(name = "lawyer_id", nullable = false, length = 64)
    private String lawyerId;

    @Column(name = "lawyer_name")
    private String lawyerName;

    @Column(name = "case_id", length = 64)
    private String caseId;

    @Column(name = "case_title")
    private String caseTitle;

    @Column(name = "preferred_date")
    private String preferredDate;

    @Column(name = "preferred_time")
    private String preferredTime;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(name = "type", length = 32)
    private ConsultationType type = ConsultationType.VIDEO;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, length = 32)
    private ConsultationStatus status = ConsultationStatus.PENDING;

    @Column(name = "payment_status", length = 32)
    private String paymentStatus = "UNPAID";

    @Column(name = "payment_id", length = 64)
    private String paymentId;

    @Column(name = "created_at", nullable = false)
    private Instant createdAt = Instant.now();

    public ConsultationEntity() {
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

    public ConsultationStatus getStatus() {
        return status;
    }

    public void setStatus(ConsultationStatus status) {
        this.status = status;
    }

    public String getPaymentStatus() {
        return paymentStatus;
    }

    public void setPaymentStatus(String paymentStatus) {
        this.paymentStatus = paymentStatus;
    }

    public String getPaymentId() {
        return paymentId;
    }

    public void setPaymentId(String paymentId) {
        this.paymentId = paymentId;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }
}
