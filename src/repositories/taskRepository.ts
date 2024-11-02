import { CustomError } from '@commons/error';
import { AppDataSource } from '@config/index';
import { Task } from '@models/taskModel';
import { QueryFailedError } from 'typeorm';

class TaskRepository {
  private readonly taskRepo;

  constructor() {
    this.taskRepo = AppDataSource.getRepository(Task);
  }

  async findById(id: string): Promise<Task | null> {
    return await this.taskRepo.findOne({ where: { id } });
  }

  async findAll(status?: string, dueDate?: Date): Promise<Task[]> {
    const query = this.taskRepo.createQueryBuilder('task');
    if (status) query.andWhere('task.status = :status', { status });
    if (dueDate) query.andWhere('task.dueDate = :dueDate', { dueDate });
    return await query.getMany();
  }

  async create(taskData: Partial<Task>): Promise<Task> {
    try {
      const task = this.taskRepo.create(taskData);
      await this.taskRepo.save(task);
      return task;
    } catch (err) {
      if (err instanceof QueryFailedError) throw new CustomError(err.name, err.message);
      throw err;
    }
  }

  async update(id: string, taskData: Partial<Task>): Promise<Task | null> {
    try {
      await this.taskRepo.update(id, taskData);
      return await this.findById(id);
    } catch (err) {
      console.info(err);
      if (err instanceof QueryFailedError) throw new CustomError(err.name, err.message);
      throw err;
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      const task = await this.findById(id);
      if (task) {
        await this.taskRepo.remove(task);
        return true;
      }
      return false;
    } catch (err) {
      console.error(err);
      if (err instanceof QueryFailedError) throw new CustomError(err.name, err.message);
      throw err
    }
  }
}

export const taskRepository = new TaskRepository();
