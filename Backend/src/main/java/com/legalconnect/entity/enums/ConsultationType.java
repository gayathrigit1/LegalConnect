package com.legalconnect.entity.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum ConsultationType {
    VIDEO("video"),
    IN_PERSON("in_person"),
    PHONE("phone");

    private final String value;

    ConsultationType(String value) {
        this.value = value;
    }

    @JsonValue
    public String getValue() {
        return value;
    }

    @JsonCreator
    public static ConsultationType fromString(String text) {
        if (text == null) return null;
        for (ConsultationType type : ConsultationType.values()) {
            if (type.name().equalsIgnoreCase(text) || type.value.equalsIgnoreCase(text)) {
                return type;
            }
        }
        throw new IllegalArgumentException("Unknown consultation type: " + text);
    }
}
