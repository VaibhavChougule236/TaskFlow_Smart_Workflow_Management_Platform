package com.taskflow.service;

import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.taskflow.dto.DashboardResponse;
import com.taskflow.dto.UserResponse;
import com.taskflow.entity.User;
import com.taskflow.repository.TaskRepository;
import com.taskflow.repository.UserRepository;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final UserRepository userRepository;
    private final TaskRepository taskRepository;

    public Page<UserResponse> getAllUsers(
            int page,
            int size,
            String sortBy,
            String direction
    ) {

        Sort sort = direction.equalsIgnoreCase("desc")
                ? Sort.by(sortBy).descending()
                : Sort.by(sortBy).ascending();

        Pageable pageable = PageRequest.of(page, size, sort);

        Page<User> users = userRepository.findAll(pageable);

        return users.map(user -> UserResponse.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .role(user.getRole().name())
                .build());
    }

    public DashboardResponse getDashboardStats() {

        long totalUsers = userRepository.count();
        long totalTasks = taskRepository.count();

        long completedTasks = taskRepository.countByIsDone(true);
        long pendingTasks = taskRepository.countByIsDone(false);

        long overdueTasks =
                taskRepository.countByIsDoneFalseAndDueDateBefore(java.time.LocalDate.now());

        return DashboardResponse.builder()
                .totalUsers(totalUsers)
                .totalTasks(totalTasks)
                .completedTasks(completedTasks)
                .pendingTasks(pendingTasks)
                .overdueTasks(overdueTasks)
                .build();
    }

    
    public void deleteUser(Long userId) {

    	Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String loggedInEmail = auth.getName();

        User loggedInUser = userRepository.findByEmail(loggedInEmail)
                .orElseThrow(() -> new RuntimeException("Logged in user not found"));

        User userToDelete = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        
        if (loggedInUser.getId().equals(userToDelete.getId())) {
            throw new RuntimeException("Admin cannot delete their own account");
        }

        userRepository.delete(userToDelete);
    }
}