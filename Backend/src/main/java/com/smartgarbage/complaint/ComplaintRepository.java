package com.smartgarbage.complaint;

import com.smartgarbage.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.Instant;
import java.util.List;

public interface ComplaintRepository extends JpaRepository<Complaint, Long> {

    List<Complaint> findByUser(User user);

    List<Complaint> findByStatus(ComplaintStatus status);

    long countByStatus(ComplaintStatus status);

    List<Complaint> findByStatusAndCreatedAtBefore(ComplaintStatus status, Instant createdAtBefore);
}

