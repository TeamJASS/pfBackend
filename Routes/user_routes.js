import { Router } from "express";
import { signUp } from "../controllers/user_controller.js";

const userRouter =Router()

//Define routes

userRouter.post('/users/signup', signUp);



export default userRouter;