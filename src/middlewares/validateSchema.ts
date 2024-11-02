import { NextFunction, Request, Response } from 'express';
import { ZodError, ZodSchema } from 'zod';

const validateSchema = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        res.status(400).json({
          errors: err.errors,
        });
      } else {
        res.status(500).json({
          message: 'Internal server error',
        });
      }
    }
  };
};

export default validateSchema;
