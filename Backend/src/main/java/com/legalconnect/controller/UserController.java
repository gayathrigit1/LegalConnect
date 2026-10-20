package com.legalconnect.controller;

import com.legalconnect.dto.UserDto;
import com.legalconnect.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@Tag(name = "User Management", description = "User profile management endpoints")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/{userId}")
    @Operation(summary = "Get user profile", description = "Get user profile by ID. Users can only view their own profile.")
    public ResponseEntity<UserDto> getUserProfile(@PathVariable String userId, Authentication authentication) {
        UserDto userDto = userService.getUserProfile(userId, authentication);
        return ResponseEntity.ok(userDto);
    }

    @PutMapping("/{userId}")
    @Operation(summary = "Update user profile", description = "Update user profile. Users can only update their own profile.")
    public ResponseEntity<UserDto> updateUserProfile(@PathVariable String userId, @Valid @RequestBody UserDto userDto, Authentication authentication) {
        UserDto updatedUser = userService.updateUserProfile(userId, userDto, authentication);
        return ResponseEntity.ok(updatedUser);
    }
}
