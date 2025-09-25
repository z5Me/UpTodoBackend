import express from 'express';
import { SignIn, SignUp } from '../controllers/User.js';

const userRouter = express.Router();

userRouter.post('/signup', SignUp);
userRouter.post('/signin', SignIn);

export default userRouter