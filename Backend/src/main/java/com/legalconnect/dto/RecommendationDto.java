package com.legalconnect.dto;

import com.legalconnect.entity.enums.AvailabilityStatus;

public class RecommendationDto {

    private String lawyerId;
    private int matchPercentage;
    private int legalDomainRelevance;
    private int relevantExperienceScore;
    private int locationCompatibility;
    private int feeCompatibility;
    private double rating;
    private AvailabilityStatus availability;
    private String explanation;
    private String source = "backend-mock";

    public RecommendationDto() {
    }

    public String getLawyerId() {
        return lawyerId;
    }

    public void setLawyerId(String lawyerId) {
        this.lawyerId = lawyerId;
    }

    public int getMatchPercentage() {
        return matchPercentage;
    }

    public void setMatchPercentage(int matchPercentage) {
        this.matchPercentage = matchPercentage;
    }

    public int getLegalDomainRelevance() {
        return legalDomainRelevance;
    }

    public void setLegalDomainRelevance(int legalDomainRelevance) {
        this.legalDomainRelevance = legalDomainRelevance;
    }

    public int getRelevantExperienceScore() {
        return relevantExperienceScore;
    }

    public void setRelevantExperienceScore(int relevantExperienceScore) {
        this.relevantExperienceScore = relevantExperienceScore;
    }

    public int getLocationCompatibility() {
        return locationCompatibility;
    }

    public void setLocationCompatibility(int locationCompatibility) {
        this.locationCompatibility = locationCompatibility;
    }

    public int getFeeCompatibility() {
        return feeCompatibility;
    }

    public void setFeeCompatibility(int feeCompatibility) {
        this.feeCompatibility = feeCompatibility;
    }

    public double getRating() {
        return rating;
    }

    public void setRating(double rating) {
        this.rating = rating;
    }

    public AvailabilityStatus getAvailability() {
        return availability;
    }

    public void setAvailability(AvailabilityStatus availability) {
        this.availability = availability;
    }

    public String getExplanation() {
        return explanation;
    }

    public void setExplanation(String explanation) {
        this.explanation = explanation;
    }

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }
}
