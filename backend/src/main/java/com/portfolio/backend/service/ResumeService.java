package com.portfolio.backend.service;
import com.portfolio.backend.entity.Resume;
import com.portfolio.backend.entity.PortfolioInfo;
import com.portfolio.backend.repository.ResumeRepository;
import com.portfolio.backend.repository.PortfolioInfoRepository;
import com.portfolio.backend.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ResumeService {
    private final ResumeRepository repository;
    private final PortfolioInfoRepository portfolioInfoRepository;

    public List<Resume> getAllResumes() {
        return repository.findAll();
    }

    public Resume addResume(Resume resume, Long portfolioId) {
        List<PortfolioInfo> list = portfolioInfoRepository.findAll();
        if (list.isEmpty()) {
            throw new ResourceNotFoundException("Portfolio not found. Please update portfolio info first.");
        }
        resume.setPortfolioInfo(list.get(0));
        return repository.save(resume);
    }

    public Resume uploadResume(org.springframework.web.multipart.MultipartFile file, Long portfolioId, String resumeName) {
        PortfolioInfo info = portfolioInfoRepository.findById(portfolioId)
            .orElseThrow(() -> new ResourceNotFoundException("Portfolio not found"));
        
        try {
            String uploadDir = "uploads/";
            java.io.File directory = new java.io.File(uploadDir);
            if (!directory.exists()) {
                directory.mkdirs();
            }
            
            String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            java.nio.file.Path filePath = java.nio.file.Paths.get(uploadDir + fileName);
            java.nio.file.Files.copy(file.getInputStream(), filePath, java.nio.file.StandardCopyOption.REPLACE_EXISTING);
            
            String fileUrl = org.springframework.web.servlet.support.ServletUriComponentsBuilder.fromCurrentContextPath()
                    .path("/uploads/")
                    .path(fileName)
                    .toUriString();
            
            Resume resume = new Resume();
            resume.setResumeName(resumeName);
            resume.setResumeFileUrl(fileUrl);
            resume.setPortfolioInfo(info);
            
            return repository.save(resume);
        } catch (java.io.IOException e) {
            throw new RuntimeException("Could not store file", e);
        }
    }

    public void deleteResume(Long id) {
        Resume existing = repository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Resume not found with id " + id));
        repository.delete(existing);
    }
}
