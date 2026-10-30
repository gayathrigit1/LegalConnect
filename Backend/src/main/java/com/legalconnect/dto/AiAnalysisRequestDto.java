package com.legalconnect.dto;

import com.fasterxml.jackson.annotation.JsonAlias;

public class AiAnalysisRequestDto {

    @JsonAlias({"problem", "description", "caseDescription", "text", "summary"})
    private String problemDescription;

    public AiAnalysisRequestDto() {
    }

    public AiAnalysisRequestDto(String problemDescription) {
        this.problemDescription = problemDescription;
    }

    public String getProblemDescription() {
        return problemDescription;
    }

    public void setProblemDescription(String problemDescription) {
        this.problemDescription = problemDescription;
    }
}

