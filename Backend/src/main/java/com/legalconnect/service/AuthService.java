package com.legalconnect.service;

import com.legalconnect.dto.AuthResponse;
import com.legalconnect.dto.LoginRequest;
import com.legalconnect.dto.RegisterRequest;
import com.legalconnect.dto.UserDto;
import com.legalconnect.entity.LawyerEntity;
import com.legalconnect.entity.UserEntity;
import com.legalconnect.entity.enums.UserRole;
import com.legalconnect.exception.BadRequestException;
import com.legalconnect.repository.LawyerRepository;
import com.legalconnect.repository.UserRepository;
import com.legalconnect.security.JwtUtil;
import com.legalconnect.security.UserPrincipal;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final LawyerRepository lawyerRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;

    public AuthService(
            UserRepository userRepository,
            LawyerRepository lawyerRepository,
            PasswordEncoder passwordEncoder,
            JwtUtil jwtUtil,
            AuthenticationManager authenticationManager) {

        this.userRepository = userRepository;
        this.lawyerRepository = lawyerRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
        this.authenticationManager = authenticationManager;
    }

    @Transactional
    public AuthResponse register(RegisterRequest request) {

        if (userRepository.existsByEmailIgnoreCase(request.getEmail())) {
            throw new BadRequestException("Email already registered");
        }

        UserEntity user = new UserEntity();

        // Internal user ID remains UUID
        user.setId(UUID.randomUUID().toString());

        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        user.setPassword(
                passwordEncoder.encode(request.getPassword())
        );
        user.setPhone(request.getPhone());
        user.setRole(request.getRole());
        user.setLocation(request.getLocation());

        user = userRepository.save(user);

        if (request.getRole() == UserRole.LAWYER) {
            createLawyerProfile(user, request);
        }

        String token = jwtUtil.generateToken(
                user.getId(),
                user.getEmail(),
                user.getRole(),
                user.getFullName()
        );

        UserDto userDto = mapToUserDto(user);

        return new AuthResponse(token, userDto);
    }

    public AuthResponse login(LoginRequest request) {

        Authentication authentication =
                authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(
                                request.getEmail(),
                                request.getPassword()
                        )
                );

        UserPrincipal userPrincipal =
                (UserPrincipal) authentication.getPrincipal();

        String token = jwtUtil.generateToken(
                userPrincipal.getId(),
                userPrincipal.getUsername(),
                userPrincipal.getRole(),
                userPrincipal.getFullName()
        );

        UserEntity user =
                userRepository.findById(userPrincipal.getId())
                        .orElseThrow(() ->
                                new BadRequestException(
                                        "User not found"
                                )
                        );

        UserDto userDto = mapToUserDto(user);

        return new AuthResponse(token, userDto);
    }

    public UserDto getCurrentUser(String userId) {

        UserEntity user =
                userRepository.findById(userId)
                        .orElseThrow(() ->
                                new BadRequestException(
                                        "User not found"
                                )
                        );

        return mapToUserDto(user);
    }

    private void createLawyerProfile(
            UserEntity user,
            RegisterRequest request) {

        LawyerEntity lawyer = new LawyerEntity();

        // Internal database ID remains UUID
        lawyer.setId(UUID.randomUUID().toString());

        // Visible lawyer ID: L0001, L0002, L0003...
        lawyer.setLawyerCode(generateLawyerCode());

        lawyer.setUserId(user.getId());
        lawyer.setFullName(user.getFullName());
        lawyer.setEmail(user.getEmail());
        lawyer.setPhone(user.getPhone());
        lawyer.setSpecialization(request.getSpecialization());
        lawyer.setSpecializations(request.getSpecializations());
        lawyer.setLegalDomains(request.getLegalDomains());
        lawyer.setYearsOfExperience(request.getYearsOfExperience());
        lawyer.setConsultationFee(request.getConsultationFee());
        lawyer.setQualifications(request.getQualifications());
        lawyer.setRelevantExperience(request.getRelevantExperience());
        lawyer.setBio(request.getBio());
        lawyer.setLocation(user.getLocation());

        lawyerRepository.save(lawyer);
    }

    private String generateLawyerCode() {

        int nextNumber = lawyerRepository.findAll()
                .stream()
                .map(LawyerEntity::getLawyerCode)
                .filter(code ->
                        code != null && code.startsWith("L"))
                .map(code -> {
                    try {
                        return Integer.parseInt(code.substring(1));
                    } catch (NumberFormatException e) {
                        return 0;
                    }
                })
                .max(Integer::compareTo)
                .orElse(0) + 1;

        return String.format("L%04d", nextNumber);
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