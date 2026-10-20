# LegalConnect - AI-Powered Legal Assistance Platform
## Complete Project Documentation

---

## Table of Contents

1. Cover Page
2. Table of Contents
3. Executive Summary
4. Project Introduction
5. Problem Statement
6. Solution Overview
7. Technology Stack
8. System Architecture
9. Database Design
10. API Documentation
11. Security Implementation
12. User Roles and Permissions
13. Feature Specifications
14. Implementation Details
15. Testing Strategy
16. Deployment Guide
17. User Manual
18. Admin Guide
19. Performance Considerations
20. Scalability Analysis
21. Future Enhancements
22. Project Timeline
23. Team Contributions
24. Lessons Learned
25. Conclusion
26. References
27. Appendices
28. Glossary
29. Code Samples
30. Contact Information

---

## Page 1: Cover Page

# LegalConnect
## AI-Powered Legal Assistance and Intelligent Lawyer Matching Platform

**A College Project**

**Submitted by:**
[Your Name]
[Student ID]
[Department]
[University Name]

**Submitted to:**
[Professor Name]
[Department]
[University Name]

**Date:** October 2026

---

## Page 2: Executive Summary

### Executive Summary

LegalConnect is an innovative AI-powered legal assistance platform designed to bridge the gap between individuals seeking legal help and qualified lawyers. The platform addresses the fundamental challenges in accessing legal services by providing an intelligent, user-friendly interface that matches clients with appropriate legal professionals based on their specific needs.

The project implements a robust three-tier architecture using modern technologies including Java 21, Spring Boot 3.3.4, PostgreSQL, and JWT-based authentication. The system features three distinct user roles—Users (clients), Lawyers, and Administrators—each with specific permissions and functionalities tailored to their needs.

Key achievements include:
- Secure authentication and authorization system
- Intelligent lawyer matching algorithm
- Real-time consultation management
- Comprehensive profile management for lawyers
- Admin dashboard for platform oversight
- RESTful API with interactive documentation

The platform successfully demonstrates enterprise-grade software development practices, including security best practices, data validation, error handling, and scalable architecture. This documentation provides a comprehensive overview of the system design, implementation, deployment, and future roadmap.

---

## Page 3: Project Introduction

### 1. Project Introduction

#### 1.1 Background

The legal services industry has traditionally been characterized by inefficiencies in connecting clients with appropriate legal professionals. Individuals seeking legal assistance often face challenges in finding lawyers with the right expertise, understanding consultation fees, and scheduling appointments. This project aims to modernize the legal consultation process through technology.

#### 1.2 Project Objectives

**Primary Objectives:**
- Develop a web-based platform connecting users with lawyers
- Implement intelligent matching based on legal specialization
- Provide secure consultation booking and management
- Create transparent lawyer profiles with ratings and reviews
- Ensure data security and privacy for all users

**Secondary Objectives:**
- Demonstrate enterprise software development practices
- Implement modern authentication and authorization mechanisms
- Provide comprehensive API documentation
- Create scalable architecture for future enhancements

#### 1.3 Scope

The project encompasses:
- Backend API development with Spring Boot
- Database design and implementation
- Security implementation with JWT
- User role management (USER, LAWYER, ADMIN)
- Consultation workflow management
- Admin dashboard functionality

**Out of Scope:**
- Frontend implementation (React/Vue/Angular)
- Payment gateway integration
- Video conferencing implementation
- Mobile application development
- AI-powered recommendation algorithms (planned for Phase 2)

---

## Page 4: Problem Statement

### 2. Problem Statement

#### 2.1 Current Challenges in Legal Services

**Challenge 1: Difficulty Finding the Right Lawyer**
- Clients struggle to identify lawyers with specific expertise
- No centralized database of legal professionals
- Geographic limitations in accessing specialized lawyers
- Uncertainty about lawyer qualifications and experience

**Challenge 2: Lack of Transparency**
- No standardized information about consultation fees
- Limited access to lawyer ratings and reviews
- Unclear consultation processes and timelines
- Hidden costs and surprise charges

**Challenge 3: Inefficient Booking Process**
- Manual scheduling through phone calls or emails
- No real-time availability information
- Time-consuming appointment coordination
- Lack of automated confirmation systems

**Challenge 4: Information Asymmetry**
- Lawyers don't have comprehensive client case information
- Clients cannot adequately prepare for consultations
- No pre-consultation document sharing
- Limited communication channels

#### 2.2 Impact on Stakeholders

**For Clients:**
- Delayed access to legal assistance
- Higher costs due to inefficient processes
- Anxiety about choosing the right lawyer
- Wasted time on inappropriate consultations

**For Lawyers:**
- Inefficient client acquisition
- Missed opportunities due to poor visibility
- Administrative burden of scheduling
- Difficulty managing client expectations

**For the Legal Industry:**
- Reduced accessibility of legal services
- Lower client satisfaction rates
- Inefficient resource utilization
- Barriers to justice for underserved populations

---

## Page 5: Solution Overview

### 3. Solution Overview

#### 3.1 LegalConnect Platform

LegalConnect provides a comprehensive solution to the challenges outlined above through a modern, web-based platform that intelligently connects clients with lawyers.

#### 3.2 Core Features

**For Users (Clients):**
- **Intelligent Lawyer Search:** Search and filter lawyers by specialization, location, experience, and ratings
- **Detailed Lawyer Profiles:** View comprehensive profiles including qualifications, specializations, and client reviews
- **Easy Consultation Booking:** Submit consultation requests with preferred dates and case descriptions
- **Real-time Status Tracking:** Monitor consultation request status (pending, accepted, rejected, completed)
- **Secure Communication:** Protected platform for lawyer-client interactions
- **Review System:** Provide feedback and ratings after consultations

**For Lawyers:**
- **Professional Profile Management:** Create and maintain detailed professional profiles
- **Availability Management:** Set and update availability status and consultation schedules
- **Consultation Request Management:** View, accept, or reject incoming consultation requests
- **Specialization Display:** Showcase areas of expertise and legal domains
- **Performance Tracking:** Monitor ratings, reviews, and consultation statistics
- **Fee Structure:** Set consultation fees and service packages

**For Administrators:**
- **Platform Oversight:** Monitor all platform activities and user interactions
- **User Management:** Manage user accounts and resolve issues
- **Lawyer Verification:** Verify lawyer credentials and qualifications
- **Analytics Dashboard:** View platform statistics and usage metrics
- **Content Moderation:** Ensure platform content quality and compliance

#### 3.3 Key Differentiators

- **Security First:** Enterprise-grade security with JWT authentication
- **User-Centric Design:** Intuitive interface optimized for both clients and lawyers
- **Real-Time Updates:** Instant status notifications and updates
- **Transparent Pricing:** Clear fee structures with no hidden costs
- **Quality Assurance:** Rating and review system for quality control
- **Scalable Architecture:** Built for growth and future enhancements

---

## Page 6: Technology Stack

### 4. Technology Stack

#### 4.1 Backend Technologies

**Core Framework:**
- **Java 21:** Latest LTS version with modern language features
- **Spring Boot 3.3.4:** Enterprise application framework with auto-configuration
- **Spring Security 6.3.3:** Comprehensive security framework for authentication and authorization
- **Spring Data JPA:** Database abstraction layer with Hibernate ORM

**Security:**
- **JWT (JSON Web Tokens):** Stateless authentication mechanism
- **BCrypt:** Password hashing algorithm for secure password storage
- **Spring Security Method Security:** Fine-grained access control

**Database:**
- **PostgreSQL:** Open-source relational database management system
- **Hibernate ORM:** Object-relational mapping framework
- **H2 Database:** In-memory database for testing purposes

**Build Tool:**
- **Maven:** Dependency management and build automation
- **Spring Boot Maven Plugin:** Application packaging and execution

**Documentation:**
- **SpringDoc OpenAPI:** Automatic API documentation generation
- **Swagger UI:** Interactive API testing interface

#### 4.2 Development Tools

**IDE Support:**
- IntelliJ IDEA / Eclipse / VS Code
- Maven integration for dependency management
- Spring Boot DevTools for hot reloading

**Version Control:**
- Git for source code management
- GitHub/GitLab for repository hosting

**Testing:**
- JUnit 5 for unit testing
- Spring Boot Test for integration testing
- Mockito for mocking dependencies

#### 4.3 Technology Rationale

**Why Java 21?**
- Modern language features (records, pattern matching)
- Improved performance and garbage collection
- Long-term support with regular updates
- Strong typing and compile-time safety

**Why Spring Boot?**
- Rapid application development with auto-configuration
- Extensive ecosystem and community support
- Production-ready features out of the box
- Excellent security integration

**Why PostgreSQL?**
- ACID compliance for data integrity
- Advanced indexing and query optimization
- Support for complex data types
- Open-source with active development

**Why JWT?**
- Stateless authentication suitable for REST APIs
- No server-side session storage required
- Easy integration with frontend frameworks
- Industry-standard for modern authentication

---

## Page 7: System Architecture

### 5. System Architecture

#### 5.1 Overall Architecture

LegalConnect follows a classic three-tier architecture pattern, separating concerns across presentation, business logic, and data layers.

```
┌─────────────────────────────────────────────────────────────┐
│                    PRESENTATION LAYER                        │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   React App  │  │   Vue App    │  │ Angular App  │      │
│  │  (Frontend)  │  │  (Frontend)  │  │  (Frontend)  │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│         │                 │                 │               │
│         └─────────────────┴─────────────────┘               │
│                           │                                  │
│                    HTTP/HTTPS                                │
│                    (Port 5173)                               │
└───────────────────────────┬──────────────────────────────────┘
                            │
                            │ REST API Calls
                            │ JWT Authentication
                            │
┌───────────────────────────▼──────────────────────────────────┐
│                    BUSINESS LOGIC LAYER                      │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              Spring Boot Application                  │   │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐          │   │
│  │  │Controller│  │ Service  │  │ Security │          │   │
│  │  │  Layer   │  │  Layer   │  │  Layer   │          │   │
│  │  └──────────┘  └──────────┘  └──────────┘          │   │
│  │                                                      │   │
│  │  ┌──────────────────────────────────────────────┐  │   │
│  │  │        JWT Authentication Filter            │  │   │
│  │  │        Security Configuration                 │  │   │
│  │  │        CORS Configuration                    │  │   │
│  │  └──────────────────────────────────────────────┘  │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
│                    HTTP/HTTPS                                │
│                    (Port 8080)                               │
└───────────────────────────┬──────────────────────────────────┘
                            │
                            │ JDBC Connections
                            │ Hibernate ORM
                            │
┌───────────────────────────▼──────────────────────────────────┐
│                      DATA LAYER                               │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              PostgreSQL Database                     │   │
│  │                                                      │   │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐          │   │
│  │  │  Users   │  │ Lawyers  │  │Consultat │          │   │
│  │  │  Table   │  │  Table   │  │ions Table│          │   │
│  │  └──────────┘  └──────────┘  └──────────┘          │   │
│  │                                                      │   │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐          │   │
│  │  │ Reviews  │  │  Cases   │  │ Documents│          │   │
│  │  │  Table   │  │  Table   │  │  Table   │          │   │
│  │  └──────────┘  └──────────┘  └──────────┘          │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
│                    (Port 5432)                               │
└──────────────────────────────────────────────────────────────┘
```

