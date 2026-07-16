package com.portfolio.backend.controller;
import com.portfolio.backend.entity.PortfolioInfo;
import com.portfolio.backend.service.PortfolioInfoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/portfolio")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class PortfolioController {
    private final PortfolioInfoService service;

    @GetMapping
    public ResponseEntity<PortfolioInfo> getPortfolio() {
        return ResponseEntity.ok(service.getPortfolio());
    }

    @PutMapping
    public ResponseEntity<PortfolioInfo> updatePortfolio(@RequestBody PortfolioInfo info) {
        return ResponseEntity.ok(service.updatePortfolio(info));
    }
}
