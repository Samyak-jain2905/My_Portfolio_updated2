package com.portfolio.backend.controller;
import com.portfolio.backend.entity.Project;
import com.portfolio.backend.service.ProjectService;
import com.portfolio.backend.dto.ProjectDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/projects")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ProjectController {
    private final ProjectService service;

    @GetMapping
    public ResponseEntity<List<Project>> getAllProjects() {
        return ResponseEntity.ok(service.getAllProjects());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Project> getProjectById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getProjectById(id));
    }

    @PostMapping
    public ResponseEntity<Project> addProject(@RequestBody ProjectDto dto) {
        Project project = new Project();
        project.setProjectName(dto.getProjectName());
        project.setDescription(dto.getDescription());
        project.setTechnologiesUsed(dto.getTechnologiesUsed());
        project.setGithubLink(dto.getGithubLink());
        project.setLiveDemoLink(dto.getLiveDemoLink());
        project.setThumbnailImageUrl(dto.getThumbnailImageUrl());
        return ResponseEntity.ok(service.addProject(project, dto.getPortfolioId()));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Project> updateProject(@PathVariable Long id, @RequestBody ProjectDto dto) {
        Project project = new Project();
        project.setProjectName(dto.getProjectName());
        project.setDescription(dto.getDescription());
        project.setTechnologiesUsed(dto.getTechnologiesUsed());
        project.setGithubLink(dto.getGithubLink());
        project.setLiveDemoLink(dto.getLiveDemoLink());
        project.setThumbnailImageUrl(dto.getThumbnailImageUrl());
        return ResponseEntity.ok(service.updateProject(id, project));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProject(@PathVariable Long id) {
        service.deleteProject(id);
        return ResponseEntity.noContent().build();
    }
}
