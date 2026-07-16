package com.portfolio.backend.service;
import com.portfolio.backend.entity.PortfolioInfo;
import com.portfolio.backend.repository.PortfolioInfoRepository;
import com.portfolio.backend.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PortfolioInfoService {
    private final PortfolioInfoRepository repository;

    public PortfolioInfo getPortfolio() {
        List<PortfolioInfo> list = repository.findAll();
        if (list.isEmpty()) {
            PortfolioInfo defaultInfo = new PortfolioInfo();
            defaultInfo.setName("loading");
            defaultInfo.setTitle("Loading");
            defaultInfo.setShortIntro("Welcome to my portfolio");
            defaultInfo.setDescription("Loading.");
            defaultInfo.setEmail("Loading");
            return repository.save(defaultInfo);
        }
        return list.get(0);
    }

    public PortfolioInfo updatePortfolio(PortfolioInfo info) {
        List<PortfolioInfo> list = repository.findAll();
        PortfolioInfo existing = list.isEmpty() ? new PortfolioInfo() : list.get(0);
        
        existing.setName(info.getName());
        existing.setTitle(info.getTitle());
        existing.setShortIntro(info.getShortIntro());
        existing.setDescription(info.getDescription());
        existing.setEmail(info.getEmail());
        existing.setLinkedinUrl(info.getLinkedinUrl());
        existing.setGithubUrl(info.getGithubUrl());
        if (info.getPhotoUrl() != null) {
            existing.setPhotoUrl(info.getPhotoUrl());
        }
        
        return repository.save(existing);
    }
}
