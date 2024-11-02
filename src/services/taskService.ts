import { Task } from '@models/taskModel';
import { taskRepository } from '@repositories/taskRepository';

class TaskService {
  async getTaskById(id: string): Promise<Task | null> {
    return await taskRepository.findById(id);
  }

  async getAllTasks(status?: string, dueDate?: Date): Promise<Task[]> {
    return await taskRepository.findAll(status, dueDate);
  }

  async createTask(taskData: Partial<Task>): Promise<Task> {
    return await taskRepository.create(taskData);
  }

  async updateTask(id: string, taskData: Partial<Task>): Promise<Task | null> {
    return await taskRepository.update(id, taskData);
  }

  async deleteTask(id: string): Promise<boolean> {
    return await taskRepository.delete(id);
  }
}

export const taskService = new TaskService();
