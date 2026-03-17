package com.smartgarbage.complaint;

import com.smartgarbage.user.UserRole;

import java.time.Instant;

public class ComplaintResponse {

    private Long id;
    private Long userId;
    private String userName;
    private String userEmail;
    private UserRole userRole;
    private String imageUrl;
    private String street;
    private String area;
    private String city;
    private String description;
    private ComplaintStatus status;
    private Instant createdAt;

    public ComplaintResponse(Long id,
                             Long userId,
                             String userName,
                             String userEmail,
                             UserRole userRole,
                             String imageUrl,
                             String street,
                             String area,
                             String city,
                             String description,
                             ComplaintStatus status,
                             Instant createdAt) {
        this.id = id;
        this.userId = userId;
        this.userName = userName;
        this.userEmail = userEmail;
        this.userRole = userRole;
        this.imageUrl = imageUrl;
        this.street = street;
        this.area = area;
        this.city = city;
        this.description = description;
        this.status = status;
        this.createdAt = createdAt;
    }

    public Long getId() {
        return id;
    }

    public Long getUserId() {
        return userId;
    }

    public String getUserName() {
        return userName;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public UserRole getUserRole() {
        return userRole;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public String getStreet() {
        return street;
    }

    public String getArea() {
        return area;
    }

    public String getCity() {
        return city;
    }

    public String getDescription() {
        return description;
    }

    public ComplaintStatus getStatus() {
        return status;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }
}

