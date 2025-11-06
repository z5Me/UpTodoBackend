import express from 'express';
import { addCategory, getAllCategory, removeCategory } from '../controllers/Category.js';

const categoryRouter = express.Router();

categoryRouter.get('/getAllCategory', getAllCategory);
categoryRouter.post('/addCategory', addCategory);
categoryRouter.post('/removeCategory', removeCategory);

export default categoryRouter;