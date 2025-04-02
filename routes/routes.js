import express from 'express';
const router = express.Router();
import { deleteTaskById, getAllTasks, home, postAddTask } from "../controllers/controller.js"

router.get('/', home);

router.get('/tasks', getAllTasks);

router.post('/tasks', postAddTask);

router.delete("/delete-task/:id", deleteTaskById);

export default router;