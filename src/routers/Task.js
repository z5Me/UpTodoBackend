import express from 'express';
import { AddTask } from '../controllers/Task.js';

const taskRouter = express.Router();

taskRouter.post('/AddTask', AddTask);

export default taskRouter