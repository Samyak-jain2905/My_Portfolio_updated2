package com.portfolio.backend.dto;
import lombok.Data;

@Data
public class SkillDto {
    private Long id;
    private Long portfolioId;
    private String skillName;
    private String category;
}
