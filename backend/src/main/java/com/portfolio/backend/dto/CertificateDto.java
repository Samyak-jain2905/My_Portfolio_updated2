package com.portfolio.backend.dto;

import lombok.Data;

@Data
public class CertificateDto {
    private Long id;
    private Long portfolioId;
    private String title;
    private String fileUrl;
}
