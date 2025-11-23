import express from "express";

import { _loggingIn } from "../controllers/user_controller.js";

export const userRouter = express.Router();

userRouter.post('/loggingin', _loggingIn);
