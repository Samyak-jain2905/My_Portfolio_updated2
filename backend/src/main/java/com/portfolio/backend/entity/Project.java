package com.portfolio.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "projects")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "portfolio_id", nullable = false)
    @com.fasterxml.jackson.annotation.JsonIgnore
    private PortfolioInfo portfolioInfo;

    @Column(name = "project_name", nullable = false, length = 150)
    private String projectName;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "technologies_used")
    private String technologiesUsed;

    @Column(name = "github_link")
    private String githubLink;

    @Column(name = "live_demo_link")
    private String liveDemoLink;

    @Column(name = "thumbnail_image_url")
    private String thumbnailImageUrl;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
