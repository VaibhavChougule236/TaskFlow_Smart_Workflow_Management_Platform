package com.taskflow.controller;

import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.taskflow.dto.TaskRequest;
import com.taskflow.entity.Task;
import com.taskflow.service.TaskService;

import jakarta.validation.Valid;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@RequiredArgsConstructor
@CrossOrigin
public class TaskController {

    private final TaskService taskService;

    @GetMapping
    public List<Task> getAllTasks() {
        return taskService.getAllTasks();
    }
    
    @PostMapping
    public ResponseEntity<Task> createTask(@Valid @RequestBody TaskRequest request) {

        Task savedTask = taskService.createTask(request);

        return ResponseEntity.status(HttpStatus.CREATED).body(savedTask);
    }
    
    @PatchMapping("/{id}/done")
    public ResponseEntity<Task> updateTaskStatus(@PathVariable Long id) {

        Task updatedTask = taskService.updateTaskStatus(id);

        return ResponseEntity.ok(updatedTask);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTask(@PathVariable Long id) {

        taskService.deleteTask(id);

        return ResponseEntity.ok("Task deleted successfully");
    }
    
    @GetMapping("/filter")
    public ResponseEntity<List<Task>> getTasks(
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String category
    ) {

        List<Task> tasks = taskService.getTasksByStatusAndCategory(status, category);

        return ResponseEntity.ok(tasks);
    }
}