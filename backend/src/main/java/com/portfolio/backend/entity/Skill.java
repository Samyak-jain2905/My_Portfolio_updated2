package com.portfolio.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "skills")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Skill {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "portfolio_id", nullable = false)
    @com.fasterxml.jackson.annotation.JsonIgnore
    private PortfolioInfo portfolioInfo;

    @Column(name = "skill_name", nullable = false, length = 100)
    private String skillName;

    @Column(length = 100)
    private String category;
}
