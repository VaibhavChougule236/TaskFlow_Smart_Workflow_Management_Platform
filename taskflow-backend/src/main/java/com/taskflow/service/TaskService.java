package com.taskflow.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import com.taskflow.dto.TaskRequest;
import com.taskflow.entity.Task;
import com.taskflow.exception.AddTaskException;
import com.taskflow.exception.TaskNotFoundException;
import com.taskflow.repository.TaskRepository;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;

    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }
    
    public Task createTask(TaskRequest request) {
    	
    	if (request.getTitle() == null || request.getTitle().trim().isEmpty()) {
            throw new AddTaskException("Task title cannot be empty");
        }

        Task task = Task.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .category(request.getCategory().toLowerCase())
                .priority(request.getPriority().toLowerCase())
                .dueDate(request.getDueDate())
                .isDone(false)
                .build();

        return taskRepository.save(task);
    }
    
    public Task toggleTaskById(Long id) {

        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new TaskNotFoundException("Task not found with id: " + id));

        task.setDone(!task.isDone());

        return taskRepository.save(task);
    }
    
    public void deleteTask(Long id) {

        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new TaskNotFoundException("Task not found with id: " + id));

        taskRepository.delete(task);
    }
    
    public List<Task> getTasksByStatusAndCategory(String status, String category) {

        if (status != null) {

            switch (status.toLowerCase()) {

                case "completed":
                    return taskRepository.findByIsDone(true);

                case "pending":
                    return taskRepository.findByIsDone(false);

                case "overdue":
                    return taskRepository
                            .findByIsDoneFalseAndDueDateBefore(LocalDate.now());

                default:
                    throw new AddTaskException("Invalid status filter");
            }
        }

        if (category != null) {
            return taskRepository.findByCategory(category.toLowerCase());
        }

        return taskRepository.findAll();
    }
}