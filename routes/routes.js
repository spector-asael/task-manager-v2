// filename: ./routes/routes.js

import express from 'express';
const router = express.Router();
import { deleteTaskById, home, postAddTask, completeTaskById, 
    uncompleteTaskById, searchTasksByName, filterTasksByPriority, 
    filterTasksByCompletion } from "../controllers/controller.js"

router.get('/', home);

router.post('/tasks', postAddTask);

router.delete("/delete-task/:id", deleteTaskById);

router.patch("/complete-task/:id", completeTaskById);

router.patch("/uncomplete-task/:id", uncompleteTaskById);

router.get("/search", searchTasksByName);         

router.get("/filter/status/:id", filterTasksByCompletion);

router.get("/filter/priority/:id", filterTasksByPriority); 

export default router;