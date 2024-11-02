import { config } from '@config/index';
import createLogger from './logger';
import { Response } from 'express';

export class CustomError implements Error {
  name: string;
  message: string;
  listMessage?: Array<string>;
  stack?: string;

  constructor(name: string, message: string, stack?: string) {
    this.name = name;
    this.stack = stack;
    this.message = message;
  }
}

export function errorHandler(err: unknown) {
  createLogger().error(err);
  if (config.nodeEnv === 'development') {
    console.log(err);
  }
}

export function responseWithError(res: Response, err: unknown, customErrorCode: number = 400) {
  if (err instanceof CustomError) {
    return res.status(customErrorCode).json({
      error: err.name,
      message: err.message,
    });
  } else {
    errorHandler(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
