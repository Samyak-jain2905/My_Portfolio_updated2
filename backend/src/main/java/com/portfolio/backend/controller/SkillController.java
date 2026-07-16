package com.portfolio.backend.controller;
import com.portfolio.backend.entity.Skill;
import com.portfolio.backend.service.SkillService;
import com.portfolio.backend.dto.SkillDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/skills")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class SkillController {
    private final SkillService service;

    @GetMapping
    public ResponseEntity<List<Skill>> getSkills() {
        return ResponseEntity.ok(service.getAllSkills());
    }

    @PostMapping
    public ResponseEntity<Skill> addSkill(@RequestBody SkillDto dto) {
        Skill skill = new Skill();
        skill.setSkillName(dto.getSkillName());
        skill.setCategory(dto.getCategory());
        return ResponseEntity.ok(service.addSkill(skill, dto.getPortfolioId()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSkill(@PathVariable Long id) {
        service.deleteSkill(id);
        return ResponseEntity.noContent().build();
    }
}
