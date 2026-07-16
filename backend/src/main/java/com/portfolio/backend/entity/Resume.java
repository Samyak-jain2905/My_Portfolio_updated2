package com.portfolio.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "resumes")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Resume {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "portfolio_id", nullable = false)
    @com.fasterxml.jackson.annotation.JsonIgnore
    private PortfolioInfo portfolioInfo;

    @Column(name = "resume_name", nullable = false, length = 100)
    private String resumeName;

    @Column(name = "resume_file_url", nullable = false)
    private String resumeFileUrl;

    @Column(name = "last_updated_date")
    private LocalDateTime lastUpdatedDate;

    @PrePersist
    @PreUpdate
    protected void onUpdate() {
        lastUpdatedDate = LocalDateTime.now();
    }
}