#### 5.2 Component Architecture

**Authentication Flow:**
1. User submits credentials to `/api/auth/login`
2. Spring Security authenticates using AuthenticationManager
3. JwtUtil generates JWT token with user claims
4. Token returned to client
5. Client includes token in Authorization header
6. JwtAuthenticationFilter validates token on each request
7. SecurityContext populated with authenticated user
8. Protected endpoints accessible based on roles

**Request Processing Flow:**
1. HTTP request received by Spring Boot
2. JwtAuthenticationFilter validates JWT token
3. SecurityContext set with authenticated user
4. Request routed to appropriate Controller
5. Controller calls Service layer for business logic
6. Service interacts with Repository for data access
7. Repository uses Hibernate to query database
8. Response built and returned to client

---

## Page 8: Database Design

### 6. Database Design

#### 6.1 Entity Relationship Diagram

```
┌─────────────────┐         ┌─────────────────┐
│     Users       │         │    Lawyers      │
├─────────────────┤         ├─────────────────┤
│ id (PK)         │◄────────│ userId (FK, UK) │
│ full_name       │         │ id (PK)         │
│ email           │         │ full_name       │
│ password        │         │ email           │
│ phone           │         │ phone           │
│ role            │         │ specialization  │
│ avatar_url      │         │ specializations │
│ location        │         │ legal_domains   │
│ created_at      │         │ years_experience│
└─────────────────┘         │ location        │
                            │ consultation_fee│
                            │ rating          │
                            │ review_count    │
                            │ availability    │
                            │ verification_st │
                            │ qualifications  │
                            │ bio             │
                            └─────────────────┘
                                     │
                                     │
                                     │
┌─────────────────┐         ┌─────────────────┐
│  Consultations  │         │     Reviews      │
├─────────────────┤         ├─────────────────┤
│ id (PK)         │         │ id (PK)         │
│ user_id (FK)    │────────►│ user_id (FK)    │
│ user_name       │         │ lawyer_id (FK)   │
│ lawyer_id (FK)  │◄────────│ rating          │
│ lawyer_name     │         │ comment         │
│ case_id         │         │ created_at      │
│ case_title      │         └─────────────────┘
│ preferred_date  │
│ preferred_time  │
│ description     │
│ type            │
│ status          │
│ created_at      │
└─────────────────┘
```

#### 6.2 Table Specifications

**Users Table:**
- **Purpose:** Store user account information
- **Primary Key:** id (String, UUID)
- **Indexes:** email (unique)
- **Relationships:** One-to-one with Lawyers
- **Security:** Password hashed with BCrypt

**Lawyers Table:**
- **Purpose:** Store lawyer professional profiles
- **Primary Key:** id (String, UUID)
- **Foreign Key:** userId references Users.id
- **Indexes:** userId (unique), verification_status
- **Collection Tables:** specializations, legal_domains, qualifications

**Consultations Table:**
- **Purpose:** Store consultation requests and status
- **Primary Key:** id (String, UUID)
- **Foreign Keys:** user_id (Users), lawyer_id (Lawyers)
- **Indexes:** user_id, lawyer_id, status
- **Status Enum:** PENDING, ACCEPTED, REJECTED, COMPLETED, CANCELLED

**Reviews Table:**
- **Purpose:** Store client reviews and ratings
- **Primary Key:** id (String, UUID)
- **Foreign Keys:** user_id (Users), lawyer_id (Lawyers)
- **Constraints:** One review per user-lawyer pair

#### 6.3 Database Configuration

**Connection Settings:**
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/legalconnect
spring.datasource.username=postgres
spring.datasource.password=root
spring.datasource.driver-class-name=org.postgresql.Driver
```

**Hibernate Configuration:**
```properties
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=false
spring.jpa.properties.hibernate.format_sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
```

---

## Page 9: API Documentation

### 7. API Documentation

#### 7.1 Authentication Endpoints

**POST /api/auth/register**
- **Description:** Register a new user account
- **Request Body:**
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "+1234567890",
  "role": "USER",
  "location": "New York",
  "specialization": "Family Law",  // For lawyers only
  "yearsOfExperience": 5,         // For lawyers only
  "consultationFee": 150.00       // For lawyers only
}
```
- **Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid-here",
    "fullName": "John Doe",
    "email": "john@example.com",
    "role": "USER"
  }
}
```

**POST /api/auth/login**
- **Description:** Authenticate user and receive JWT token
- **Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```
- **Response:** Same as register response

**GET /api/auth/me**
- **Description:** Get current authenticated user information
- **Headers:** Authorization: Bearer {token}
- **Response:** User object with profile information

#### 7.2 User Management Endpoints

**GET /api/users/{userId}**
- **Description:** Get user profile by ID
- **Authorization:** Required (own profile only)
- **Response:** UserDto object

**PUT /api/users/{userId}**
- **Description:** Update user profile
- **Authorization:** Required (own profile only)
- **Request Body:** UserDto with updated fields
- **Response:** Updated UserDto object

#### 7.3 Lawyer Management Endpoints

**GET /api/lawyers/browse**
- **Description:** Browse all lawyers with optional filters
- **Query Parameters:** specialization, location
- **Response:** Array of LawyerDto objects

**GET /api/lawyers/{lawyerId}**
- **Description:** Get lawyer profile by ID
- **Authorization:** Not required
- **Response:** LawyerDto object

**GET /api/lawyers/my-profile**
- **Description:** Get authenticated lawyer's profile
- **Authorization:** Required (LAWYER role)
- **Response:** LawyerDto object

**PUT /api/lawyers/my-profile**
- **Description:** Update lawyer profile
- **Authorization:** Required (LAWYER role)
- **Request Body:** LawyerDto with updated fields
- **Response:** Updated LawyerDto object

#### 7.4 Consultation Management Endpoints

**POST /api/consultations**
- **Description:** Create new consultation request
- **Authorization:** Required (USER role)
- **Request Body:**
```json
{
  "lawyerId": "lawyer-uuid",
  "caseTitle": "Divorce Consultation",
  "preferredDate": "2024-10-15",
  "preferredTime": "14:00",
  "description": "Need consultation regarding divorce proceedings",
  "type": "VIDEO"
}
```
- **Response:** ConsultationDto object

**GET /api/consultations/my-consultations**
- **Description:** Get consultations for authenticated user
- **Authorization:** Required (USER or LAWYER role)
- **Response:** Array of ConsultationDto objects

**PUT /api/consultations/{consultationId}/accept**
- **Description:** Accept consultation request
- **Authorization:** Required (LAWYER role, own consultation)
- **Response:** Updated ConsultationDto object

**PUT /api/consultations/{consultationId}/reject**
- **Description:** Reject consultation request
- **Authorization:** Required (LAWYER role, own consultation)
- **Response:** Updated ConsultationDto object

#### 7.5 Admin Endpoints

**GET /api/admin/stats**
- **Description:** Get platform statistics
- **Authorization:** Required (ADMIN role)
- **Response:** AdminStatsDto object with counts and metrics

**GET /api/admin/users**
- **Description:** Get all users
- **Authorization:** Required (ADMIN role)
- **Response:** Array of UserDto objects

**GET /api/admin/lawyers**
- **Description:** Get all lawyers
- **Authorization:** Required (ADMIN role)
- **Response:** Array of LawyerDto objects

**DELETE /api/admin/users/{userId}**
- **Description:** Delete user account
- **Authorization:** Required (ADMIN role)
- **Response:** 204 No Content

---

## Page 10: Security Implementation

### 8. Security Implementation

#### 8.1 Authentication Architecture

**JWT Token Structure:**
```
Header: {
  "alg": "HS256",
  "typ": "JWT"
}

Payload: {
  "sub": "user@example.com",
  "userId": "uuid-here",
  "role": "USER",
  "fullName": "John Doe",
  "iat": 1697123456,
  "exp": 1697209856
}

Signature: HMACSHA256(
  base64UrlEncode(header) + "." + base64UrlEncode(payload),
  secret
)
```

**Token Generation Process:**
1. User authenticates with email/password
2. Spring Security validates credentials
3. JwtUtil generates token with user claims
4. Token signed with 256-bit secret key
5. Token returned to client
6. Client stores token (localStorage/cookie)

**Token Validation Process:**
1. Client includes token in Authorization header
2. JwtAuthenticationFilter intercepts request
3. Token extracted and signature verified
4. Claims extracted and user loaded
5. SecurityContext populated with authentication
6. Request proceeds to protected endpoint

#### 8.2 Authorization Model

**Role-Based Access Control (RBAC):**

```
USER Role Permissions:
- view own profile
- update own profile
- browse lawyers
- create consultations
- view own consultations
- submit reviews

LAWYER Role Permissions:
- view own profile
- update own profile
- view assigned consultations
- accept/reject consultations
- update availability
- view own statistics

ADMIN Role Permissions:
- view all users
- view all lawyers
- view all consultations
- delete users
- delete lawyers
- update lawyer verification
- view platform statistics
```

**Method-Level Security:**
```java
@PreAuthorize("hasRole('USER')")
public ConsultationDto createConsultation(...) { }

@PreAuthorize("hasRole('LAWYER')")
public ConsultationDto acceptConsultation(...) { }

@PreAuthorize("hasRole('ADMIN')")
public AdminStatsDto getPlatformStats() { }
```

