package com.portfolio.backend.service;

import com.portfolio.backend.entity.FileEntity;
import com.portfolio.backend.repository.FileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class FileStorageService {

    private final FileRepository fileRepository;

    public String storeFile(MultipartFile file) {
        try {
            String originalFileName = file.getOriginalFilename();
            String fileExtension = "";
            if (originalFileName != null && originalFileName.contains(".")) {
                fileExtension = originalFileName.substring(originalFileName.lastIndexOf("."));
            }
            String fileName = UUID.randomUUID().toString() + fileExtension;
            
            FileEntity fileEntity = FileEntity.builder()
                    .fileName(fileName)
                    .fileType(file.getContentType())
                    .data(file.getBytes())
                    .build();
            
            fileRepository.save(fileEntity);

            return "/uploads/" + fileName;
        } catch (IOException ex) {
            throw new RuntimeException("Could not store file in database. Please try again!", ex);
        }
    }
}
