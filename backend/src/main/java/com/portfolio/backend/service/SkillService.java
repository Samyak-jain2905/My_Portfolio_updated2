package com.portfolio.backend.service;
import com.portfolio.backend.entity.Skill;
import com.portfolio.backend.entity.PortfolioInfo;
import com.portfolio.backend.repository.SkillRepository;
import com.portfolio.backend.repository.PortfolioInfoRepository;
import com.portfolio.backend.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SkillService {
    private final SkillRepository repository;
    private final PortfolioInfoRepository portfolioInfoRepository;

    public List<Skill> getAllSkills() {
        return repository.findAll();
    }

    public Skill addSkill(Skill skill, Long portfolioId) {
        PortfolioInfo info = portfolioInfoRepository.findById(portfolioId)
            .orElseThrow(() -> new ResourceNotFoundException("Portfolio not found"));
        skill.setPortfolioInfo(info);
        return repository.save(skill);
    }

    public void deleteSkill(Long id) {
        if (!repository.existsById(id)) {
            throw new ResourceNotFoundException("Skill not found with id: " + id);
        }
        repository.deleteById(id);
    }
}
