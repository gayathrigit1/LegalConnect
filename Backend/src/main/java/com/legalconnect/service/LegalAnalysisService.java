package com.legalconnect.service;

import com.legalconnect.dto.AiAnalysisResultDto;
import com.legalconnect.exception.BadRequestException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Deterministic, rule-based legal case analysis engine.
 *
 * <p>Provides structured, high-accuracy legal domain classification, issue extraction,
 * factual analysis, key legal points, actionable guidance, and formal disclaimers without
 * relying on external third-party LLMs or cloud AI APIs.
 *
 * <p>Classifies problems across the 9 core legal domains supported by LegalConnect:
 * <ul>
 *   <li>Labour / Employment</li>
 *   <li>Family</li>
 *   <li>Criminal</li>
 *   <li>Corporate</li>
 *   <li>Property</li>
 *   <li>Cyber</li>
 *   <li>Consumer</li>
 *   <li>Tax</li>
 *   <li>Civil</li>
 * </ul>
 */
@Service
public class LegalAnalysisService {

    private static final Logger log = LoggerFactory.getLogger(LegalAnalysisService.class);

    private static final Pattern MONETARY_PATTERN = Pattern.compile(
            "(?i)(?:₹|rs\\.?|inr|rupees?)\\s*([0-9,]+(?:\\.[0-9]{1,2})?|(?:[0-9]+(?:\\.[0-9]+)?\\s*(?:lakh|lac|crore|k|thousand|million)))");

    private static final Pattern TIMELINE_PATTERN = Pattern.compile(
            "(?i)\\b([0-9]+\\s*(?:days?|weeks?|months?|years?)|notice period|date of|since|from\\s+[0-9]{4}|in\\s+[0-9]{4})\\b");

    private static final Pattern DOCUMENT_PATTERN = Pattern.compile(
            "(?i)\\b(contract|agreement|offer letter|appointment letter|notice|email|fir|receipt|invoice|deed|will|cheque|challan|itr)\\b");

    private static final Map<String, DomainRule> DOMAIN_RULES = new LinkedHashMap<>();

