package com.legalconnect.entity;

import com.legalconnect.entity.enums.AvailabilityStatus;
import com.legalconnect.entity.enums.VerificationStatus;
import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "lawyers", indexes = {
    @Index(name = "idx_lawyer_user_id", columnList = "user_id")
})
public class LawyerEntity {

    @Id
    @Column(name = "id", length = 64)
    private String id;

    @Column(name = "lawyer_code", unique = true, length = 10)
    private String lawyerCode;

    @Column(name = "user_id", nullable = false, unique = true, length = 64)
    private String userId;

    @Column(name = "full_name", nullable = false)
    private String fullName;

    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "phone")
    private String phone;

    @Column(name = "avatar_initials", length = 10)
    private String avatarInitials;

    @Column(name = "specialization")
    private String specialization;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(
            name = "lawyer_specializations",
            joinColumns = @JoinColumn(name = "lawyer_id")
    )
    @Column(name = "specialization_item")
    private List<String> specializations = new ArrayList<>();

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(
            name = "lawyer_legal_domains",
            joinColumns = @JoinColumn(name = "lawyer_id")
    )
    @Column(name = "legal_domain_item")
    private List<String> legalDomains = new ArrayList<>();

    @Column(name = "years_of_experience")
    private Integer yearsOfExperience = 0;

    @Column(name = "location")
    private String location;

    @Column(name = "consultation_fee")
    private Double consultationFee = 0.0;

    @Column(name = "rating")
    private Double rating = 5.0;

    @Column(name = "review_count")
    private Integer reviewCount = 0;

    @Enumerated(EnumType.STRING)
    @Column(name = "availability", length = 32)
    private AvailabilityStatus availability =
            AvailabilityStatus.AVAILABLE;

    @Enumerated(EnumType.STRING)
    @Column(name = "verification_status", length = 32)
    private VerificationStatus verificationStatus =
            VerificationStatus.PENDING;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(
            name = "lawyer_qualifications",
            joinColumns = @JoinColumn(name = "lawyer_id")
    )
    @Column(name = "qualification_item")
    private List<String> qualifications = new ArrayList<>();

    @Column(name = "relevant_experience", columnDefinition = "TEXT")
    private String relevantExperience;

    @Column(name = "bio", columnDefinition = "TEXT")
    private String bio;

    @Column(name = "availability_slots_json", columnDefinition = "TEXT")
    private String availabilitySlotsJson;

    @Column(name = "profile_completion")
    private Integer profileCompletion = 80;

    @Column(name = "is_demo")
    private Boolean isDemo = true;

    public LawyerEntity() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getLawyerCode() {
        return lawyerCode;
    }

    public void setLawyerCode(String lawyerCode) {
        this.lawyerCode = lawyerCode;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getAvatarInitials() {
        return avatarInitials;
    }

    public void setAvatarInitials(String avatarInitials) {
        this.avatarInitials = avatarInitials;
    }

    public String getSpecialization() {
        return specialization;
    }

    public void setSpecialization(String specialization) {
        this.specialization = specialization;
    }

    public List<String> getSpecializations() {
        return specializations;
    }

    public void setSpecializations(List<String> specializations) {
        this.specializations = specializations;
    }

    public List<String> getLegalDomains() {
        return legalDomains;
    }

    public void setLegalDomains(List<String> legalDomains) {
        this.legalDomains = legalDomains;
    }

    public Integer getYearsOfExperience() {
        return yearsOfExperience;
    }

    public void setYearsOfExperience(Integer yearsOfExperience) {
        this.yearsOfExperience = yearsOfExperience;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Double getConsultationFee() {
        return consultationFee;
    }

    public void setConsultationFee(Double consultationFee) {
        this.consultationFee = consultationFee;
    }

    public Double getRating() {
        return rating;
    }

    public void setRating(Double rating) {
        this.rating = rating;
    }

    public Integer getReviewCount() {
        return reviewCount;
    }

    public void setReviewCount(Integer reviewCount) {
        this.reviewCount = reviewCount;
    }

    public AvailabilityStatus getAvailability() {
        return availability;
    }

    public void setAvailability(AvailabilityStatus availability) {
        this.availability = availability;
    }

    public VerificationStatus getVerificationStatus() {
        return verificationStatus;
    }

    public void setVerificationStatus(VerificationStatus verificationStatus) {
        this.verificationStatus = verificationStatus;
    }

    public List<String> getQualifications() {
        return qualifications;
    }

    public void setQualifications(List<String> qualifications) {
        this.qualifications = qualifications;
    }

    public String getRelevantExperience() {
        return relevantExperience;
    }

    public void setRelevantExperience(String relevantExperience) {
        this.relevantExperience = relevantExperience;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public String getAvailabilitySlotsJson() {
        return availabilitySlotsJson;
    }

    public void setAvailabilitySlotsJson(String availabilitySlotsJson) {
        this.availabilitySlotsJson = availabilitySlotsJson;
    }

    public Integer getProfileCompletion() {
        return profileCompletion;
    }

    public void setProfileCompletion(Integer profileCompletion) {
        this.profileCompletion = profileCompletion;
    }

    public Boolean getIsDemo() {
        return isDemo;
    }

    public void setIsDemo(Boolean demo) {
        isDemo = demo;
    }
}