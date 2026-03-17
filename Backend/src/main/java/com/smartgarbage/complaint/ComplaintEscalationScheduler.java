package com.smartgarbage.complaint;

import com.smartgarbage.notification.EmailService;
import com.smartgarbage.user.User;
import com.smartgarbage.user.UserRepository;
import com.smartgarbage.user.UserRole;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Component
public class ComplaintEscalationScheduler {

    private final ComplaintRepository complaintRepository;
    private final UserRepository userRepository;
    private final EmailService emailService;

    public ComplaintEscalationScheduler(ComplaintRepository complaintRepository,
                                        UserRepository userRepository,
                                        EmailService emailService) {
        this.complaintRepository = complaintRepository;
        this.userRepository = userRepository;
        this.emailService = emailService;
    }

    /**
     * Runs every minute and sends alerts for complaints
     * that have been in PENDING status for more than 2 minutes.
     */
    @Scheduled(cron = "0 * * * * *")
    public void escalateOverdueComplaints() {
        Instant twoMinutesAgo = Instant.now().minus(2, ChronoUnit.MINUTES);

        List<Complaint> overdueComplaints =
                complaintRepository.findByStatusAndCreatedAtBefore(ComplaintStatus.PENDING, twoMinutesAgo);

        if (overdueComplaints.isEmpty()) {
            return;
        }

        List<User> admins = userRepository.findAllByRole(UserRole.ADMIN);
        if (admins.isEmpty()) {
            return;
        }

        for (Complaint complaint : overdueComplaints) {
            Long complaintId = complaint.getId();
            for (User admin : admins) {
                emailService.sendOverdueComplaintAlert(admin.getEmail(), complaintId);
            }
        }
    }
}

