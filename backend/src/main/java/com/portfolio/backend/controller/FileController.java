package com.portfolio.backend.controller;

import com.portfolio.backend.entity.FileEntity;
import com.portfolio.backend.repository.FileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/uploads")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class FileController {

    private final FileRepository fileRepository;

    @GetMapping("/{fileName}")
    public ResponseEntity<byte[]> getFile(@PathVariable String fileName) {
        Optional<FileEntity> fileEntityOptional = fileRepository.findById(fileName);

        if (fileEntityOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        FileEntity fileEntity = fileEntityOptional.get();

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_TYPE, fileEntity.getFileType() != null ? fileEntity.getFileType() : MediaType.APPLICATION_OCTET_STREAM_VALUE)
                .body(fileEntity.getData());
    }
}
