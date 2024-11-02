import { Task } from '@models/taskModel';
import dotenv from 'dotenv';
import { DataSource } from 'typeorm';

dotenv.config();

export const config = {
  nodeEnv: process.env.NODE_ENV,
  port: process.env.PORT ?? 3000,
  sessionSecret: process.env.SESSION_SECRET ?? 'secret',
  db: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT ?? '3306', 10),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  },
};

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: config.db.host,
  port: config.db.port,
  username: config.db.username,
  password: config.db.password,
  database: config.db.database,
  synchronize: true,
  logging: false,
  entities: [
    Task,
  ],
});