#### 8.3 Security Configuration

**SecurityFilterChain Configuration:**
```java
@Bean
public SecurityFilterChain securityFilterChain(HttpSecurity http) {
    http
        .csrf(AbstractHttpConfigurer::disable)
        .cors(cors -> cors.configurationSource(corsConfigurationSource()))
        .authorizeHttpRequests(auth -> auth
            .requestMatchers("/api/auth/**").permitAll()
            .requestMatchers("/v3/api-docs/**").permitAll()
            .requestMatchers("/api/admin/**").hasRole("ADMIN")
            .anyRequest().authenticated()
        )
        .sessionManagement(session -> session
            .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
        )
        .addFilterBefore(jwtAuthenticationFilter,
            UsernamePasswordAuthenticationFilter.class);
    return http.build();
}
```

**Password Security:**
- BCrypt hashing algorithm with strength 10
- Salt automatically generated and stored with hash
- No plaintext password storage
- Password validation with minimum length requirements

#### 8.4 Data Protection

**Input Validation:**
- Jakarta Bean Validation annotations
- Custom validation for business rules
- SQL injection prevention via JPA parameterized queries
- XSS protection through proper encoding

**CORS Configuration:**
- Allowed origins: http://localhost:5173
- Allowed methods: GET, POST, PUT, DELETE, OPTIONS, PATCH
- Allowed headers: *
- Credentials support: enabled
- Max age: 3600 seconds

**Security Headers:**
- X-Content-Type-Options: nosniff
- X-Frame-Options: DENY
- X-XSS-Protection: 1; mode=block
- Strict-Transport-Security (HTTPS in production)

---

## Page 11: User Roles and Permissions

### 9. User Roles and Permissions

#### 9.1 Role Definitions

**USER (Client)**
- **Primary Purpose:** Individuals seeking legal assistance
- **Registration:** Standard registration with basic information
- **Authentication:** Email/password with JWT tokens
- **Profile:** Personal information, contact details, location
- **Access:** Can browse lawyers, create consultations, view own data

**LAWYER**
- **Primary Purpose:** Legal professionals providing services
- **Registration:** Enhanced registration with professional details
- **Authentication:** Email/password with JWT tokens
- **Profile:** Professional information, specializations, qualifications
- **Access:** Can manage profile, handle consultations, update availability

**ADMIN**
- **Primary Purpose:** Platform management and oversight
- **Registration:** Manual creation by system administrators
- **Authentication:** Email/password with JWT tokens
- **Profile:** Administrative account information
- **Access:** Full platform access, user management, system monitoring

#### 9.2 Permission Matrix

| Feature | USER | LAWYER | ADMIN |
|---------|------|--------|-------|
| Register Account | ✅ | ✅ | ❌ |
| Login/Logout | ✅ | ✅ | ✅ |
| View Own Profile | ✅ | ✅ | ✅ |
| Update Own Profile | ✅ | ✅ | ✅ |
| Browse Lawyers | ✅ | ✅ | ✅ |
| View Lawyer Profiles | ✅ | ✅ | ✅ |
| Create Consultations | ✅ | ❌ | ❌ |
| View Own Consultations | ✅ | ✅ | ❌ |
| Accept Consultations | ❌ | ✅ | ❌ |
| Reject Consultations | ❌ | ✅ | ❌ |
| Update Availability | ❌ | ✅ | ❌ |
| View All Users | ❌ | ❌ | ✅ |
| View All Lawyers | ❌ | ❌ | ✅ |
| View All Consultations | ❌ | ❌ | ✅ |
| Delete Users | ❌ | ❌ | ✅ |
| Delete Lawyers | ❌ | ❌ | ✅ |
| Update Verification | ❌ | ❌ | ✅ |
| View Platform Stats | ❌ | ❌ | ✅ |

#### 9.3 Ownership Model

**User Data Ownership:**
- Users can only access their own profile information
- Users can only view consultations they created
- Users cannot access other users' private data
- User ID is the primary ownership identifier

**Lawyer Data Ownership:**
- Lawyers linked to users via `lawyer.userId`
- Lawyers can only view consultations where `consultation.lawyerId` matches their profile
- Lawyers cannot access other lawyers' consultations
- Lawyer ID is the primary ownership identifier for consultations

**Admin Access:**
- Admins have platform-wide access for oversight
- Admin access is role-based, not ownership-based
- Admin operations logged for audit purposes

#### 9.4 Consultation Ownership Flow

**Step 1: User Creates Consultation**
- User authenticates and receives JWT with user ID
- User submits consultation request with lawyer ID
- System creates consultation with `userId` from token
- System links consultation to selected lawyer via `lawyerId`

**Step 2: Lawyer Views Consultations**
- Lawyer authenticates and receives JWT with user ID
- System finds lawyer profile via `lawyer.userId`
- System returns consultations where `consultation.lawyerId` matches lawyer profile
- Lawyer only sees consultations assigned to them

**Step 3: Lawyer Accepts/Rejects**
- Lawyer attempts to accept/reject consultation
- System validates `consultation.lawyerId` matches lawyer's profile
- System updates consultation status
- Different lawyers cannot access this consultation

**Security Note:** The system never trusts lawyer IDs sent by the frontend. All authorization is based on the authenticated user's identity and their relationship to the requested resource.

---

## Page 12: Feature Specifications

### 10. Feature Specifications

#### 10.1 Authentication Features

**User Registration:**
- Email validation with unique constraint
- Password strength validation (minimum 6 characters)
- Role selection (USER or LAWYER)
- Optional profile information
- Automatic lawyer profile creation for LAWYER role
- JWT token generation on successful registration

**User Login:**
- Email/password authentication
- Spring Security integration
- JWT token generation with user claims
- Token expiration: 24 hours
- Secure password comparison with BCrypt

**Token Management:**
- Stateless JWT tokens
- Token validation on each request
- Automatic token expiration handling
- Refresh token mechanism (planned for Phase 2)

#### 10.2 User Profile Features

**Profile Viewing:**
- Users can view their own profile
- Profile includes: name, email, phone, location, avatar
- Read-only email field (cannot be changed)
- Role displayed but cannot be modified

**Profile Updates:**
- Users can update: name, phone, location, avatar
- Email changes require email verification (planned)
- Password changes require current password confirmation
- Updates are immediate and persisted

#### 10.3 Lawyer Profile Features

**Profile Creation:**
- Automatic creation on LAWYER registration
- Professional information: specialization, experience, fees
- Collection fields: specializations, legal domains, qualifications
- Profile completion tracking
- Demo flag for test accounts

**Profile Management:**
- Lawyers can update all profile fields
- Specialization and expertise display
- Availability status management
- Consultation fee configuration
- Professional bio and experience details

**Profile Viewing:**
- Public profile viewing for all users
- Detailed information display
- Rating and review aggregation
- Verification status display

#### 10.4 Consultation Features

**Consultation Creation:**
- Users create consultation requests
- Required fields: lawyer ID, preferred date/time, description
- Optional fields: case ID, case title, consultation type
- Automatic status assignment: PENDING
- User and lawyer name caching for display

**Consultation Management:**
- Lawyers view assigned consultations
- Accept/reject functionality
- Status updates: PENDING → ACCEPTED/REJECTED
- Consultation history tracking
- Real-time status updates

**Consultation Filtering:**
- Users see only their consultations
- Lawyers see only assigned consultations
- Admins see all consultations
- Status-based filtering (planned)

#### 10.5 Search and Discovery Features

**Lawyer Browsing:**
- Browse all lawyers on platform
- Filter by specialization
- Filter by location
- Sort by rating, experience, fees (planned)
- Pagination support (planned)

**Advanced Search:**
- Text search in lawyer profiles
- Multi-criteria filtering
- Saved search queries (planned)
- Search result highlighting (planned)

#### 10.6 Admin Features

**Platform Statistics:**
- Total user count
- Total lawyer count
- Total consultation count
- Status breakdown (pending, accepted, rejected)
- Real-time metrics

**User Management:**
- View all users
- View user details
- Delete user accounts
- User activity monitoring (planned)

**Lawyer Management:**
- View all lawyers
- Update verification status
- Delete lawyer accounts
- Lawyer performance metrics (planned)

**Content Moderation:**
- Review content moderation (planned)
- Profile content approval (planned)
- Reported content handling (planned)

---

## Page 13: Implementation Details

### 11. Implementation Details

#### 11.1 Project Structure

```
src/main/java/com/legalconnect/
├── config/
│   ├── SecurityConfig.java
│   └── OpenApiConfig.java
├── controller/
│   ├── AuthController.java
│   ├── UserController.java
│   ├── LawyerController.java
│   ├── ConsultationController.java
│   └── AdminController.java
├── dto/
│   ├── AuthResponse.java
│   ├── LoginRequest.java
│   ├── RegisterRequest.java
│   ├── UserDto.java
│   ├── LawyerDto.java
│   ├── ConsultationDto.java
│   └── ... (other DTOs)
├── entity/
│   ├── UserEntity.java
│   ├── LawyerEntity.java
│   ├── ConsultationEntity.java
│   ├── ReviewEntity.java
│   └── enums/
│       ├── UserRole.java
│       ├── ConsultationStatus.java
│       └── ... (other enums)
├── exception/
│   ├── GlobalExceptionHandler.java
│   ├── ResourceNotFoundException.java
│   ├── BadRequestException.java
│   └── ForbiddenException.java
├── repository/
│   ├── UserRepository.java
│   ├── LawyerRepository.java
│   ├── ConsultationRepository.java
│   └── ... (other repositories)
├── security/
│   ├── JwtUtil.java
│   ├── JwtAuthenticationFilter.java
│   ├── CustomUserDetailsService.java
│   └── UserPrincipal.java
├── service/
│   ├── AuthService.java
│   ├── UserService.java
│   ├── LawyerService.java
│   ├── ConsultationService.java
│   └── ... (other services)
└── LegalConnectApplication.java
```

#### 11.2 Key Implementation Patterns

**Service Layer Pattern:**
- Business logic encapsulated in service classes
- Controllers delegate to services
- Services interact with repositories
- Transaction management with @Transactional

**DTO Pattern:**
- Data Transfer Objects for API communication
- Separate DTOs from entity classes
- Mapping between entities and DTOs
- Validation annotations on DTOs

