package com.legalconnect.entity.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum UserRole {
    USER("user"),
    LAWYER("lawyer"),
    ADMIN("admin");

    private final String value;

    UserRole(String value) {
        this.value = value;
    }

    @JsonValue
    public String getValue() {
        return value;
    }

    @JsonCreator
    public static UserRole fromString(String text) {
        if (text == null) return null;
        for (UserRole role : UserRole.values()) {
            if (role.name().equalsIgnoreCase(text) || role.value.equalsIgnoreCase(text)) {
                return role;
            }
        }
        throw new IllegalArgumentException("Unknown user role: " + text);
    }
}
