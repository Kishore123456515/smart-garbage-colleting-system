package com.smartgarbage.complaint;

import com.smartgarbage.file.ImageStorageService;
import com.smartgarbage.notification.EmailService;
import com.smartgarbage.user.User;
import com.smartgarbage.user.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ComplaintService {

    private final ComplaintRepository complaintRepository;
    private final UserRepository userRepository;
    private final ImageStorageService imageStorageService;
    private final EmailService emailService;

    public ComplaintService(ComplaintRepository complaintRepository,
                            UserRepository userRepository,
                            ImageStorageService imageStorageService,
                            EmailService emailService) {
        this.complaintRepository = complaintRepository;
        this.userRepository = userRepository;
        this.imageStorageService = imageStorageService;
        this.emailService = emailService;
    }

    @Transactional
    public ComplaintResponse createComplaint(ComplaintRequest request, MultipartFile imageFile) throws IOException {
        if (imageFile == null || imageFile.isEmpty()) {
            throw new IllegalArgumentException("Image file is required");
        }

        User currentUser = getCurrentUser();

        String imageUrl = imageStorageService.store(imageFile);

        Complaint complaint = new Complaint();
        complaint.setUser(currentUser);
        complaint.setImageUrl(imageUrl);
        complaint.setStreet(request.getStreet());
        complaint.setArea(request.getArea());
        complaint.setCity(request.getCity());
        complaint.setDescription(request.getDescription());
        complaint.setStatus(ComplaintStatus.PENDING);

        Complaint saved = complaintRepository.save(complaint);
        return toResponse(saved);
    }

    public List<ComplaintResponse> getMyComplaints() {
        User currentUser = getCurrentUser();
        return complaintRepository.findByUser(currentUser)
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public List<ComplaintResponse> getAllComplaints() {
        return complaintRepository.findAll()
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public ComplaintResponse updateStatus(Long complaintId, ComplaintStatus status) {
        Complaint complaint = complaintRepository.findById(complaintId)
                .orElseThrow(() -> new IllegalArgumentException("Complaint not found"));
        ComplaintStatus previousStatus = complaint.getStatus();
        complaint.setStatus(status);
        Complaint saved = complaintRepository.save(complaint);

        emailService.sendStatusUpdateEmail(
                saved.getUser().getEmail(),
                saved.getUser().getName(),
                saved.getId(),
                previousStatus,
                saved.getStatus()
        );

        return toResponse(saved);
    }

    public DashboardStatsResponse getDashboardStats() {
        long total = complaintRepository.count();
        long pending = complaintRepository.countByStatus(ComplaintStatus.PENDING);
        long cleaning = complaintRepository.countByStatus(ComplaintStatus.CLEANING);
        long completed = complaintRepository.countByStatus(ComplaintStatus.COMPLETED);

        return new DashboardStatsResponse(
                total,
                pending,
                cleaning,
                completed
        );
    }

    private ComplaintResponse toResponse(Complaint complaint) {
        return new ComplaintResponse(
                complaint.getId(),
                complaint.getUser().getId(),
                complaint.getUser().getName(),
                complaint.getUser().getEmail(),
                complaint.getUser().getRole(),
                complaint.getImageUrl(),
                complaint.getStreet(),
                complaint.getArea(),
                complaint.getCity(),
                complaint.getDescription(),
                complaint.getStatus(),
                complaint.getCreatedAt()
        );
    }

    private User getCurrentUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
    }
}

