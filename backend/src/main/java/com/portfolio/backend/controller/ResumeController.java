package com.portfolio.backend.controller;
import com.portfolio.backend.entity.Resume;
import com.portfolio.backend.service.ResumeService;
import com.portfolio.backend.dto.ResumeDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/resume")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ResumeController {
    private final ResumeService service;

    @GetMapping
    public ResponseEntity<List<Resume>> getResumes() {
        return ResponseEntity.ok(service.getAllResumes());
    }

    @PostMapping
    public ResponseEntity<Resume> addResume(@RequestBody ResumeDto dto) {
        Resume resume = new Resume();
        resume.setResumeName(dto.getResumeName());
        resume.setResumeFileUrl(dto.getResumeFileUrl());
        return ResponseEntity.ok(service.addResume(resume, dto.getPortfolioId()));
    }

    @PostMapping("/upload")
    public ResponseEntity<Resume> uploadResume(
            @RequestParam("file") org.springframework.web.multipart.MultipartFile file,
            @RequestParam("portfolioId") Long portfolioId,
            @RequestParam("resumeName") String resumeName) {
        return ResponseEntity.ok(service.uploadResume(file, portfolioId, resumeName));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteResume(@PathVariable Long id) {
        service.deleteResume(id);
        return ResponseEntity.noContent().build();
    }
}
