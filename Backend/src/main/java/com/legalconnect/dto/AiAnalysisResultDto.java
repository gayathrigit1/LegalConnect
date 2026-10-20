package com.legalconnect.dto;

import java.util.List;

public class AiAnalysisResultDto {

    private String probableLegalDomain;
    private List<String> importantInformation;
    private String caseSummary;
    private List<String> keyPoints;
    private String recommendation;
    private String disclaimer;
    private String source = "backend-mock";

    public AiAnalysisResultDto() {
    }

    public String getProbableLegalDomain() {
        return probableLegalDomain;
    }

    public void setProbableLegalDomain(String probableLegalDomain) {
        this.probableLegalDomain = probableLegalDomain;
    }

    public List<String> getImportantInformation() {
        return importantInformation;
    }

    public void setImportantInformation(List<String> importantInformation) {
        this.importantInformation = importantInformation;
    }

    public String getCaseSummary() {
        return caseSummary;
    }

    public void setCaseSummary(String caseSummary) {
        this.caseSummary = caseSummary;
    }

    public List<String> getKeyPoints() {
        return keyPoints;
    }

    public void setKeyPoints(List<String> keyPoints) {
        this.keyPoints = keyPoints;
    }

    public String getRecommendation() {
        return recommendation;
    }

    public void setRecommendation(String recommendation) {
        this.recommendation = recommendation;
    }

    public String getDisclaimer() {
        return disclaimer;
    }

    public void setDisclaimer(String disclaimer) {
        this.disclaimer = disclaimer;
    }

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }
}
