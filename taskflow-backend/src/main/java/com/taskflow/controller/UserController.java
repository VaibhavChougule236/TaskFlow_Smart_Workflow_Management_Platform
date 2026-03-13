package com.taskflow.controller;

import java.io.IOException;
import java.nio.file.*;
import java.util.Map;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.taskflow.dto.ApiResponse;
import com.taskflow.dto.UserProfileDto;
import com.taskflow.entity.User;
import com.taskflow.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    
    private final String UPLOAD_DIR = "uploads/profiles/";

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<UserProfileDto>> getCurrentUser(Authentication authentication) {
        String email = authentication.getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        UserProfileDto userDto = convertToDto(user);

        return ResponseEntity.ok(new ApiResponse<>(true, "User fetched successfully", userDto));
    }

    @PutMapping("/update-profile")
    public ResponseEntity<ApiResponse<UserProfileDto>> updateProfile(
            Authentication authentication,
            @RequestParam(value = "name", required = false) String name,
            @RequestParam(value = "image", required = false) MultipartFile image
    ) throws IOException {
        String email = authentication.getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (name != null && !name.isEmpty()) {
            user.setName(name);
        }

        if (image != null && !image.isEmpty()) {
           
            Path uploadPath = Paths.get(UPLOAD_DIR);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            String fileName = UUID.randomUUID().toString() + "_" + image.getOriginalFilename();
            Path filePath = uploadPath.resolve(fileName);
            
            Files.copy(image.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            user.setImagePath("/" + UPLOAD_DIR + fileName); 
        }

        userRepository.save(user);
        return ResponseEntity.ok(new ApiResponse<>(true, "Profile updated successfully", convertToDto(user)));
    }

    @PostMapping("/change-password")
    public ResponseEntity<ApiResponse<String>> changePassword(
            Authentication authentication,
            @RequestBody Map<String, String> body
    ) {
        String email = authentication.getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        String oldPassword = body.get("oldPassword");
        String newPassword = body.get("newPassword");

        if (oldPassword == null || newPassword == null) {
            throw new RuntimeException("Both old and new passwords are required");
        }

        if (!passwordEncoder.matches(oldPassword, user.getPassword())) {
            return ResponseEntity.badRequest().body(new ApiResponse<>(false, "Old password incorrect", null));
        }

        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);

        return ResponseEntity.ok(new ApiResponse<>(true, "Password changed successfully", "Success"));
    }

    private UserProfileDto convertToDto(User user) {
        return new UserProfileDto(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole(),
                user.getImagePath(),
                user.getCreatedAt() 
        );
    }
}