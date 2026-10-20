package com.legalconnect.entity.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum VerificationStatus {
    PENDING("pending"),
    VERIFIED("verified"),
    REJECTED("rejected");

    private final String value;

    VerificationStatus(String value) {
        this.value = value;
    }

    @JsonValue
    public String getValue() {
        return value;
    }

    @JsonCreator
    public static VerificationStatus fromString(String text) {
        if (text == null) return null;
        for (VerificationStatus status : VerificationStatus.values()) {
            if (status.name().equalsIgnoreCase(text) || status.value.equalsIgnoreCase(text)) {
                return status;
            }
        }
        throw new IllegalArgumentException("Unknown verification status: " + text);
    }
}
