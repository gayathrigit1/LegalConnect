package com.legalconnect.entity.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum AvailabilityStatus {
    AVAILABLE("available"),
    BUSY("busy"),
    UNAVAILABLE("unavailable");

    private final String value;

    AvailabilityStatus(String value) {
        this.value = value;
    }

    @JsonValue
    public String getValue() {
        return value;
    }

    @JsonCreator
    public static AvailabilityStatus fromString(String text) {
        if (text == null) return null;
        for (AvailabilityStatus status : AvailabilityStatus.values()) {
            if (status.name().equalsIgnoreCase(text) || status.value.equalsIgnoreCase(text)) {
                return status;
            }
        }
        throw new IllegalArgumentException("Unknown availability status: " + text);
    }
}
