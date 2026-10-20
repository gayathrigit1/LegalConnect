package com.legalconnect.entity.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum DocumentStatus {
    UPLOADED("uploaded"),
    PROCESSING("processing"),
    PROCESSED("processed"),
    FAILED("failed");

    private final String value;

    DocumentStatus(String value) {
        this.value = value;
    }

    @JsonValue
    public String getValue() {
        return value;
    }

    @JsonCreator
    public static DocumentStatus fromString(String text) {
        if (text == null) return null;
        for (DocumentStatus status : DocumentStatus.values()) {
            if (status.name().equalsIgnoreCase(text) || status.value.equalsIgnoreCase(text)) {
                return status;
            }
        }
        throw new IllegalArgumentException("Unknown document status: " + text);
    }
}
