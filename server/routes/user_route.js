import express from "express";

import { _loggingIn, _register } from "../controllers/user_controller.js";

export const userRouter = express.Router();

userRouter.post('/loggingin', _loggingIn);
userRouter.post('/register', _register);
