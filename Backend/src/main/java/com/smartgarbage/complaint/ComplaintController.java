package com.smartgarbage.complaint;

import jakarta.validation.Valid;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api")
public class ComplaintController {

    private final ComplaintService complaintService;

    public ComplaintController(ComplaintService complaintService) {
        this.complaintService = complaintService;
    }

    @PostMapping(value = "/complaints", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ComplaintResponse> createComplaint(
            @Valid @RequestParam("street") String street,
            @Valid @RequestParam("area") String area,
            @Valid @RequestParam("city") String city,
            @Valid @RequestParam("description") String description,
            @RequestParam("image") MultipartFile imageFile
    ) throws IOException {
        ComplaintRequest request = new ComplaintRequest();
        request.setStreet(street);
        request.setArea(area);
        request.setCity(city);
        request.setDescription(description);

        ComplaintResponse response = complaintService.createComplaint(request, imageFile);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/complaints/mine")
    public ResponseEntity<List<ComplaintResponse>> getMyComplaints() {
        return ResponseEntity.ok(complaintService.getMyComplaints());
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/admin/complaints")
    public ResponseEntity<List<ComplaintResponse>> getAllComplaints() {
        return ResponseEntity.ok(complaintService.getAllComplaints());
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/admin/dashboard")
    public ResponseEntity<DashboardStatsResponse> getAdminDashboard() {
        return ResponseEntity.ok(complaintService.getDashboardStats());
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PatchMapping("/admin/complaints/{id}/status")
    public ResponseEntity<ComplaintResponse> updateStatus(
            @PathVariable Long id,
            @RequestBody ComplaintStatus status
    ) {
        return ResponseEntity.ok(complaintService.updateStatus(id, status));
    }
}

