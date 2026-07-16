package com.portfolio.backend.controller;

import com.portfolio.backend.entity.Certificate;
import com.portfolio.backend.service.CertificateService;
import com.portfolio.backend.dto.CertificateDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/certificates")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class CertificateController {
    private final CertificateService service;

    @GetMapping
    public ResponseEntity<List<Certificate>> getCertificates() {
        return ResponseEntity.ok(service.getAllCertificates());
    }

    @PostMapping
    public ResponseEntity<Certificate> addCertificate(@RequestBody CertificateDto dto) {
        Certificate certificate = new Certificate();
        certificate.setTitle(dto.getTitle());
        certificate.setFileUrl(dto.getFileUrl());
        return ResponseEntity.ok(service.addCertificate(certificate, dto.getPortfolioId()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCertificate(@PathVariable Long id) {
        service.deleteCertificate(id);
        return ResponseEntity.noContent().build();
    }
}
