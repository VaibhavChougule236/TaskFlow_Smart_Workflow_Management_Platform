package com.taskflow.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import com.taskflow.entity.Task;
import com.taskflow.repository.TaskRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;

    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }
}