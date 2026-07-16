package com.portfolio.backend.service;

import com.portfolio.backend.dto.ContactMessageDto;
import com.portfolio.backend.entity.ContactMessage;
import com.portfolio.backend.repository.ContactMessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ContactMessageService {
    private final ContactMessageRepository repository;

    public ContactMessage saveMessage(ContactMessageDto dto) {
        ContactMessage message = ContactMessage.builder()
                .name(dto.getName())
                .email(dto.getEmail())
                .subject(dto.getSubject())
                .message(dto.getMessage())
                .build();
        return repository.save(message);
    }

    public List<ContactMessage> getAllMessages() {
        return repository.findAll();
    }

    public void deleteMessage(Long id) {
        repository.deleteById(id);
    }
}
