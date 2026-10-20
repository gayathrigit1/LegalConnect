package com.legalconnect.service;

import com.legalconnect.dto.UserDto;
import com.legalconnect.entity.UserEntity;
import com.legalconnect.exception.ForbiddenException;
import com.legalconnect.exception.ResourceNotFoundException;
import com.legalconnect.repository.UserRepository;
import com.legalconnect.security.UserPrincipal;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserDto getUserProfile(String userId, Authentication authentication) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();

        if (!userPrincipal.getId().equals(userId)) {
            throw new ForbiddenException("You can only view your own profile");
        }

        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        return mapToUserDto(user);
    }

    public UserDto updateUserProfile(String userId, UserDto userDto, Authentication authentication) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();

        if (!userPrincipal.getId().equals(userId)) {
            throw new ForbiddenException("You can only update your own profile");
        }

        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        if (userDto.getFullName() != null) {
            user.setFullName(userDto.getFullName());
        }
        if (userDto.getPhone() != null) {
            user.setPhone(userDto.getPhone());
        }
        if (userDto.getLocation() != null) {
            user.setLocation(userDto.getLocation());
        }
        if (userDto.getAvatarUrl() != null) {
            user.setAvatarUrl(userDto.getAvatarUrl());
        }

        user = userRepository.save(user);
        return mapToUserDto(user);
    }

    private UserDto mapToUserDto(UserEntity user) {
        return new UserDto(
                user.getId(),
                user.getFullName(),
                user.getEmail(),
                user.getPhone(),
                user.getRole(),
                user.getAvatarUrl(),
                user.getLocation(),
                user.getCreatedAt()
        );
    }
}
