package com.smartgarbage.complaint;

public class DashboardStatsResponse {

    private final long totalComplaints;
    private final long pendingComplaints;
    private final long cleaningComplaints;
    private final long completedComplaints;

    public DashboardStatsResponse(long totalComplaints,
                                  long pendingComplaints,
                                  long cleaningComplaints,
                                  long completedComplaints) {
        this.totalComplaints = totalComplaints;
        this.pendingComplaints = pendingComplaints;
        this.cleaningComplaints = cleaningComplaints;
        this.completedComplaints = completedComplaints;
    }

    public long getTotalComplaints() {
        return totalComplaints;
    }

    public long getPendingComplaints() {
        return pendingComplaints;
    }

    public long getCleaningComplaints() {
        return cleaningComplaints;
    }

    public long getCompletedComplaints() {
        return completedComplaints;
    }
}

