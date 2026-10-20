package com.legalconnect.dto;

import com.legalconnect.entity.enums.AvailabilityStatus;
import com.legalconnect.entity.enums.VerificationStatus;
import java.util.ArrayList;
import java.util.List;

public class LawyerDto {

    private String id;
    private String lawyerCode;
    private String userId;
    private String fullName;
    private String email;
    private String phone;
    private String avatarInitials;
    private String specialization;
    private List<String> specializations = new ArrayList<>();
    private List<String> legalDomains = new ArrayList<>();
    private int yearsOfExperience;
    private String location;
    private double consultationFee;
    private double rating;
    private int reviewCount;
    private AvailabilityStatus availability;
    private VerificationStatus verificationStatus;
    private List<String> qualifications = new ArrayList<>();
    private String relevantExperience;
    private String bio;
    private List<LawyerAvailabilitySlotDto> availabilitySlots =
            new ArrayList<>();
    private int profileCompletion;
    private boolean isDemo = true;

    public LawyerDto() {
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

    public int getYearsOfExperience() {
        return yearsOfExperience;
    }

    public void setYearsOfExperience(int yearsOfExperience) {
        this.yearsOfExperience = yearsOfExperience;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public double getConsultationFee() {
        return consultationFee;
    }

    public void setConsultationFee(double consultationFee) {
        this.consultationFee = consultationFee;
    }

    public double getRating() {
        return rating;
    }

    public void setRating(double rating) {
        this.rating = rating;
    }

    public int getReviewCount() {
        return reviewCount;
    }

    public void setReviewCount(int reviewCount) {
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

    public List<LawyerAvailabilitySlotDto> getAvailabilitySlots() {
        return availabilitySlots;
    }

    public void setAvailabilitySlots(
            List<LawyerAvailabilitySlotDto> availabilitySlots) {
        this.availabilitySlots = availabilitySlots;
    }

    public int getProfileCompletion() {
        return profileCompletion;
    }

    public void setProfileCompletion(int profileCompletion) {
        this.profileCompletion = profileCompletion;
    }

    public boolean isDemo() {
        return isDemo;
    }

    public void setDemo(boolean demo) {
        isDemo = demo;
    }
}