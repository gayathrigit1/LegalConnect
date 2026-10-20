
package com.legalconnect.dto;

public class AdminStatsDto {

    private long totalUsers;
    private long totalLawyers;
    private long verifiedLawyers;
    private long pendingVerifications;
    private long totalConsultations;
    private long pendingConsultations;
    private long acceptedConsultations;
    private long rejectedConsultations;
    private long totalReviews;
    private long openCases;

    public AdminStatsDto() {
    }

    public AdminStatsDto(
            long totalUsers,
            long totalLawyers,
            long verifiedLawyers,
            long pendingVerifications,
            long totalConsultations,
            long pendingConsultations,
            long totalReviews,
            long openCases) {

        this.totalUsers = totalUsers;
        this.totalLawyers = totalLawyers;
        this.verifiedLawyers = verifiedLawyers;
        this.pendingVerifications = pendingVerifications;
        this.totalConsultations = totalConsultations;
        this.pendingConsultations = pendingConsultations;
        this.totalReviews = totalReviews;
        this.openCases = openCases;
    }

    public long getTotalUsers() {
        return totalUsers;
    }

    public void setTotalUsers(long totalUsers) {
        this.totalUsers = totalUsers;
    }

    public long getTotalLawyers() {
        return totalLawyers;
    }

    public void setTotalLawyers(long totalLawyers) {
        this.totalLawyers = totalLawyers;
    }

    public long getVerifiedLawyers() {
        return verifiedLawyers;
    }

    public void setVerifiedLawyers(long verifiedLawyers) {
        this.verifiedLawyers = verifiedLawyers;
    }

    public long getPendingVerifications() {
        return pendingVerifications;
    }

    public void setPendingVerifications(long pendingVerifications) {
        this.pendingVerifications = pendingVerifications;
    }

    public long getTotalConsultations() {
        return totalConsultations;
    }

    public void setTotalConsultations(long totalConsultations) {
        this.totalConsultations = totalConsultations;
    }

    public long getPendingConsultations() {
        return pendingConsultations;
    }

    public void setPendingConsultations(long pendingConsultations) {
        this.pendingConsultations = pendingConsultations;
    }

    public long getAcceptedConsultations() {
        return acceptedConsultations;
    }

    public void setAcceptedConsultations(long acceptedConsultations) {
        this.acceptedConsultations = acceptedConsultations;
    }

    public long getRejectedConsultations() {
        return rejectedConsultations;
    }

    public void setRejectedConsultations(long rejectedConsultations) {
        this.rejectedConsultations = rejectedConsultations;
    }

    public long getTotalReviews() {
        return totalReviews;
    }

    public void setTotalReviews(long totalReviews) {
        this.totalReviews = totalReviews;
    }

    public long getOpenCases() {
        return openCases;
    }

    public void setOpenCases(long openCases) {
        this.openCases = openCases;
    }
}
