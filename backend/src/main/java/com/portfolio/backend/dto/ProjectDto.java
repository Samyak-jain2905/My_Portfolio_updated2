package com.portfolio.backend.dto;
import lombok.Data;

@Data
public class ProjectDto {
    private Long id;
    private Long portfolioId;
    private String projectName;
    private String description;
    private String technologiesUsed;
    private String githubLink;
    private String liveDemoLink;
    private String thumbnailImageUrl;
}
