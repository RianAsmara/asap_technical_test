import { taskController } from '@controllers/taskController';
import validateSchema from '@middlewares/validateSchema';
import { createTaskSchema, updateTaskSchema } from '@schemas/taskSchemas';
import { Router } from 'express';

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateTask:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - dueDate
 *         - status
 *       properties:
 *         title:
 *           type: string
 *           minLength: 1
 *           description: The title of the task
 *         description:
 *           type: string
 *           minLength: 3
 *           description: The description of the task
 *         dueDate:
 *           type: string
 *           format: date-time
 *           description: The due date of the task
 *         status:
 *           type: string
 *           enum: [pending, in_progress, completed]
 *           description: The status of the task
 *     UpdateTask:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           minLength: 1
 *           description: The title of the task
 *         description:
 *           type: string
 *           minLength: 3
 *           description: The description of the task
 *         dueDate:
 *           type: string
 *           format: date-time
 *           description: The due date of the task
 *         status:
 *           type: string
 *           enum: [pending, in_progress, completed]
 *           description: The status of the task
 */

const taskRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Task management operations
 */

/**
 * @swagger
 * /api/v1/tasks/{id}:
 *   get:
 *     summary: Get a task by ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the task to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task retrieved successfully
 *       404:
 *         description: Task not found
 */
taskRouter.get('/:id', taskController.getTask);

/**
 * @swagger
 * /api/v1/tasks:
 *   get:
 *     summary: Get all tasks
 *     tags: [Tasks]
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [pending, in_progress, completed]
 *         description: Filter tasks by status
 *       - in: query
 *         name: dueDate
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Filter tasks by due date
 *     responses:
 *       200:
 *         description: List of tasks
 */
taskRouter.get('/', taskController.getAllTasks);

/**
 * @swagger
 * /api/v1/tasks:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateTask'
 *     responses:
 *       201:
 *         description: Task created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The ID of the created task
 *                 title:
 *                   type: string
 *                   description: The title of the task
 *                 description:
 *                   type: string
 *                   description: The description of the task
 *       400:
 *         description: Invalid input
 * 
 * /api/v1/tasks/{id}:
 *   put:
 *     summary: Update a task by ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the task to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateTask'
 *     responses:
 *       200:
 *         description: Task updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The ID of the updated task
 *                 title:
 *                   type: string
 *                   description: The updated title of the task
 *                 description:
 *                   type: string
 *                   description: The updated description of the task
 *       404:
 *         description: Task not found
 *       400:
 *         description: Invalid input
 */
taskRouter.post('/', validateSchema(createTaskSchema), taskController.createTask);

/**
 * @swagger
 * /api/v1/tasks/{id}:
 *   put:
 *     summary: Update a task by ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the task to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateTask'
 *     responses:
 *       200:
 *         description: Task updated successfully
 *       404:
 *         description: Task not found
 *       400:
 *         description: Invalid input
 */
taskRouter.put('/:id', validateSchema(updateTaskSchema), taskController.updateTask);

/**
 * @swagger
 * /api/v1/tasks/{id}:
 *   delete:
 *     summary: Delete a task by ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the task to delete
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Task deleted successfully
 *       404:
 *         description: Task not found
 */
taskRouter.delete('/:id', taskController.deleteTask);

export default taskRouter;