    static {
        DOMAIN_RULES.put("Labour", new DomainRule(
                "Labour / Employment",
                List.of(
                        "employment", "employer", "employee", "salary", "wage", "wages", "notice period",
                        "severance", "termination", "terminated", "resignation", "resigned", "laid off",
                        "layoff", "gratuity", "provident fund", "pf", "wrongful termination", "workplace",
                        "posh", "sexual harassment at workplace", "labour court", "contract of employment",
                        "overtime", "hr", "appraisal", "bond", "service bond", "appointment letter",
                        "relieving letter", "experience certificate", "unpaid salary", "non-compete"
                ),
                List.of(
                        "Employment contract terms, notice period covenants, and appointment documentation.",
                        "Chronology of written communications, performance reviews, and termination/resignation correspondence.",
                        "Quantified computation of disputed dues, severance calculation, gratuity, and provident fund balance."
                ),
                List.of(
                        "Employment bonds and restrictive covenants are subject to Section 27 of the Indian Contract Act.",
                        "Summary termination without adherence to contractually stipulated notice or statutory inquiry may constitute wrongful discharge.",
                        "Gratuity and statutory provident fund contributions are governed by dedicated statutory enactments and cannot be arbitrarily withheld."
                ),
                "Consult a qualified labour and employment advocate to issue a formal demand notice for unpaid dues and review the legality of termination terms."
        ));

        DOMAIN_RULES.put("Family", new DomainRule(
                "Family",
                List.of(
                        "divorce", "alimony", "maintenance", "custody", "child custody", "spouse", "husband",
                        "wife", "marriage", "matrimonial", "domestic violence", "dv act", "dowry", "separation",
                        "restitution of conjugal rights", "conjugal", "guardianship", "adoption", "visitation",
                        "annulment", "cruelty", "498a", "desertion", "judicial separation", "streedhan"
                ),
                List.of(
                        "Marriage certificate, proof of solemnisation, and verified residential jurisdiction of both parties.",
                        "Comprehensive statement of assets, liabilities, and income disclosures for maintenance evaluation.",
                        "Documentation concerning children's welfare, education, healthcare, and primary caregiving arrangements."
                ),
                List.of(
                        "Interim maintenance applications can be moved during the pendency of main matrimonial proceedings.",
                        "Custody determinations are guided primarily by the paramount welfare of the minor child rather than parental rights.",
                        "Domestic violence provisions offer immediate protective remedies, residence orders, and monetary relief."
                ),
                "Engage an experienced family law counsel to explore pre-litigation mediation, secure protective orders if needed, and prepare appropriate pleadings."
        ));

        DOMAIN_RULES.put("Criminal", new DomainRule(
                "Criminal",
                List.of(
                        "fir", "police", "arrest", "arrested", "bail", "anticipatory bail", "theft", "fraud",
                        "assault", "crime", "accused", "cheating", "420", "ipc", "bns", "bnss", "charge sheet",
                        "magistrate", "extortion", "blackmail", "robbery", "threat", "threatening", "police station",
                        "investigation", "quashing", "crpc", "summons", "warrant", "cognizable", "bailable"
                ),
                List.of(
                        "Certified copy of the First Information Report (FIR), complaint copy, or police GD entry.",
                        "Detailed chronological timeline of the alleged occurrence, verifiable alibis, and phone/location records.",
                        "Preservation of digital correspondence, CCTV footage, and identity of independent witnesses."
                ),
                List.of(
                        "Right to legal representation and statutory protection against arbitrary custodial detention are constitutionally guaranteed.",
                        "Anticipatory bail applications can be moved before the Sessions Court or High Court where arrest is reasonably apprehended.",
                        "Contradictions in early statements and absence of corroborative physical evidence significantly influence bail adjudication."
                ),
                "Retain criminal defense counsel immediately to seek appropriate bail protection, safeguard fundamental rights, and formulate legal defense strategy."
        ));

        DOMAIN_RULES.put("Corporate", new DomainRule(
                "Corporate",
                List.of(
                        "company", "startup", "director", "shareholder", "shares", "board of directors",
                        "incorporation", "m&a", "merger", "acquisition", "nda", "partnership", "llp",
                        "vendor agreement", "commercial contract", "breach of contract", "intellectual property",
                        "trademark", "patent", "copyright", "roc", "mca", "nclt", "insolvency", "ibc",
                        "equity", "vesting", "founders agreement", "commercial dispute", "arbitration"
                ),
                List.of(
                        "Fully executed contracts, master service agreements, and signed board/shareholder resolutions.",
                        "Statutory filings with the Registrar of Companies (ROC) and Ministry of Corporate Affairs (MCA).",
                        "Audit trail of deliverables, default notifications, cure-period correspondence, and invoice payment receipts."
                ),
                List.of(
                        "Contractual arbitration and dispute resolution clauses dictate forum selection and prerequisite negotiation steps.",
                        "Director liabilities and fiduciary duties under corporate statutes necessitate adherence to governance protocols.",
                        "Commercial disputes above specified thresholds may be eligible for fast-track resolution under commercial court frameworks."
                ),
                "Consult corporate legal counsel to issue formal cure notices, review contractual arbitration covenants, and protect business equity."
        ));

        DOMAIN_RULES.put("Property", new DomainRule(
                "Property",
                List.of(
                        "property", "land", "plot", "flat", "apartment", "tenant", "landlord", "rent",
                        "lease", "eviction", "sale deed", "title deed", "mutation", "registry", "possession",
                        "rera", "builder", "encroachment", "partition", "ancestral", "ancestral property",
                        "will", "inheritance", "trespass", "khata", "stamp duty", "possession delay"
                ),
                List.of(
                        "Registered title deeds, link deeds spanning 30+ years, and current Encumbrance Certificate (EC).",
                        "Executed lease/rental agreement, security deposit acknowledgments, and rent receipt records.",
                        "RERA project registration credentials, approved sanction plans, and builder communication records."
                ),
                List.of(
                        "Clear marketable title and continuous possession records are critical to defending or asserting property ownership.",
                        "Tenant eviction requires compliance with state-specific rent control enactments and due notice.",
                        "Homebuyers facing project delays are entitled to refund with statutory interest under RERA provisions."
                ),
                "Engage a property advocate to conduct a formal title search, inspect revenue records, and issue appropriate statutory notices."
        ));

        DOMAIN_RULES.put("Cyber", new DomainRule(
                "Cyber",
                List.of(
                        "cyber", "hacked", "hacking", "online fraud", "phishing", "data breach", "identity theft",
                        "otp", "scam", "financial fraud", "unauthorized transaction", "it act", "information technology act",
                        "digital evidence", "social media", "cyber cell", "cybercrime", "impersonation", "ransomware",
                        "crypto scam", "upi fraud", "credit card fraud"
                ),
                List.of(
                        "Immediate incident registration acknowledgment from the National Cyber Crime Reporting Portal (cybercrime.gov.in) and 1930 helpline.",
                        "Transaction reference identifiers (UTR numbers), bank account statements, and recipient beneficiary details.",
                        "Complete digital audit trail including unedited screenshots, email headers, sender phone numbers, and URLs."
                ),
                List.of(
                        "Expedited reporting within golden hours substantially increases the probability of funds being frozen in the beneficiary account.",
                        "Section 65B electronic evidence certification is mandatory for admissibility of digital records in judicial proceedings.",
                        "Intermediaries and banking institutions are bound by statutory timelines for fraud redressal under RBI and IT Act mandates."
                ),
                "Lodge an urgent formal grievance with the National Cyber Crime Portal and your financial institution, followed by IT legal counsel."
        ));

        DOMAIN_RULES.put("Consumer", new DomainRule(
                "Consumer",
                List.of(
                        "consumer", "defective", "deficiency in service", "refund", "warranty", "guarantee",
                        "replacement", "unfair trade practice", "overcharged", "e-commerce", "flipkart",
                        "amazon", "consumer court", "consumer forum", "national consumer helpline",
                        "misleading advertisement", "service shortfall", "damaged goods"
                ),
                List.of(
                        "Tax invoice, proof of payment, warranty card, product packaging, and batch/serial numbers.",
                        "Complete customer support ticket logs, email correspondence, and recorded deficiency acknowledgments.",
                        "Photographic, video, or expert inspection evidence demonstrating product defect or service failure."
                ),
                List.of(
                        "Consumer Protection legislation permits claims for refund, replacement, and compensation for mental agony and litigation expenses.",
                        "Statutory limitation for filing a consumer complaint is generally 2 years from the date of the cause of action.",
                        "E-commerce entities share liability with sellers for unfair trade practices and misleading representations."
                ),
                "Register a complaint on the National Consumer Helpline (consumerhelpline.gov.in) and issue a statutory legal notice to the manufacturer/seller."
        ));

        DOMAIN_RULES.put("Tax", new DomainRule(
                "Tax",
                List.of(
                        "tax", "income tax", "gst", "itr", "scrutiny", "assessment", "penalty", "tax notice",
                        "tax evasion", "tds", "capital gains", "audit", "tax department", "assessing officer",
                        "appeal", "itat", "high court tax", "advance tax", "148 notice", "gst demand"
                ),
                List.of(
                        "Complete statutory notice received from the revenue authority indicating relevant legal sections and response deadlines.",
                        "Filed income tax or GST returns, computation worksheets, Form 26AS, Annual Information Statement (AIS), and audit reports.",
                        "Reconciliation statements, bank transaction proofs, and relevant tax challans."
                ),
                List.of(
                        "Statutory responses to revenue notices must be submitted strictly within the limitation period specified in the notice.",
                        "Failure to respond to inquiries under tax statutes may lead to ex-parte best judgment assessments and penalty proceedings.",
                        "Appellate remedies lie before the Commissioner (Appeals) and Appellate Tribunal before approaching Constitutional Courts."
                ),
                "Engage a tax attorney and chartered accountant to review the notice and draft a comprehensive, point-by-point factual and legal submission."
        ));

        DOMAIN_RULES.put("Civil", new DomainRule(
                "Civil",
                List.of(
                        "money recovery", "promissory note", "loan", "debt", "damages", "compensation",
                        "injunction", "stay order", "declaration", "defamation", "tort", "suit",
                        "civil court", "specific performance", "legal notice", "recovery suit", "breach of promise",
                        "settlement agreement", "dispute", "negligence", "easement"
                ),
                List.of(
                        "Primary transaction agreements, promissory notes, receipts, account statements, and acknowledgment of debt.",
                        "Formal legal demand notice dispatched with postal tracking / delivery acknowledgment.",
                        "Chronological sequence of events demonstrating that the claim is well within the statutory limitation period (typically 3 years for debt)."
                ),
                List.of(
                        "Civil suits for recovery require timely filing within the limitation period reckoned from the date of default.",
                        "Interim injunctive relief can be sought under Order XXXIX of the Civil Procedure Code to maintain status quo.",
                        "A well-articulated legal notice often facilitates pre-litigation settlement without protracted courtroom trials."
                ),
                "Consult a civil litigation attorney to issue a formal demand notice and evaluate initiating appropriate civil recovery proceedings."
        ));
    }