**Repository Pattern:**
- Spring Data JPA repositories
- Custom query methods
- Paging and sorting support
- Relationship management

**Exception Handling:**
- Global exception handler
- Custom exception classes
- Consistent error responses
- HTTP status code mapping

#### 11.3 Security Implementation Details

**JWT Authentication Filter:**
```java
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                   HttpServletResponse response,
                                   FilterChain filterChain) {
        String jwt = getJwtFromRequest(request);
        if (StringUtils.hasText(jwt)) {
            String email = jwtUtil.extractEmail(jwt);
            if (email != null && SecurityContextHolder.getContext()
                    .getAuthentication() == null) {
                UserDetails userDetails =
                    userDetailsService.loadUserByUsername(email);
                if (jwtUtil.validateToken(jwt, userDetails.getUsername())) {
                    UsernamePasswordAuthenticationToken authentication =
                        new UsernamePasswordAuthenticationToken(
                            userDetails, null,
                            userDetails.getAuthorities());
                    SecurityContextHolder.getContext()
                        .setAuthentication(authentication);
                }
            }
        }
        filterChain.doFilter(request, response);
    }
}
```

**Ownership Validation Example:**
```java
public ConsultationDto acceptConsultation(String consultationId,
                                         Authentication authentication) {
    UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();

    LawyerEntity lawyer = lawyerRepository.findByUserId(userPrincipal.getId())
        .orElseThrow(() -> new ResourceNotFoundException(
            "Lawyer profile not found for this user"));

    ConsultationEntity consultation = consultationRepository.findById(consultationId)
        .orElseThrow(() -> new ResourceNotFoundException(
            "Consultation not found"));

    if (!consultation.getLawyerId().equals(lawyer.getId())) {
        throw new ForbiddenException(
            "You can only accept consultations assigned to you");
    }

    consultation.setStatus(ConsultationStatus.ACCEPTED);
    return mapToConsultationDto(consultationRepository.save(consultation));
}
```

#### 11.4 Database Implementation Details

**Entity Relationships:**
- User-Entity: One-to-one with Lawyer-Entity
- User-Entity: One-to-many with Consultation-Entity
- Lawyer-Entity: One-to-many with Consultation-Entity
- Collection tables for list fields

**Indexing Strategy:**
- Unique index on User.email
- Unique index on Lawyer.userId
- Composite index on Consultation (userId, status)
- Composite index on Consultation (lawyerId, status)

**Transaction Management:**
- @Transactional on service methods
- Rollback on runtime exceptions
- Read-only transactions for queries
- Optimistic locking (planned)

---

## Page 14: Testing Strategy

### 12. Testing Strategy

#### 12.1 Testing Approach

**Testing Pyramid:**
```
        /\
       /E2E\      (End-to-End Tests)
      /------\
     /  Integration  \   (API Integration Tests)
    /--------------\
   /   Unit Tests    \  (Service/Repository Tests)
  /------------------\
```

#### 12.2 Unit Testing

**Service Layer Testing:**
- Test business logic in isolation
- Mock repository dependencies
- Test happy paths and error cases
- Validate exception handling

**Example Unit Test:**
```java
@Test
public void testCreateConsultation_Success() {
    // Arrange
    ConsultationRequestPayload request = new ConsultationRequestPayload();
    request.setLawyerId("lawyer-123");
    request.setDescription("Test consultation");

    UserEntity user = new UserEntity();
    user.setId("user-123");

    LawyerEntity lawyer = new LawyerEntity();
    lawyer.setId("lawyer-123");

    when(userRepository.findById("user-123")).thenReturn(Optional.of(user));
    when(lawyerRepository.findById("lawyer-123")).thenReturn(Optional.of(lawyer));

    // Act
    ConsultationDto result = consultationService.createConsultation(
        request, authentication);

    // Assert
    assertNotNull(result);
    assertEquals("PENDING", result.getStatus());
    verify(consultationRepository).save(any(ConsultationEntity.class));
}
```

#### 12.3 Integration Testing

**API Integration Testing:**
- Test REST endpoints
- Test database interactions
- Test security configuration
- Test request/response validation

**Example Integration Test:**
```java
@SpringBootTest
@AutoConfigureMockMvc
class ConsultationControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    @WithMockUser(username = "user@example.com", roles = "USER")
    public void testCreateConsultation_Success() throws Exception {
        mockMvc.perform(post("/api/consultations")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"lawyerId\":\"lawyer-123\",\"description\":\"Test\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("PENDING"));
    }
}
```

#### 12.4 Security Testing

**Authentication Testing:**
- Test login with valid credentials
- Test login with invalid credentials
- Test token validation
- Test token expiration

**Authorization Testing:**
- Test role-based access control
- Test ownership validation
- Test unauthorized access attempts
- Test admin-only endpoints

**Example Security Test:**
```java
@Test
public void testConsultationOwnership_LawyerCannotAccessOthers() {
    // Lawyer 1 tries to access Lawyer 2's consultation
    Authentication lawyer1Auth = createAuthentication("lawyer1@example.com");

    assertThrows(ForbiddenException.class, () -> {
        consultationService.acceptConsultation(
            "lawyer2-consultation-id", lawyer1Auth);
    });
}
```

#### 12.5 Test Coverage Goals

**Target Coverage:**
- Service layer: 80%+
- Controller layer: 70%+
- Repository layer: 60%+
- Security layer: 90%+

**Coverage Areas:**
- Happy path scenarios
- Error handling
- Edge cases
- Security boundaries
- Data validation

---

## Page 15: Deployment Guide

### 13. Deployment Guide

#### 13.1 Prerequisites

**System Requirements:**
- Java 21 or higher
- Maven 3.6+ (or use included wrapper)
- PostgreSQL 12+ or higher
- Minimum 2GB RAM
- 10GB disk space

**Software Dependencies:**
- PostgreSQL database server
- Git (for version control)
- Text editor or IDE

#### 13.2 Local Development Setup

**Step 1: Clone Repository**
```bash
git clone <repository-url>
cd LegalConnect/Backend
```

**Step 2: Configure Database**
```sql
-- Create database
CREATE DATABASE legalconnect;

-- Create user (optional)
CREATE USER legalconnect_user WITH PASSWORD 'secure_password';
GRANT ALL PRIVILEGES ON DATABASE legalconnect TO legalconnect_user;
```

**Step 3: Update Configuration**
```properties
# src/main/resources/application.properties
spring.datasource.url=jdbc:postgresql://localhost:5432/legalconnect
spring.datasource.username=legalconnect_user
spring.datasource.password=secure_password
app.jwt.secret=your-secure-secret-key-min-256-bits
app.jwt.expiration-ms=86400000
```

**Step 4: Build Application**
```bash
./mvnw clean install
```

**Step 5: Run Application**
```bash
./mvnw spring-boot:run
```

**Step 6: Verify Deployment**
- Access Swagger UI: http://localhost:8080/swagger-ui.html
- Test authentication endpoint
- Check database tables created

#### 13.3 Production Deployment

**Docker Deployment (Recommended):**

**Dockerfile:**
```dockerfile
FROM openjdk:21-jdk-slim
WORKDIR /app
COPY target/legalconnect-backend-1.0.0.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
```

**docker-compose.yml:**
```yaml
version: '3.8'
services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: legalconnect
      POSTGRES_USER: legalconnect
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  app:
    build: .
    ports:
      - "8080:8080"
    environment:
      SPRING_DATASOURCE_URL: jdbc:postgresql://postgres:5432/legalconnect
      SPRING_DATASOURCE_USERNAME: legalconnect
      SPRING_DATASOURCE_PASSWORD: ${DB_PASSWORD}
      APP_JWT_SECRET: ${JWT_SECRET}
    depends_on:
      - postgres

volumes:
  postgres_data:
```

**Deployment Commands:**
```bash
# Build and start services
docker-compose up -d

# View logs
docker-compose logs -f app

# Stop services
docker-compose down
```

#### 13.4 Cloud Deployment

**AWS Deployment:**
- Use AWS RDS for PostgreSQL
- Deploy application to EC2 or Elastic Beanstalk
- Configure security groups and VPC
- Set up load balancer for high availability
- Configure CloudWatch for monitoring

**Heroku Deployment:**
```bash
# Install Heroku CLI
# Login to Heroku
heroku login

# Create app
heroku create legalconnect-backend

# Set environment variables
heroku config:set DB_PASSWORD=secure_password
heroku config:set JWT_SECRET=secure_jwt_secret

# Deploy
git push heroku main
```

#### 13.5 Environment Configuration

**Development Environment:**
- H2 in-memory database for testing
- Debug logging enabled
- Hot reload with DevTools
- CORS for local frontend

**Staging Environment:**
- PostgreSQL database
- Production-like configuration
- Limited CORS origins
- Performance monitoring

**Production Environment:**
- PostgreSQL with connection pooling
- Optimized JVM settings
- Restricted CORS origins
- Comprehensive logging
- Security headers enabled
- HTTPS enforcement

---

## Page 16: User Manual

### 14. User Manual

#### 14.1 Getting Started

**Account Registration:**
1. Navigate to the LegalConnect platform
2. Click "Sign Up" button
3. Fill in registration form:
   - Full Name (required)
   - Email Address (required)
   - Password (minimum 6 characters)
   - Phone Number (optional)
   - Role Selection: User or Lawyer
   - Location (optional)
4. For Lawyer role, additional fields:
   - Specialization
   - Years of Experience
   - Consultation Fee
   - Qualifications
   - Professional Bio
5. Click "Register" to create account
6. Receive confirmation and JWT token

**Account Login:**
1. Navigate to login page
2. Enter email address and password
3. Click "Login" button
4. Receive JWT token for authenticated access
5. Token stored securely for subsequent requests

#### 14.2 User Guide (Clients)

**Browsing Lawyers:**
1. Navigate to "Find Lawyers" section
2. Use filters to narrow search:
   - Specialization (e.g., Family Law, Criminal Law)
   - Location (e.g., New York, California)
   - Experience level
   - Rating threshold
   - Fee range
3. View lawyer profiles by clicking on lawyer cards
4. Compare multiple lawyers
5. Check availability status

