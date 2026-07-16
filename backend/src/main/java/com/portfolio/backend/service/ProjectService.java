package com.portfolio.backend.service;
import com.portfolio.backend.entity.Project;
import com.portfolio.backend.entity.PortfolioInfo;
import com.portfolio.backend.repository.ProjectRepository;
import com.portfolio.backend.repository.PortfolioInfoRepository;
import com.portfolio.backend.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProjectService {
    private final ProjectRepository repository;
    private final PortfolioInfoRepository portfolioInfoRepository;

    public List<Project> getAllProjects() {
        return repository.findAll();
    }

    public Project getProjectById(Long id) {
        return repository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Project not found with id " + id));
    }

    public Project addProject(Project project, Long portfolioId) {
        List<PortfolioInfo> list = portfolioInfoRepository.findAll();
        if (list.isEmpty()) {
            throw new ResourceNotFoundException("Portfolio not found. Please update portfolio info first.");
        }
        project.setPortfolioInfo(list.get(0));
        return repository.save(project);
    }

    public Project updateProject(Long id, Project updatedProject) {
        Project existing = getProjectById(id);
        existing.setProjectName(updatedProject.getProjectName());
        existing.setDescription(updatedProject.getDescription());
        existing.setTechnologiesUsed(updatedProject.getTechnologiesUsed());
        existing.setGithubLink(updatedProject.getGithubLink());
        existing.setLiveDemoLink(updatedProject.getLiveDemoLink());
        existing.setThumbnailImageUrl(updatedProject.getThumbnailImageUrl());
        return repository.save(existing);
    }

    public void deleteProject(Long id) {
        Project existing = getProjectById(id);
        repository.delete(existing);
    }
}
