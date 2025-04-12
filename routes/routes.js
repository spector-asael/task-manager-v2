// filename: ./routes/routes.js

import express from 'express';
const router = express.Router();
import { deleteTaskById, getAllTasks, home, postAddTask, completeTaskById, uncompleteTaskById } from "../controllers/controller.js"

router.get('/', home);

router.get('/tasks', getAllTasks); // for testing

router.post('/tasks', postAddTask);

router.delete("/delete-task/:id", deleteTaskById);

router.patch("/complete-task/:id", completeTaskById);

router.patch("/uncomplete-task/:id", uncompleteTaskById);

export default router;