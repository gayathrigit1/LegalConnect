package com.legalconnect.entity.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum ConsultationStatus {
    PENDING("pending"),
    ACCEPTED("accepted"),
    REJECTED("rejected"),
    COMPLETED("completed"),
    CANCELLED("cancelled");

    private final String value;

    ConsultationStatus(String value) {
        this.value = value;
    }

    @JsonValue
    public String getValue() {
        return value;
    }

    @JsonCreator
    public static ConsultationStatus fromString(String text) {
        if (text == null) return null;
        for (ConsultationStatus status : ConsultationStatus.values()) {
            if (status.name().equalsIgnoreCase(text) || status.value.equalsIgnoreCase(text)) {
                return status;
            }
        }
        throw new IllegalArgumentException("Unknown consultation status: " + text);
    }
}
