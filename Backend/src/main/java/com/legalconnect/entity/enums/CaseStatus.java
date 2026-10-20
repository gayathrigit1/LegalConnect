package com.legalconnect.entity.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum CaseStatus {
    OPEN("open"),
    IN_PROGRESS("in_progress"),
    CLOSED("closed");

    private final String value;

    CaseStatus(String value) {
        this.value = value;
    }

    @JsonValue
    public String getValue() {
        return value;
    }

    @JsonCreator
    public static CaseStatus fromString(String text) {
        if (text == null) return null;
        for (CaseStatus status : CaseStatus.values()) {
            if (status.name().equalsIgnoreCase(text) || status.value.equalsIgnoreCase(text)) {
                return status;
            }
        }
        throw new IllegalArgumentException("Unknown case status: " + text);
    }
}