**Viewing Lawyer Profiles:**
1. Click on lawyer name or profile picture
2. View comprehensive information:
   - Professional qualifications
   - Areas of specialization
   - Years of experience
   - Client reviews and ratings
   - Consultation fees
   - Availability status
   - Professional bio
3. Use "Book Consultation" button to proceed

**Booking Consultations:**
1. Select desired lawyer
2. Click "Book Consultation" button
3. Fill in consultation details:
   - Case title (optional)
   - Preferred date
   - Preferred time
   - Case description (required)
   - Consultation type (Video/Phone/In-person)
4. Submit consultation request
5. Receive confirmation with PENDING status
6. Wait for lawyer response

**Tracking Consultation Status:**
1. Navigate to "My Consultations" section
2. View all consultation requests
3. Check current status:
   - PENDING: Waiting for lawyer response
   - ACCEPTED: Consultation confirmed
   - REJECTED: Lawyer declined request
   - COMPLETED: Consultation finished
   - CANCELLED: Consultation cancelled
4. Receive notifications on status changes

**Managing Profile:**
1. Navigate to "My Profile" section
2. Update personal information:
   - Full name
   - Phone number
   - Location
   - Profile picture
3. Save changes
4. Changes reflected immediately

#### 14.3 Lawyer Guide

**Profile Setup:**
1. Complete registration as Lawyer
2. Navigate to "My Profile" section
3. Fill in professional details:
   - Specialization
   - Areas of expertise
   - Years of experience
   - Consultation fees
   - Qualifications and certifications
   - Professional bio
   - Availability schedule
4. Upload profile picture
5. Save profile

**Managing Availability:**
1. Navigate to "Availability" section
2. Set current status:
   - Available
   - Busy
   - Offline
3. Configure availability slots:
   - Working hours
   - Break times
   - Time zone
4. Save availability settings

**Handling Consultation Requests:**
1. Navigate to "Consultation Requests" section
2. View incoming requests
3. Review consultation details:
   - Client information
   - Case description
   - Preferred date/time
   - Consultation type
4. Accept or reject request:
   - Click "Accept" to confirm
   - Click "Reject" to decline
   - Optionally provide reason
5. Status updated automatically

**Updating Profile:**
1. Navigate to "My Profile" section
2. Update any professional information
3. Add new qualifications
4. Update fee structure
5. Modify availability
6. Save changes

#### 14.4 Troubleshooting

**Common Issues:**

**Login Issues:**
- Problem: Cannot login with correct credentials
- Solution: Check email spelling, reset password if needed

**Consultation Not Appearing:**
- Problem: Consultation request not showing
- Solution: Refresh page, check network connection

**Profile Update Not Saving:**
- Problem: Changes not persisting
- Solution: Check required fields, ensure valid data format

**Token Expiration:**
- Problem: Frequent re-login required
- Solution: Token expires after 24 hours, normal behavior

**Performance Issues:**
- Problem: Slow page loading
- Solution: Check internet connection, clear browser cache

---

## Page 17: Admin Guide

### 15. Admin Guide

#### 15.1 Admin Dashboard Overview

**Dashboard Features:**
- Platform statistics overview
- User management interface
- Lawyer management interface
- Consultation monitoring
- System health indicators
- Activity logs

**Access Requirements:**
- Admin role account
- Valid JWT token
- Secure network connection
- Admin credentials

#### 15.2 Platform Statistics

**Available Metrics:**
- Total registered users
- Total registered lawyers
- Total consultations created
- Consultation status breakdown:
  - Pending consultations
  - Accepted consultations
  - Rejected consultations
  - Completed consultations
  - Cancelled consultations
- User growth trends
- Lawyer verification status

**Viewing Statistics:**
1. Navigate to Admin Dashboard
2. Access "Statistics" section
3. View real-time metrics
4. Filter by date range (planned)
5. Export reports (planned)

#### 15.3 User Management

**Viewing Users:**
1. Navigate to "Users" section
2. View list of all registered users
3. Filter by:
   - User role
   - Registration date
   - Account status
4. Search by email or name
5. Sort by various criteria

**User Details:**
- User ID
- Full name
- Email address
- Phone number
- Role
- Registration date
- Last login date
- Account status

**Managing Users:**
- View user profile details
- Edit user information (limited)
- Delete user accounts
- Suspend user accounts (planned)
- Reset user passwords (planned)
- View user activity (planned)

**Deleting Users:**
1. Select user from list
2. Click "Delete" button
3. Confirm deletion action
4. User account permanently removed
5. Associated data handled according to policy

#### 15.4 Lawyer Management

**Viewing Lawyers:**
1. Navigate to "Lawyers" section
2. View list of all registered lawyers
3. Filter by:
   - Verification status
   - Specialization
   - Location
   - Rating
4. Search by name or email
5. Sort by various criteria

**Lawyer Details:**
- Lawyer ID and User ID
- Professional information
- Specializations
- Qualifications
- Consultation statistics
- Rating and reviews
- Verification status

**Managing Lawyers:**
- View detailed lawyer profiles
- Update verification status:
  - Pending
  - Verified
  - Rejected
- Delete lawyer accounts
- Suspend lawyer accounts (planned)
- View lawyer performance metrics (planned)

**Verification Process:**
1. Review lawyer profile
2. Check submitted qualifications
3. Verify credentials (external process)
4. Update verification status
5. Notify lawyer of decision

#### 15.5 Consultation Monitoring

**Viewing Consultations:**
1. Navigate to "Consultations" section
2. View all consultations on platform
3. Filter by:
   - Status
   - Date range
   - Lawyer
   - User
4. Search by consultation ID
5. Sort by date or status

**Consultation Details:**
- Consultation ID
- User information
- Lawyer information
- Case details
- Preferred date/time
- Current status
- Creation date
- Status change history

**Managing Consultations:**
- View consultation details
- Monitor status changes
- Intervene in disputes (planned)
- Cancel consultations (planned)
- Generate reports (planned)

#### 15.6 System Administration

**System Health Monitoring:**
- Database connection status
- API response times
- Error rates
- User activity levels
- System resource usage

**Configuration Management:**
- JWT secret key rotation
- CORS origin updates
- Email server configuration (planned)
- SMS gateway configuration (planned)
- Payment gateway configuration (planned)

**Security Administration:**
- Monitor failed login attempts
- Review access logs
- Manage security policies
- Update security configurations
- Handle security incidents

---

## Page 18: Performance Considerations

### 16. Performance Considerations

#### 16.1 Database Performance

**Indexing Strategy:**
- Unique index on User.email for fast lookups
- Unique index on Lawyer.userId for profile lookups
- Composite index on Consultation (userId, status) for user queries
- Composite index on Consultation (lawyerId, status) for lawyer queries
- Index on Consultation.createdAt for sorting

**Query Optimization:**
- Use JPA repositories with custom query methods
- Implement pagination for large result sets
- Use DTO projection to reduce data transfer
- Optimize N+1 query problems with JOIN FETCH
- Cache frequently accessed data

**Connection Pooling:**
- Configure HikariCP connection pool
- Optimal pool size: 10-20 connections
- Connection timeout: 30 seconds
- Maximum lifetime: 30 minutes
- Idle timeout: 10 minutes

#### 16.2 API Performance

**Response Time Targets:**
- Authentication endpoints: < 500ms
- Simple queries: < 200ms
- Complex queries: < 1s
- File uploads: < 5s
- Bulk operations: < 10s

**Caching Strategy:**
- Cache lawyer profiles (Redis planned)
- Cache user sessions (JWT stateless)
- Cache frequently accessed configuration
- Implement cache invalidation on updates
- Monitor cache hit rates

**API Optimization:**
- Use pagination for large datasets
- Implement field selection (GraphQL planned)
- Compress responses with GZIP
- Use HTTP/2 for multiplexing
- Optimize JSON serialization

#### 16.3 Application Performance

**JVM Tuning:**
- Initial heap size: 512MB
- Maximum heap size: 2GB
- Garbage collector: G1GC
- JIT compilation enabled
- Optimize for throughput

**Memory Management:**
- Monitor memory usage
- Implement memory leak detection
- Optimize object creation
- Use object pools where appropriate
- Profile memory hotspots

**Concurrency:**
- Thread pool sizing for async operations
- Async processing for long-running tasks
- Circuit breakers for external services
- Rate limiting for API endpoints
- Backpressure handling

#### 16.4 Monitoring and Metrics

**Application Metrics:**
- Request count and rate
- Response time percentiles
- Error rate and types
- Database query performance
- Cache hit rates
- JVM memory usage

**Monitoring Tools:**
- Spring Boot Actuator endpoints
- Prometheus metrics collection
- Grafana dashboards
- Application Performance Monitoring (APM)
- Log aggregation and analysis

**Alerting:**
- High error rate alerts
- Slow response time alerts
- Database connection pool exhaustion
- Memory usage thresholds
- Disk space warnings

---

## Page 19: Scalability Analysis

### 17. Scalability Analysis

#### 17.1 Horizontal Scaling

**Application Server Scaling:**
- Stateless application design enables horizontal scaling
- JWT authentication eliminates session dependencies
- Load balancer can distribute requests across instances
- Database connection pooling required for multiple instances
- Shared cache required for distributed caching

**Database Scaling:**
- Read replicas for read-heavy workloads
- Database sharding for very large datasets
- Connection pooling for efficient resource usage
- Database clustering for high availability
- Backup and disaster recovery strategies

#### 17.2 Vertical Scaling

**Resource Requirements:**
- Minimum: 2 CPU cores, 4GB RAM
- Recommended: 4 CPU cores, 8GB RAM
- High load: 8+ CPU cores, 16GB+ RAM
- Database: Separate server with dedicated resources

**Scaling Points:**
- Increase CPU cores for computation-heavy tasks
- Add RAM for caching and in-memory operations
- SSD storage for faster I/O operations
- Network bandwidth for high traffic

#### 17.3 Architecture Scalability

**Microservices Transition (Future):**
- Split monolith into domain services
- User Service: Authentication and user management
- Lawyer Service: Lawyer profiles and search
- Consultation Service: Consultation management
- Notification Service: Email and SMS notifications
- Payment Service: Payment processing

**API Gateway:**
- Single entry point for all clients
- Request routing and load balancing
- Authentication and authorization
- Rate limiting and throttling
- Request/response transformation

