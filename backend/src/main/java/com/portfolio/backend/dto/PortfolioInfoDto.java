package com.portfolio.backend.dto;
import lombok.Data;

@Data
public class PortfolioInfoDto {
    private Long id;
    private String name;
    private String title;
    private String shortIntro;
    private String description;
    private String email;
    private String linkedinUrl;
    private String githubUrl;
    private String photoUrl;
}
