package com.portfolio.backend.controller;

import com.portfolio.backend.dto.ChangePasswordRequest;
import com.portfolio.backend.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class UserController {

    private final AuthenticationService authenticationService;

    @PostMapping("/change-password")
    public ResponseEntity<Void> changePassword(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestBody ChangePasswordRequest request
    ) {
        authenticationService.changePassword(
                userDetails.getUsername(),
                request.getCurrentPassword(),
                request.getNewPassword()
        );
        return ResponseEntity.ok().build();
    }
}