**Message Queues:**
- Asynchronous processing for long-running tasks
- Decouple services for independent scaling
- Event-driven architecture for real-time updates
- Retry mechanisms for failed operations
- Dead letter queues for error handling

#### 17.4 Database Scalability

**Read-Write Splitting:**
- Primary database for writes
- Read replicas for read operations
- Application-aware routing
- Eventual consistency considerations
- Failover mechanisms

**Data Partitioning:**
- Horizontal partitioning by user ID
- Geographic partitioning for multi-region
- Time-based partitioning for historical data
- Consistent hashing for even distribution

**Caching Layers:**
- Application-level caching
- Distributed caching with Redis
- Database query caching
- CDN for static assets
- Browser caching for API responses

#### 17.5 Performance Scaling

**CDN Integration:**
- Static assets served from CDN
- Geographic distribution
- Reduced latency for global users
- Bandwidth cost optimization
- SSL termination at edge

**Edge Computing:**
- Compute resources closer to users
- Reduced latency for real-time features
- Offline functionality support
- Data synchronization strategies

**Load Testing:**
- Simulate realistic user patterns
- Identify bottlenecks before production
- Test auto-scaling configurations
- Validate performance under load
- Plan capacity requirements

---

## Page 20: Future Enhancements

### 18. Future Enhancements

#### 18.1 Phase 2 Features

**AI-Powered Lawyer Matching:**
- Machine learning algorithm for intelligent matching
- Natural language processing for case analysis
- Recommendation engine based on success rates
- Predictive analytics for consultation outcomes
- Continuous learning from user feedback

**Video Consultation Integration:**
- WebRTC-based video calling
- Screen sharing capabilities
- Recording and transcription
- Calendar integration for scheduling
- Multi-participant consultations

**Payment Gateway Integration:**
- Secure payment processing
- Multiple payment methods (cards, PayPal, UPI)
- Escrow services for consultation fees
- Refund processing
- Transaction history and receipts

**Document Management:**
- Secure document upload and storage
- Document sharing between lawyer and client
- Version control for document revisions
- Digital signatures for agreements
- Document templates for common legal forms

**Advanced Scheduling:**
- Calendar integration (Google, Outlook)
- Automated reminders and notifications
- Time zone conversion
- Recurring consultation scheduling
- Conflict detection and resolution

#### 18.2 Phase 3 Features

**Mobile Applications:**
- Native iOS application
- Native Android application
- Cross-platform with React Native
- Push notifications
- Offline functionality
- Biometric authentication

**Multi-language Support:**
- Internationalization (i18n)
- Multiple language interfaces
- Localized content
- Currency conversion
- Regional legal information

**Case Management System:**
- Case file organization
- Timeline and milestone tracking
- Document management per case
- Task assignment and tracking
- Progress reporting

**Analytics Dashboard:**
- Lawyer performance analytics
- Client satisfaction metrics
- Revenue tracking and forecasting
- User engagement analytics
- A/B testing framework

**Legal Document Templates:**
- Pre-built legal document templates
- Customizable template library
- Document generation wizard
- Legal compliance checks
- Electronic filing integration

#### 18.3 Technical Enhancements

**Advanced Security:**
- Two-factor authentication (2FA)
- Biometric authentication support
- Advanced threat detection
- Security audit logging
- Compliance certifications (SOC 2, GDPR)

**Performance Optimization:**
- GraphQL API for flexible queries
- Real-time updates with WebSockets
- Advanced caching strategies
- Database query optimization
- CDN integration for global performance

**DevOps Improvements:**
- CI/CD pipeline automation
- Infrastructure as Code (Terraform)
- Container orchestration (Kubernetes)
- Automated testing and deployment
- Blue-green deployments

**Monitoring and Observability:**
- Distributed tracing
- Advanced error tracking
- Performance monitoring
- User behavior analytics
- Predictive maintenance

#### 18.4 Business Enhancements

**Marketplace Features:**
- Lawyer subscription tiers
- Featured lawyer listings
- Sponsored placements
- Premium user features
- Enterprise plans for law firms

**Partnership Integrations:**
- Legal research database integration
- Court system integration
- Bar association verification
- Legal aid organization partnerships
- Corporate legal department integrations

**Community Features:**
- Legal Q&A forum
- Lawyer community
- Client success stories
- Legal education resources
- Pro bono coordination

---

## Page 21: Project Timeline

### 19. Project Timeline

#### 19.1 Development Phases

**Phase 1: Foundation (Weeks 1-4)**
- Project setup and configuration
- Database design and implementation
- Authentication system development
- Basic user management
- Initial API structure

**Phase 2: Core Features (Weeks 5-8)**
- Lawyer profile management
- Consultation system development
- Search and browse functionality
- Admin dashboard basics
- API documentation completion

**Phase 3: Advanced Features (Weeks 9-12)**
- Advanced security implementation
- Ownership validation
- Status management
- Error handling and validation
- Performance optimization

**Phase 4: Testing and Refinement (Weeks 13-16)**
- Unit testing implementation
- Integration testing
- Security testing
- Performance testing
- Bug fixes and refinements

**Phase 5: Deployment and Documentation (Weeks 17-20)**
- Production deployment
- User documentation
- Admin documentation
- Training materials
- Final testing and validation

#### 19.2 Milestone Schedule

**Milestone 1: Authentication System (Week 2)**
- User registration and login
- JWT token generation
- Password security
- Basic role management

**Milestone 2: Database Schema (Week 3)**
- Entity relationships
- Database constraints
- Indexing strategy
- Data migration scripts

**Milestone 3: Core API (Week 6)**
- User management endpoints
- Lawyer management endpoints
- Consultation endpoints
- Admin endpoints

**Milestone 4: Security Implementation (Week 8)**
- Role-based authorization
- Ownership validation
- Security configuration
- CORS setup

**Milestone 5: Testing Completion (Week 14)**
- Unit test coverage 80%+
- Integration test suite
- Security audit
- Performance benchmarks

**Milestone 6: Production Ready (Week 18)**
- Production deployment
- Monitoring setup
- Backup procedures
- Documentation complete

#### 19.3 Risk Management

**Technical Risks:**
- Database performance issues → Mitigation: Indexing and query optimization
- Security vulnerabilities → Mitigation: Security audit and penetration testing
- Integration challenges → Mitigation: Incremental integration testing
- Performance bottlenecks → Mitigation: Load testing and optimization

**Project Risks:**
- Timeline delays → Mitigation: Buffer time in schedule
- Scope creep → Mitigation: Strict change management process
- Resource constraints → Mitigation: Prioritization of critical features
- Knowledge gaps → Mitigation: Training and documentation

---

## Page 22: Team Contributions

### 20. Team Contributions

#### 20.1 Team Structure

**Project Lead:**
- Overall project coordination
- Architecture decisions
- Code review and quality assurance
- Documentation oversight

**Backend Developer:**
- API development
- Database implementation
- Security implementation
- Testing and debugging

**Frontend Developer:**
- User interface development
- API integration
- State management
- User experience optimization

**QA Engineer:**
- Test planning and execution
- Bug tracking and reporting
- Quality assurance processes
- Performance testing

#### 20.2 Contribution Areas

**Architecture and Design:**
- System architecture design
- Database schema design
- API design and documentation
- Security architecture

**Implementation:**
- Backend API development
- Database implementation
- Security implementation
- Error handling and validation

**Testing:**
- Unit testing
- Integration testing
- Security testing
- Performance testing

**Documentation:**
- Technical documentation
- User documentation
- API documentation
- Deployment guides

**Deployment:**
- Environment setup
- CI/CD pipeline
- Production deployment
- Monitoring and maintenance

#### 20.3 Skills and Technologies

**Backend Skills:**
- Java 21 and modern Java features
- Spring Boot ecosystem
- Spring Security
- JPA and Hibernate
- PostgreSQL database
- REST API design
- JWT authentication
- Testing frameworks

**Database Skills:**
- Database design
- SQL optimization
- Indexing strategies
- Data modeling
- Migration planning

**Security Skills:**
- Authentication mechanisms
- Authorization models
- Security best practices
- Vulnerability assessment
- Security auditing

**DevOps Skills:**
- Build automation with Maven
- Docker containerization
- Cloud deployment
- Monitoring and logging
- CI/CD pipelines

---

## Page 23: Lessons Learned

### 21. Lessons Learned

#### 21.1 Technical Lessons

**Security First Approach:**
- Lesson: Security should be considered from the beginning
- Impact: Avoided major security refactoring
- Takeaway: Implement security early in development

**Database Design Importance:**
- Lesson: Proper database design prevents future issues
- Impact: Smooth data operations and relationships
- Takeaway: Invest time in schema design and indexing

**API Design Consistency:**
- Lesson: Consistent API design improves developer experience
- Impact: Easier frontend integration and maintenance
- Takeaway: Follow REST principles and standard patterns

**Testing Strategy:**
- Lesson: Early testing prevents major bugs
- Impact: Reduced debugging time and improved quality
- Takeaway: Implement testing alongside development

#### 21.2 Project Management Lessons

**Scope Management:**
- Lesson: Clear scope definition prevents creep
- Impact: Project completed on time
- Takeaway: Define and communicate scope clearly

**Incremental Development:**
- Lesson: Small, incremental steps lead to better progress
- Impact: Manageable development process
- Takeaway: Break down complex features into smaller tasks

**Communication:**
- Lesson: Regular communication prevents misunderstandings
- Impact: Aligned team and expectations
- Takeaway: Establish regular communication channels

**Documentation:**
- Lesson: Documentation is as important as code
- Impact: Easier onboarding and maintenance
- Takeaway: Document decisions and processes continuously

#### 21.3 Technology Lessons

**Framework Selection:**
- Lesson: Choose frameworks with strong community support
- Impact: Easy problem-solving and resources
- Takeaway: Evaluate community and ecosystem before selection

**Modern Java Features:**
- Lesson: Modern Java features improve code quality
- Impact: Cleaner, more maintainable code
- Takeaway: Leverage language features appropriately

**Security Libraries:**
- Lesson: Use established security libraries
- Impact: Robust security implementation
- Takeaway: Don't implement security from scratch

**Database Technology:**
- Lesson: Choose appropriate database for use case
- Impact: Optimal performance and features
- Takeaway: Match database capabilities to requirements

#### 21.4 Best Practices Adopted

