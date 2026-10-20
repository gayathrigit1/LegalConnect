package com.legalconnect.entity;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "reviews", indexes = {
    @Index(name = "idx_review_lawyer_id", columnList = "lawyer_id"),
    @Index(name = "idx_review_user_id", columnList = "user_id")
})
public class ReviewEntity {

    @Id
    @Column(name = "id", length = 64)
    private String id;

    @Column(name = "lawyer_id", nullable = false, length = 64)
    private String lawyerId;

    @Column(name = "lawyer_name")
    private String lawyerName;

    @Column(name = "user_id", nullable = false, length = 64)
    private String userId;

    @Column(name = "user_name")
    private String userName;

    @Column(name = "rating", nullable = false)
    private Integer rating;

    @Column(name = "comment", columnDefinition = "TEXT")
    private String comment;

    @Column(name = "created_at", nullable = false)
    private Instant createdAt = Instant.now();

    public ReviewEntity() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
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

    public Integer getRating() {
        return rating;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }
}
