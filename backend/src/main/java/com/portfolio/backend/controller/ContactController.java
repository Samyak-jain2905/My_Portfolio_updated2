package com.portfolio.backend.controller;

import com.portfolio.backend.dto.ContactMessageDto;
import com.portfolio.backend.entity.ContactMessage;
import com.portfolio.backend.service.ContactMessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contact")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ContactController {
    private final ContactMessageService service;

    @PostMapping
    public ResponseEntity<ContactMessage> submitContactForm(@RequestBody ContactMessageDto dto) {
        return ResponseEntity.ok(service.saveMessage(dto));
    }

    @GetMapping
    public ResponseEntity<List<ContactMessage>> getMessages() {
        return ResponseEntity.ok(service.getAllMessages());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMessage(@PathVariable java.lang.Long id) {
        service.deleteMessage(id);
        return ResponseEntity.noContent().build();
    }
}
