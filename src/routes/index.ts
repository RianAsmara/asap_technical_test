import { Router } from 'express';
import taskRouter from './taskRoutes';
const routes = Router();

routes.use('/tasks', taskRouter);

export default routes;
