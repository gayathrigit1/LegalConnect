package com.legalconnect.entity;

import com.legalconnect.entity.enums.CaseStatus;
import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "legal_cases", indexes = {
    @Index(name = "idx_case_user_id", columnList = "user_id"),
    @Index(name = "idx_case_assigned_lawyer_id", columnList = "assigned_lawyer_id")
})
public class LegalCaseEntity {

    @Id
    @Column(name = "id", length = 64)
    private String id;

    @Column(name = "user_id", nullable = false, length = 64)
    private String userId;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "domain")
    private String domain;

    @Column(name = "summary", columnDefinition = "TEXT")
    private String summary;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, length = 32)
    private CaseStatus status = CaseStatus.OPEN;

    @Column(name = "assigned_lawyer_id", length = 64)
    private String assignedLawyerId;

    @Column(name = "created_at", nullable = false)
    private Instant createdAt = Instant.now();

    @Column(name = "updated_at")
    private Instant updatedAt = Instant.now();

    public LegalCaseEntity() {
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

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public Instant getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Instant updatedAt) {
        this.updatedAt = updatedAt;
    }
}
