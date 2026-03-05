package com.taskflow.service;

import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.taskflow.dto.TaskRequest;
import com.taskflow.dto.TaskResponse;
import com.taskflow.entity.Task;
import com.taskflow.exception.TaskException;
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
	
	public Page<TaskResponse> getTasks(int page, int size){
		Pageable pageable = PageRequest.of(page, size);
		Page<Task> task=taskRepository.findAll(pageable);
		return task.map(this::mapToTaskResponse);
	}

	public Task createTask(TaskRequest request) {

		if (request.getTitle() == null || request.getTitle().trim().isEmpty()) {
			throw new TaskException("Task title cannot be empty");
		}

		Task task = Task.builder().title(request.getTitle()).description(request.getDescription())
				.category(request.getCategory().toLowerCase()).priority(request.getPriority().toLowerCase())
				.dueDate(request.getDueDate()).isDone(false).build();

		return taskRepository.save(task);
	}

	public Task updateTaskStatus(Long id) {

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
				return taskRepository.findByIsDoneFalseAndDueDateBefore(LocalDate.now());

			default:
				throw new TaskException("Invalid status filter");
			}
		}

		if (category != null) {
			return taskRepository.findByCategory(category.toLowerCase());
		}

		return taskRepository.findAll();
	}

	public TaskResponse updateTask(Long id, TaskRequest request) {

		Task task = taskRepository.findById(id)
				.orElseThrow(() -> new TaskNotFoundException("Task not found with id: " + id));

		if (request.getTitle() == null || request.getTitle().trim().isEmpty()) {
			throw new TaskException("Task title cannot be empty");
		}

		task.setTitle(request.getTitle());
		task.setDescription(request.getDescription());
		task.setCategory(request.getCategory());
		task.setPriority(request.getPriority());
		task.setDueDate(request.getDueDate());

		Task updatedTask = taskRepository.save(task);

		return mapToTaskResponse(updatedTask);
	}
	
	public Page<TaskResponse> getSortedTasks(int page, int size, String sortBy, String dir) {
		
		if(dir.equalsIgnoreCase("asc")) {
			Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy).ascending());
			Page<Task> task = taskRepository.findAll(pageable);
			return task.map(this::mapToTaskResponse);
		} else if (dir.equalsIgnoreCase("desc")) {
			Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy).descending());
			Page<Task> task = taskRepository.findAll(pageable);
			return task.map(this::mapToTaskResponse);
		} else {
			throw new TaskException("Invalid sort direction");
		}
		
	}
	
	public Page<TaskResponse> searchTasks(String keyword, int page, int size) {

	    Pageable pageable = PageRequest.of(page, size);

	    Page<Task> taskPage =
	            taskRepository.findByTitleContainingIgnoreCase(keyword, pageable);

	    return taskPage.map(this::mapToTaskResponse);
	}
	
	private TaskResponse mapToTaskResponse(Task task) {
	    return TaskResponse.builder()
	            .id(task.getId())
	            .title(task.getTitle())
	            .description(task.getDescription())
	            .category(task.getCategory())
	            .priority(task.getPriority())
	            .dueDate(task.getDueDate())
	            .isDone(task.isDone())
	            .build();
	}

	
}