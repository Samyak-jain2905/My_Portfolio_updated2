package com.portfolio.backend.dto;

import lombok.Data;

@Data
public class ContactMessageDto {
    private String name;
    private String email;
    private String subject;
    private String message;
}
