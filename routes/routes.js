import express from 'express';
const router = express.Router();
import { home } from "../controllers/controller.js"

router.get('/', home);

router.get('/addTask', );

export default router;