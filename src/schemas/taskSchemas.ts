import { z } from 'zod';

// password must contain at least one uppercase letter, one lowercase letter, one number, and one special character
const passMatch = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+/;

export const createTaskSchema = z
  .object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(3),
    dueDate: z.string().datetime(),
    status: z.enum(['pending', 'in_progress', 'completed']),
  })
  .strict();

export const updateTaskSchema = z
  .object({
    title: z.string().min(1).optional(),
    description: z.string().min(3).optional(),
    dueDate: z.string().datetime().optional(),
    status: z.enum(['pending', 'in_progress', 'completed']).optional(),
  })
  .strict();
