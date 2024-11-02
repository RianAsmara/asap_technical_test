import { responseWithError } from '@commons/error';
import { taskService } from '@services/taskService';
import { Request, Response } from 'express';

class TaskController {
  async getTask(req: Request, res: Response) {
    try {
      const task = await taskService.getTaskById(req.params.id);
      if (task) {
        res.json({ success: true, message: 'Task fetched successfully', data: task });
      } else {
        responseWithError(res, 'Task not found');
      }
    } catch (err) {
      responseWithError(res, err);
    }
  }

  async getAllTasks(req: Request, res: Response) {
    try {
      const { status, dueDate } = req.query;
      const tasks = await taskService.getAllTasks(
        status as string | undefined,
        dueDate ? new Date(dueDate as string) : undefined
      );
      res.json({ success: true, message: 'Tasks fetched successfully', data: tasks });
    } catch (err) {
      responseWithError(res, err);
    }
  }

  async createTask(req: Request, res: Response) {
    try {
      const task = await taskService.createTask(req.body);
      res.status(201).json({ success: true, message: 'Task created successfully', data: task });
    } catch (err) {
      responseWithError(res, err);
    }
  }

  async updateTask(req: Request, res: Response) {
    try {
      const task = await taskService.updateTask(req.params.id, req.body);
      if (task) {
        res.json({ success: true, message: 'Task updated successfully', data: task });
      } else {
        responseWithError(res, 'Task not found');
      }
    } catch (err) {
      console.info(err);

      responseWithError(res, err);
    }
  }

  async deleteTask(req: Request, res: Response) {
    try {
      const success = await taskService.deleteTask(req.params.id);
      if (success) {
        res.status(204).json({ success: true, message: 'Task deleted successfully' });
      } else {
        responseWithError(res, 'Task not found');
      }
    } catch (err) {
      console.error(err)
      responseWithError(res, err);
    }
  }
}

export const taskController = new TaskController();
