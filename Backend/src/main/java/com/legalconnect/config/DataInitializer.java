package com.legalconnect.config;

import com.legalconnect.entity.LawyerEntity;
import com.legalconnect.entity.UserEntity;
import com.legalconnect.entity.enums.AvailabilityStatus;
import com.legalconnect.entity.enums.UserRole;
import com.legalconnect.entity.enums.VerificationStatus;
import com.legalconnect.repository.LawyerRepository;
import com.legalconnect.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;

/**
 * Seeds demo accounts and lawyer profiles so the frontend demo logins
 * (user@demo.com / lawyer@demo.com / admin@demo.com, password demo123)
 * and mock lawyer IDs (lawyer-1 … lawyer-8) work against the real API.
 */
@Component
public class DataInitializer implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(DataInitializer.class);
    private static final String DEMO_PASSWORD = "demo123";

    private final UserRepository userRepository;
    private final LawyerRepository lawyerRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(
            UserRepository userRepository,
            LawyerRepository lawyerRepository,
            PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.lawyerRepository = lawyerRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    @Transactional
    public void run(String... args) {
        String encodedPassword = passwordEncoder.encode(DEMO_PASSWORD);

        ensureUser("user-1", "Ananya Mehta", "user@demo.com", "+91 98765 01001",
                UserRole.USER, "Pune, Maharashtra", encodedPassword);
        ensureUser("admin-1", "Campus Admin", "admin@demo.com", "+91 98765 03001",
                UserRole.ADMIN, "Campus Lab", encodedPassword);

        seedLawyer(
                "lawyer-1", "lawyer-user-1", "L0001",
                "Kavya Iyer (Demo)", "lawyer@demo.com", "+91 98765 02001", "KI",
                "Family Law", List.of("Family Law", "Mediation"), List.of("Family", "Civil"),
                8, "Mumbai, Maharashtra", 1500.0, 4.6, 18,
                AvailabilityStatus.AVAILABLE, VerificationStatus.VERIFIED,
                List.of("LL.B. (Demo University)", "Bar Council Enrolment — Demo Record"),
                "Demo profile highlighting family dispute and mediation casework in a mock dataset.",
                "Demo advocate profile used for UI demonstration. Not a licensed professional listing.",
                92, encodedPassword
        );
        seedLawyer(
                "lawyer-2", "lawyer-user-2", "L0002",
                "Arjun Deshmukh (Demo)", "arjun.deshmukh@demo.com", "+91 98765 02002", "AD",
                "Criminal Law", List.of("Criminal Law", "Bail Matters"), List.of("Criminal"),
                12, "Pune, Maharashtra", 2200.0, 4.8, 31,
                AvailabilityStatus.BUSY, VerificationStatus.VERIFIED,
                List.of("LL.B.", "LL.M. Criminal Justice (Demo)"),
                "Mock criminal-procedure experience for matching UI only.",
                "Fictional profile for matching, comparison, and consultation screens.",
                88, encodedPassword
        );
        seedLawyer(
                "lawyer-3", "lawyer-user-3", "L0003",
                "Meera Kapoor (Demo)", "meera.kapoor@demo.com", "+91 98765 02003", "MK",
                "Corporate Law", List.of("Corporate Law", "Contracts"), List.of("Corporate", "Civil"),
                10, "Bengaluru, Karnataka", 2800.0, 4.5, 22,
                AvailabilityStatus.AVAILABLE, VerificationStatus.VERIFIED,
                List.of("B.A. LL.B. (Hons.) — Demo College"),
                "Mock startup contract and compliance advisory experience.",
                "Demo corporate counsel profile for search and comparison.",
                80, encodedPassword
        );
        seedLawyer(
                "lawyer-4", "lawyer-user-4", "L0004",
                "Siddharth Rao (Demo)", "siddharth.rao@demo.com", "+91 98765 02004", "SR",
                "Property Law", List.of("Property Law", "Real Estate"), List.of("Property", "Civil"),
                15, "Hyderabad, Telangana", 1800.0, 4.4, 27,
                AvailabilityStatus.AVAILABLE, VerificationStatus.PENDING,
                List.of("LL.B. — Demo Institute"),
                "Mock title-check and tenancy dispute experience.",
                "Pending-verification demo profile used in the admin verification table.",
                64, encodedPassword
        );
        seedLawyer(
                "lawyer-5", "lawyer-user-5", "L0005",
                "Nisha Banerjee (Demo)", "nisha.banerjee@demo.com", "+91 98765 02005", "NB",
                "Labour Law", List.of("Labour Law", "Employment"), List.of("Labour", "Civil"),
                7, "Kolkata, West Bengal", 1200.0, 4.3, 14,
                AvailabilityStatus.UNAVAILABLE, VerificationStatus.VERIFIED,
                List.of("LL.B.", "PG Diploma in Labour Laws (Demo)"),
                "Mock workplace dispute and notice-period advisory experience.",
                "Demo labour-law profile for filter and matching screens.",
                76, encodedPassword
        );
        seedLawyer(
                "lawyer-6", "lawyer-user-6", "L0006",
                "Vikram Sethi (Demo)", "vikram.sethi@demo.com", "+91 98765 02006", "VS",
                "Cyber Law", List.of("Cyber Law", "IT Contracts"), List.of("Cyber", "Criminal"),
                6, "Delhi, NCR", 2000.0, 4.7, 19,
                AvailabilityStatus.AVAILABLE, VerificationStatus.VERIFIED,
                List.of("B.Tech + LL.B. Dual Track (Demo)"),
                "Mock cyber-complaint and digital-evidence briefing experience.",
                "Demo cyber-law profile used in AI matching recommendations.",
                85, encodedPassword
        );
        seedLawyer(
                "lawyer-7", "lawyer-user-7", "L0007",
                "Fatima Qureshi (Demo)", "fatima.qureshi@demo.com", "+91 98765 02007", "FQ",
                "Consumer Law", List.of("Consumer Law", "Negligence"), List.of("Consumer", "Civil"),
                9, "Chennai, Tamil Nadu", 1100.0, 4.2, 11,
                AvailabilityStatus.BUSY, VerificationStatus.REJECTED,
                List.of("LL.B. — Demo College of Law"),
                "Mock consumer-forum filing experience.",
                "Rejected-verification demo profile for admin management screens.",
                58, encodedPassword
        );
        seedLawyer(
                "lawyer-8", "lawyer-user-8", "L0008",
                "Harsh Patel (Demo)", "harsh.patel@demo.com", "+91 98765 02008", "HP",
                "Tax Law", List.of("Tax Law", "GST"), List.of("Tax", "Corporate"),
                11, "Ahmedabad, Gujarat", 2500.0, 4.1, 16,
                AvailabilityStatus.AVAILABLE, VerificationStatus.PENDING,
                List.of("CA + LL.B. (Demo Combined Qualification)"),
                "Mock GST notice response experience for demo matching.",
                "Demo tax-law profile pending admin verification.",
                71, encodedPassword
        );

        log.info("Demo data ready. Logins: user@demo.com / lawyer@demo.com / admin@demo.com (password: demo123)");
    }

    private UserEntity ensureUser(
            String preferredId,
            String fullName,
            String email,
            String phone,
            UserRole role,
            String location,
            String encodedPassword) {

        return userRepository.findByEmailIgnoreCase(email)
                .map(existing -> {
                    existing.setPassword(encodedPassword);
                    existing.setRole(role);
                    existing.setFullName(fullName);
                    existing.setPhone(phone);
                    existing.setLocation(location);
                    return userRepository.save(existing);
                })
                .orElseGet(() -> {
                    UserEntity user = new UserEntity();
                    user.setId(preferredId);
                    user.setFullName(fullName);
                    user.setEmail(email);
                    user.setPassword(encodedPassword);
                    user.setPhone(phone);
                    user.setRole(role);
                    user.setLocation(location);
                    user.setCreatedAt(Instant.now());
                    return userRepository.save(user);
                });
    }

    private void seedLawyer(
            String lawyerId,
            String userId,
            String lawyerCode,
            String fullName,
            String email,
            String phone,
            String avatarInitials,
            String specialization,
            List<String> specializations,
            List<String> legalDomains,
            int yearsOfExperience,
            String location,
            double consultationFee,
            double rating,
            int reviewCount,
            AvailabilityStatus availability,
            VerificationStatus verificationStatus,
            List<String> qualifications,
            String relevantExperience,
            String bio,
            int profileCompletion,
            String encodedPassword) {

        UserEntity user = ensureUser(
                userId, fullName, email, phone, UserRole.LAWYER, location, encodedPassword);

        if (lawyerRepository.existsById(lawyerId)) {
            return;
        }

        // Replace any prior profile for this user so mock IDs (lawyer-1 …) stay stable
        lawyerRepository.findByUserId(user.getId()).ifPresent(lawyerRepository::delete);
        lawyerRepository.findByLawyerCode(lawyerCode).ifPresent(lawyerRepository::delete);
        lawyerRepository.flush();

        LawyerEntity lawyer = new LawyerEntity();
        lawyer.setId(lawyerId);
        lawyer.setLawyerCode(lawyerCode);
        lawyer.setUserId(user.getId());
        lawyer.setFullName(fullName);
        lawyer.setEmail(email);
        lawyer.setPhone(phone);
        lawyer.setAvatarInitials(avatarInitials);
        lawyer.setSpecialization(specialization);
        lawyer.setSpecializations(specializations);
        lawyer.setLegalDomains(legalDomains);
        lawyer.setYearsOfExperience(yearsOfExperience);
        lawyer.setLocation(location);
        lawyer.setConsultationFee(consultationFee);
        lawyer.setRating(rating);
        lawyer.setReviewCount(reviewCount);
        lawyer.setAvailability(availability);
        lawyer.setVerificationStatus(verificationStatus);
        lawyer.setQualifications(qualifications);
        lawyer.setRelevantExperience(relevantExperience);
        lawyer.setBio(bio);
        lawyer.setProfileCompletion(profileCompletion);
        lawyer.setIsDemo(true);
        lawyerRepository.save(lawyer);
    }
}
