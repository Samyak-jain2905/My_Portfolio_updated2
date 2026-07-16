package com.portfolio.backend.service;

import com.portfolio.backend.entity.Certificate;
import com.portfolio.backend.entity.PortfolioInfo;
import com.portfolio.backend.repository.CertificateRepository;
import com.portfolio.backend.repository.PortfolioInfoRepository;
import com.portfolio.backend.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CertificateService {
    private final CertificateRepository repository;
    private final PortfolioInfoRepository portfolioInfoRepository;

    public List<Certificate> getAllCertificates() {
        return repository.findAll();
    }

    public Certificate addCertificate(Certificate certificate, Long portfolioId) {
        PortfolioInfo info = portfolioInfoRepository.findById(portfolioId)
            .orElseThrow(() -> new ResourceNotFoundException("Portfolio not found"));
        certificate.setPortfolioInfo(info);
        return repository.save(certificate);
    }

    public void deleteCertificate(Long id) {
        if (!repository.existsById(id)) {
            throw new ResourceNotFoundException("Certificate not found with id: " + id);
        }
        repository.deleteById(id);
    }
}