**Code Quality:**
- Consistent coding standards
- Regular code reviews
- Comprehensive error handling
- Input validation and sanitization

**Security Practices:**
- Principle of least privilege
- Defense in depth
- Regular security updates
- Secure configuration management

**Development Practices:**
- Version control best practices
- Automated testing
- Continuous integration
- Documentation standards

**Operational Practices:**
- Monitoring and logging
- Backup and recovery procedures
- Performance monitoring
- Capacity planning

---

## Page 24: Conclusion

### 22. Conclusion

#### 22.1 Project Summary

LegalConnect has been successfully developed as a comprehensive AI-powered legal assistance platform that addresses the fundamental challenges in connecting clients with appropriate legal professionals. The project demonstrates enterprise-grade software development practices, implementing modern technologies and security best practices.

**Key Achievements:**
- Complete backend API with Spring Boot 3.3.4 and Java 21
- Secure JWT-based authentication system
- Role-based authorization with three distinct user roles
- Comprehensive consultation management system
- Proper ownership validation and data access control
- Interactive API documentation with Swagger
- Scalable architecture for future enhancements
- PostgreSQL database with optimized schema design

**Technical Excellence:**
- Clean architecture with separation of concerns
- Robust security implementation
- Comprehensive error handling
- Input validation and sanitization
- RESTful API design principles
- Database optimization with proper indexing
- Performance considerations and monitoring

#### 22.2 Impact and Benefits

**For Users:**
- Easier access to legal assistance
- Transparent lawyer information
- Efficient consultation booking
- Secure platform for legal interactions
- Improved access to justice

**For Lawyers:**
- Efficient client acquisition
- Professional profile management
- Streamlined consultation handling
- Performance tracking and analytics
- Business growth opportunities

**For the Legal Industry:**
- Modernized legal service delivery
- Increased accessibility
- Improved transparency
- Enhanced efficiency
- Technology integration

#### 22.3 Future Outlook

LegalConnect is positioned for significant growth and enhancement. The solid foundation established in this project provides a strong base for future features including AI-powered matching, video consultations, payment processing, and mobile applications.

The platform's architecture supports scaling to handle increased user load, and the modular design allows for easy addition of new features. The security-first approach ensures that as the platform grows, user data and interactions remain protected.

#### 22.4 Closing Remarks

This project represents a successful collaboration of modern software development practices, thoughtful architecture design, and comprehensive security implementation. The LegalConnect platform demonstrates how technology can address real-world challenges in the legal services industry, making legal assistance more accessible, efficient, and transparent.

The knowledge and experience gained through this project provide valuable insights into enterprise software development, security implementation, and scalable architecture design. These lessons will inform future projects and contribute to continued professional growth.

---

## Page 25: References

### 23. References

#### 23.1 Technical Documentation

**Spring Framework:**
- Spring Boot Documentation: https://spring.io/projects/spring-boot
- Spring Security Reference: https://docs.spring.io/spring-security/reference/
- Spring Data JPA: https://spring.io/projects/spring-data-jpa

**Java Resources:**
- Java 21 Documentation: https://docs.oracle.com/en/java/javase/21/
- Jakarta EE Documentation: https://jakarta.ee/specifications/
- Java Persistence API: https://jakarta.ee/specifications/persistence/

**Database Resources:**
- PostgreSQL Documentation: https://www.postgresql.org/docs/
- Hibernate ORM: https://hibernate.org/orm/documentation/
- JDBC Documentation: https://docs.oracle.com/javase/8/docs/technotes/guides/jdbc/

**Security Resources:**
- JWT Specification: https://tools.ietf.org/html/rfc7519
- OWASP Security Guidelines: https://owasp.org/
- Spring Security Best Practices: https://spring.io/projects/spring-security

#### 23.2 API Documentation

**OpenAPI/Swagger:**
- OpenAPI Specification: https://swagger.io/specification/
- SpringDoc OpenAPI: https://springdoc.org/
- Swagger UI: https://swagger.io/tools/swagger-ui/

**REST API Design:**
- REST API Best Practices: https://restfulapi.net/
- Richardson Maturity Model: https://martinfowler.com/articles/richardsonMaturityModel.html
- API Design Guidelines: https://github.com/microsoft/api-guidelines

#### 23.3 Development Tools

**Build Tools:**
- Maven Documentation: https://maven.apache.org/guides/
- Maven Plugins: https://maven.apache.org/plugins/
- Dependency Management: https://maven.apache.org/guides/introduction/introduction-to-dependency-mechanism.html

**Testing Frameworks:**
- JUnit 5: https://junit.org/junit5/docs/current/user-guide/
- Mockito: https://javadoc.io/doc/org.mockito/mockito-core/latest/org/mockito/Mockito.html
- Spring Boot Test: https://docs.spring.io/spring-boot/docs/current/reference/html/features.html#features.testing

#### 23.4 Deployment and DevOps

**Docker:**
- Docker Documentation: https://docs.docker.com/
- Docker Compose: https://docs.docker.com/compose/
- Containerization Best Practices: https://docs.docker.com/develop/dev-best-practices/

**Cloud Services:**
- AWS Documentation: https://docs.aws.amazon.com/
- Heroku Dev Center: https://devcenter.heroku.com/
- Google Cloud Platform: https://cloud.google.com/docs

#### 23.5 Academic Resources

**Software Engineering:**
- Clean Architecture: Robert C. Martin
- Design Patterns: Gang of Four
- Refactoring: Martin Fowler
- Continuous Delivery: Jez Humble and David Farley

**Database Design:**
- Database System Concepts: Silberschatz, Korth, and Sudarshan
- SQL Performance Explained: Markus Winand
- Designing Data-Intensive Applications: Martin Kleppmann

---

## Page 26: Appendices

### 24. Appendices

#### Appendix A: Configuration Files

**application.properties:**
```properties
server.port=8080

# PostgreSQL Configuration
spring.datasource.url=jdbc:postgresql://localhost:5432/legalconnect
spring.datasource.username=postgres
spring.datasource.password=root
spring.datasource.driver-class-name=org.postgresql.Driver

# JPA & Hibernate
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=false
spring.jpa.properties.hibernate.format_sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect

# JWT Configuration
app.jwt.secret=legalconnect_super_secret_key_for_jwt_token_generation_2026_secure_key_min_256_bits!
app.jwt.expiration-ms=86400000

# CORS Configuration
app.cors.allowed-origins=http://localhost:5173

# Swagger / OpenAPI
springdoc.api-docs.path=/v3/api-docs
springdoc.swagger-ui.path=/swagger-ui.html
springdoc.swagger-ui.operationsSorter=method
springdoc.swagger-ui.tagsSorter=alpha

# File Upload size limits
spring.servlet.multipart.max-file-size=15MB
spring.servlet.multipart.max-request-size=15MB
```

**pom.xml Dependencies:**
```xml
<dependencies>
    <!-- Spring Boot Starters -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-jpa</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-security</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-validation</artifactId>
    </dependency>

    <!-- Database Drivers -->
    <dependency>
        <groupId>org.postgresql</groupId>
        <artifactId>postgresql</artifactId>
        <scope>runtime</scope>
    </dependency>

    <!-- JWT Authentication -->
    <dependency>
        <groupId>io.jsonwebtoken</groupId>
        <artifactId>jjwt-api</artifactId>
        <version>0.12.6</version>
    </dependency>
    <dependency>
        <groupId>io.jsonwebtoken</groupId>
        <artifactId>jjwt-impl</artifactId>
        <version>0.12.6</version>
        <scope>runtime</scope>
    </dependency>
    <dependency>
        <groupId>io.jsonwebtoken</groupId>
        <artifactId>jjwt-jackson</artifactId>
        <version>0.12.6</version>
        <scope>runtime</scope>
    </dependency>

    <!-- OpenAPI / Swagger Documentation -->
    <dependency>
        <groupId>org.springdoc</groupId>
        <artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
        <version>2.6.0</version>
    </dependency>
</dependencies>
```

#### Appendix B: Database Schema

**Users Table:**
```sql
CREATE TABLE users (
    id VARCHAR(64) PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    role VARCHAR(32) NOT NULL,
    avatar_url VARCHAR(500),
    location VARCHAR(255),
    created_at TIMESTAMP NOT NULL
);

CREATE INDEX idx_users_email ON users(email);
```

**Lawyers Table:**
```sql
CREATE TABLE lawyers (
    id VARCHAR(64) PRIMARY KEY,
    user_id VARCHAR(64) NOT NULL UNIQUE,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    avatar_initials VARCHAR(10),
    specialization VARCHAR(255),
    years_of_experience INTEGER DEFAULT 0,
    location VARCHAR(255),
    consultation_fee DOUBLE DEFAULT 0.0,
    rating DOUBLE DEFAULT 5.0,
    review_count INTEGER DEFAULT 0,
    availability VARCHAR(32) DEFAULT 'AVAILABLE',
    verification_status VARCHAR(32) DEFAULT 'PENDING',
    relevant_experience TEXT,
    bio TEXT,
    availability_slots_json TEXT,
    profile_completion INTEGER DEFAULT 80,
    is_demo BOOLEAN DEFAULT true
);

CREATE INDEX idx_lawyer_user_id ON lawyers(user_id);
CREATE INDEX idx_lawyer_verification_status ON lawyers(verification_status);
```

**Consultations Table:**
```sql
CREATE TABLE consultations (
    id VARCHAR(64) PRIMARY KEY,
    user_id VARCHAR(64) NOT NULL,
    user_name VARCHAR(255),
    lawyer_id VARCHAR(64) NOT NULL,
    lawyer_name VARCHAR(255),
    case_id VARCHAR(64),
    case_title VARCHAR(255),
    preferred_date VARCHAR(50),
    preferred_time VARCHAR(50),
    description TEXT,
    type VARCHAR(32) DEFAULT 'VIDEO',
    status VARCHAR(32) NOT NULL DEFAULT 'PENDING',
    created_at TIMESTAMP NOT NULL
);

CREATE INDEX idx_consultation_user_id ON consultations(user_id);
CREATE INDEX idx_consultation_lawyer_id ON consultations(lawyer_id);
CREATE INDEX idx_consultation_status ON consultations(status);
```

#### Appendix C: API Response Codes

**Success Codes:**
- 200 OK: Request succeeded
- 201 Created: Resource created successfully
- 204 No Content: Request succeeded with no content

