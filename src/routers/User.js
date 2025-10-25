import express from 'express';
import { ChangeAccountName, ChangePassword, SignIn, SignUp } from '../controllers/User.js';

const userRouter = express.Router();

userRouter.post('/signup', SignUp);
userRouter.post('/signin', SignIn);
userRouter.post('/changeaccountname', ChangeAccountName);
userRouter.post('/changepassword', ChangePassword);

export default userRouter