import express from 'express';
import { AddTask, getAllTask } from '../controllers/Task.js';

const taskRouter = express.Router();

taskRouter.get('/getAllTask', getAllTask);
taskRouter.post('/AddTask', AddTask);

export default taskRouter