    /**
     * Analyses a user-submitted legal problem description deterministically.
     *
     * @param description non-empty problem description (20-5000 characters)
     * @return populated {@link AiAnalysisResultDto}
     */
    public AiAnalysisResultDto analyse(String description) {
        if (description == null || description.isBlank()) {
            throw new BadRequestException("Please provide a description of your legal problem.");
        }
        String cleanText = description.trim();
        if (cleanText.length() < 10) {
            throw new BadRequestException("Please provide a slightly more descriptive summary of your legal problem (at least 10 characters).");
        }
        if (cleanText.length() > 5000) {
            throw new BadRequestException("Problem description must not exceed 5000 characters.");
        }

        log.info("Starting deterministic case analysis (text length: {} chars)", cleanText.length());

        // 1. Domain Classification
        String classifiedDomain = classifyDomain(cleanText);
        DomainRule rule = DOMAIN_RULES.getOrDefault(classifiedDomain, DOMAIN_RULES.get("Civil"));

        // 2. Factual extractions (monetary values, timelines, document mentions)
        List<String> dynamicFacts = extractCaseFacts(cleanText);

        // For brief/incomplete descriptions (10-24 characters), add constructive guidance
        if (cleanText.length() < 25) {
            dynamicFacts.add(0, "Note: Input is brief. Providing additional details (dates, contract terms, disputed amounts) will enable more granular legal assessment.");
        }

        // 3. Assemble important information
        List<String> importantInfo = new ArrayList<>(rule.importantInfo());
        if (!dynamicFacts.isEmpty()) {
            importantInfo.addAll(0, dynamicFacts);
        }

        // 4. Construct Case Summary
        String caseSummary = buildCaseSummary(cleanText, rule.displayName(), dynamicFacts);

        // 5. Construct Key Points
        List<String> keyPoints = new ArrayList<>(rule.keyPoints());

        // 6. Build Result DTO
        AiAnalysisResultDto dto = new AiAnalysisResultDto();
        dto.setProbableLegalDomain(rule.displayName());
        dto.setImportantInformation(importantInfo);
        dto.setCaseSummary(caseSummary);
        dto.setKeyPoints(keyPoints);
        dto.setRecommendation(rule.recommendation());
        dto.setDisclaimer("This analysis is an automated informational assessment generated by the LegalConnect rule engine. " +
                "It does not constitute formal legal advice, does not establish an attorney-client relationship, " +
                "and should be verified by a licensed legal practitioner.");
        dto.setSource("rule-engine");

        log.info("Case analysis completed. Classified domain: '{}'", rule.displayName());
        return dto;
    }

