import { z } from 'zod';

// password must contain at least one uppercase letter, one lowercase letter, one number, and one special character
const passMatch = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+/;

export const createTaskSchema = z
  .object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(3),
    dueDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
    status: z.enum(['pending', 'in_progress', 'completed']).default('pending'),
  })
  .strict();

export const updateTaskSchema = z
  .object({
    title: z.string().min(1).optional(),
    description: z.string().min(3).optional(),
    dueDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format").optional(),
    status: z.enum(['pending', 'in_progress', 'completed']).optional(),
  })
  .strict();