**Client Error Codes:**
- 400 Bad Request: Invalid request data
- 401 Unauthorized: Authentication required
- 403 Forbidden: Insufficient permissions
- 404 Not Found: Resource not found
- 409 Conflict: Resource conflict (e.g., duplicate email)

**Server Error Codes:**
- 500 Internal Server Error: Server error
- 503 Service Unavailable: Service temporarily unavailable

---

## Page 27: Glossary

### 25. Glossary

**API (Application Programming Interface):** A set of rules and protocols that allows different software applications to communicate with each other.

**Authentication:** The process of verifying the identity of a user or system, typically through credentials like username and password.

**Authorization:** The process of determining what permissions an authenticated user has, controlling access to resources and operations.

**BCrypt:** A password hashing function designed to be slow and computationally expensive, making it resistant to brute-force attacks.

**CORS (Cross-Origin Resource Sharing):** A security mechanism that allows or restricts cross-origin requests in web browsers.

**DTO (Data Transfer Object):** An object that carries data between processes, often used to transfer data between different layers of an application.

**Entity:** A class that represents a table in a relational database, mapping object-oriented concepts to database tables.

**Hibernate:** An object-relational mapping (ORM) framework for Java that provides a framework for mapping object-oriented domain models to relational databases.

**JPA (Java Persistence API):** A Java specification for accessing, persisting, and managing data between Java objects and relational databases.

**JWT (JSON Web Token):** A compact, URL-safe means of representing claims to be transferred between two parties, commonly used for authentication.

**Maven:** A build automation and dependency management tool for Java projects.

**ORM (Object-Relational Mapping):** A programming technique for converting data between incompatible type systems in object-oriented programming languages and relational databases.

**PostgreSQL:** An open-source relational database management system known for its reliability, feature robustness, and performance.

**Repository:** A design pattern that mediates between the domain and data mapping layers, acting like an in-memory domain object collection.

**REST (Representational State Transfer):** An architectural style for designing networked applications, using HTTP requests to access and manipulate data.

**Spring Boot:** An open-source Java framework that simplifies the development of stand-alone, production-grade Spring-based applications.

**Spring Security:** A powerful and customizable authentication and access-control framework for Java applications.

**Swagger:** A set of tools for designing, building, documenting, and consuming RESTful web services.

**Three-Tier Architecture:** A software architecture pattern that separates applications into three logical tiers: presentation, business logic, and data storage.

**UUID (Universally Unique Identifier):** A 128-bit number used to identify information in computer systems, guaranteed to be unique across space and time.

---

## Page 28: Code Samples

### 26. Code Samples

#### Sample 1: User Registration

```java
@Transactional
public AuthResponse register(RegisterRequest request) {
    if (userRepository.existsByEmailIgnoreCase(request.getEmail())) {
        throw new BadRequestException("Email already registered");
    }

    UserEntity user = new UserEntity();
    user.setId(UUID.randomUUID().toString());
    user.setFullName(request.getFullName());
    user.setEmail(request.getEmail());
    user.setPassword(passwordEncoder.encode(request.getPassword()));
    user.setPhone(request.getPhone());
    user.setRole(request.getRole());
    user.setLocation(request.getLocation());

    user = userRepository.save(user);

    if (request.getRole() == UserRole.LAWYER) {
        createLawyerProfile(user, request);
    }

    String token = jwtUtil.generateToken(user.getId(), user.getEmail(),
                                        user.getRole(), user.getFullName());
    UserDto userDto = mapToUserDto(user);

    return new AuthResponse(token, userDto);
}
```

#### Sample 2: Consultation Creation

```java
@Transactional
public ConsultationDto createConsultation(ConsultationRequestPayload request,
                                         Authentication authentication) {
    UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();

    UserEntity user = userRepository.findById(userPrincipal.getId())
            .orElseThrow(() -> new ResourceNotFoundException("User not found"));

    LawyerEntity lawyer = lawyerRepository.findById(request.getLawyerId())
            .orElseThrow(() -> new ResourceNotFoundException("Lawyer not found"));

    ConsultationEntity consultation = new ConsultationEntity();
    consultation.setId(UUID.randomUUID().toString());
    consultation.setUserId(user.getId());
    consultation.setUserName(user.getFullName());
    consultation.setLawyerId(lawyer.getId());
    consultation.setLawyerName(lawyer.getFullName());
    consultation.setCaseId(request.getCaseId());
    consultation.setCaseTitle(request.getCaseTitle());
    consultation.setPreferredDate(request.getPreferredDate());
    consultation.setPreferredTime(request.getPreferredTime());
    consultation.setDescription(request.getDescription());
    consultation.setType(request.getType());
    consultation.setStatus(ConsultationStatus.PENDING);

    consultation = consultationRepository.save(consultation);
    return mapToConsultationDto(consultation);
}
```

#### Sample 3: Ownership Validation

```java
public ConsultationDto acceptConsultation(String consultationId,
                                         Authentication authentication) {
    UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();

    LawyerEntity lawyer = lawyerRepository.findByUserId(userPrincipal.getId())
            .orElseThrow(() -> new ResourceNotFoundException(
                "Lawyer profile not found for this user"));

    ConsultationEntity consultation = consultationRepository.findById(consultationId)
            .orElseThrow(() -> new ResourceNotFoundException("Consultation not found"));

    if (!consultation.getLawyerId().equals(lawyer.getId())) {
        throw new ForbiddenException(
            "You can only accept consultations assigned to you");
    }

    if (consultation.getStatus() != ConsultationStatus.PENDING) {
        throw new BadRequestException("Consultation is not in pending status");
    }

    consultation.setStatus(ConsultationStatus.ACCEPTED);
    consultation = consultationRepository.save(consultation);

    return mapToConsultationDto(consultation);
}
```

#### Sample 4: Security Configuration

```java
@Bean
public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    http
        .csrf(AbstractHttpConfigurer::disable)
        .cors(cors -> cors.configurationSource(corsConfigurationSource()))
        .authorizeHttpRequests(auth -> auth
            .requestMatchers("/api/auth/**").permitAll()
            .requestMatchers("/api/public/**").permitAll()
            .requestMatchers("/v3/api-docs/**", "/swagger-ui/**").permitAll()
            .requestMatchers("/api/admin/**").hasRole("ADMIN")
            .anyRequest().authenticated()
        )
        .sessionManagement(session -> session
            .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
        )
        .authenticationProvider(authenticationProvider())
        .addFilterBefore(jwtAuthenticationFilter,
            UsernamePasswordAuthenticationFilter.class);

    return http.build();
}
```

---

## Page 29: Installation and Setup Guide

### 27. Installation and Setup Guide

#### Step-by-Step Installation

**Step 1: System Requirements Check**
- Verify Java 21 is installed: `java -version`
- Verify Maven is installed: `mvn -version`
- Verify PostgreSQL is running: Check service status

**Step 2: Database Setup**
```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE legalconnect;

# Create user (optional)
CREATE USER legalconnect WITH PASSWORD 'secure_password';
GRANT ALL PRIVILEGES ON DATABASE legalconnect TO legalconnect;

# Exit PostgreSQL
\q
```

**Step 3: Project Setup**
```bash
# Clone repository
git clone <repository-url>
cd LegalConnect/Backend

# Update configuration
# Edit src/main/resources/application.properties
# Update database credentials if needed

# Build project
./mvnw clean install

# Run application
./mvnw spring-boot:run
```

**Step 4: Verification**
- Access Swagger UI: http://localhost:8080/swagger-ui.html
- Test registration endpoint
- Verify database tables created
- Check application logs for errors

#### Troubleshooting

**Issue: Database Connection Failed**
- Solution: Verify PostgreSQL is running
- Solution: Check database credentials
- Solution: Verify database exists

**Issue: Port Already in Use**
- Solution: Change port in application.properties
- Solution: Stop conflicting service
- Solution: Use different port configuration

**Issue: JWT Token Issues**
- Solution: Verify secret key configuration
- Solution: Check token expiration settings
- Solution: Verify token format in requests

**Issue: CORS Errors**
- Solution: Verify frontend URL in CORS configuration
- Solution: Check browser console for specific errors
- Solution: Verify allowed origins configuration

---

## Page 30: Contact Information

### 28. Contact Information

#### Project Information

**Project Name:** LegalConnect
**Project Type:** College Project
**Development Period:** 2026
**Technology Stack:** Java 21, Spring Boot 3.3.4, PostgreSQL, JWT

#### Team Contact

**Project Lead:**
- Name: [Your Name]
- Email: [your.email@example.com]
- Phone: [Your Phone Number]
- Role: Backend Development & Architecture

**Institution Contact:**
- University: [University Name]
- Department: [Department Name]
- Supervisor: [Professor Name]
- Email: [professor.email@university.edu]

#### Technical Support

**For Technical Issues:**
- GitHub Issues: [Repository URL]/issues
- Email: support@legalconnect.com
- Documentation: [Documentation URL]

**For General Inquiries:**
- Email: info@legalconnect.com
- Website: www.legalconnect.com
- Social Media: [Social Media Links]

#### Project Resources

**Source Code:**
- Repository: [GitHub Repository URL]
- Branch: main
- Latest Release: v1.0.0

**Documentation:**
- API Documentation: http://localhost:8080/swagger-ui.html
- Technical Docs: [Documentation URL]
- User Manual: [User Manual URL]

**Deployment:**
- Development: http://localhost:8080
- Staging: [Staging URL]
- Production: [Production URL]

#### Acknowledgments

**Special Thanks:**
- [University Name] for providing resources and guidance
- [Professor Name] for supervision and mentorship
- Team members for their dedication and hard work
- Open source community for valuable tools and libraries

**References:**
- Spring Framework Community
- PostgreSQL Global Development Group
- Java Community Process
- OWASP Security Foundation

---

## Document Information

**Document Title:** LegalConnect - Complete Project Documentation
**Document Version:** 1.0
**Last Updated:** October 2026
**Document Type:** Technical Documentation
**Page Count:** 30 pages
**Word Count:** Approximately 15,000 words

**Distribution:**
- Internal: Project team, university supervisors
- External: Potential stakeholders, future development teams

**Revision History:**
- v1.0 (October 2026): Initial document creation

---

**End of Document**