    /**
     * Matches keywords across all domains to find the highest relevance score.
     */
    private String classifyDomain(String text) {
        String lower = text.toLowerCase(Locale.ROOT);
        String bestDomain = "Civil";
        int maxScore = 0;

        for (Map.Entry<String, DomainRule> entry : DOMAIN_RULES.entrySet()) {
            String domain = entry.getKey();
            DomainRule rule = entry.getValue();
            int score = 0;

            for (String kw : rule.keywords()) {
                if (lower.contains(kw)) {
                    // Weight whole-word or prominent terms higher
                    score += kw.contains(" ") ? 3 : 1;
                }
            }

            if (score > maxScore) {
                maxScore = score;
                bestDomain = domain;
            }
        }

        log.debug("Classified domain: {} with keyword match score: {}", bestDomain, maxScore);
        return bestDomain;
    }

    /**
     * Extracts dynamic facts from the user text like amounts, timelines, and document references.
     */
    private List<String> extractCaseFacts(String text) {
        List<String> facts = new ArrayList<>();

        Matcher moneyMatcher = MONETARY_PATTERN.matcher(text);
        if (moneyMatcher.find()) {
            facts.add("Identified monetary value in dispute: " + moneyMatcher.group(0).trim() + " (preserve corresponding payment proofs and bank records).");
        }

        Matcher timeMatcher = TIMELINE_PATTERN.matcher(text);
        if (timeMatcher.find()) {
            facts.add("Specific timeline reference noted: '" + timeMatcher.group(0).trim() + "' (crucial for evaluating limitation periods and response windows).");
        }

        Matcher docMatcher = DOCUMENT_PATTERN.matcher(text);
        Set<String> docsFound = new LinkedHashSet<>();
        while (docMatcher.find() && docsFound.size() < 4) {
            docsFound.add(docMatcher.group(1).toLowerCase(Locale.ROOT));
        }
        if (!docsFound.isEmpty()) {
            facts.add("Referenced key documents: " + String.join(", ", docsFound) + " (ensure original physical and digital copies are safely archived).");
        }

        return facts;
    }

    /**
     * Synthesizes an executive case summary.
     */
    private String buildCaseSummary(String text, String domainDisplay, List<String> facts) {
        // Truncate snippet of the user problem for context
        String snippet = text.replaceAll("\\s+", " ").trim();
        if (snippet.length() > 220) {
            snippet = snippet.substring(0, 217) + "...";
        }

        StringBuilder sb = new StringBuilder();
        sb.append("The submitted case involves issues primarily falling within ").append(domainDisplay).append(". ");
        sb.append("Summary of the factual narrative: \"").append(snippet).append("\" ");
        if (!facts.isEmpty()) {
            sb.append("The matter indicates quantifiable legal interests requiring timely documentary verification and jurisdictional review. ");
        } else {
            sb.append("Documentary substantiation and formal representation are advised to establish legal standing and remedies. ");
        }
        sb.append("Prompt consultation with a specialized legal practitioner is recommended to avoid adverse limitation or procedural consequences.");

        return sb.toString();
    }

    private record DomainRule(
            String displayName,
            List<String> keywords,
            List<String> importantInfo,
            List<String> keyPoints,
            String recommendation
    ) {}
}

