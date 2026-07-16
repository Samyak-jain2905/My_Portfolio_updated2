package com.portfolio.backend.dto;
import lombok.Data;

@Data
public class ResumeDto {
    private Long id;
    private Long portfolioId;
    private String resumeName;
    private String resumeFileUrl;
}
