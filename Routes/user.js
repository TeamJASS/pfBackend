import { Router } from "express";
import { getUser, getUsers, register, login, logout, token, } from "../controllers/user.js";
import { createUserProfile, updateUserProfile, getUserProfile } from "../controllers/profile.js";
import { checkUserSession } from "../middleware/auth.js";
import { remoteUpload } from "../middleware/uploads.js";


//create Router
const userRouter = Router();


userRouter.post("/auth/register", register);

userRouter.post("/auth/login", login);

userRouter.post("/auth/token", token);


userRouter.get("/auth/:username", getUser);

userRouter.get("/users", getUsers);

userRouter.get("/users/userProfile", checkUserSession, getUserProfile);


userRouter.post(
    "/users/userProfile",
    remoteUpload.fields([
        { name: "profilePicture", maxCount: 1 },
        { name: "resume", maxCount: 1 },
    ]),
    checkUserSession,
    createUserProfile
);


userRouter.patch(
    "/users/userProfile/:id",
    remoteUpload.fields([
        { name: "profilePicture", maxCount: 1 },
        { name: "resume", maxCount: 1 },
    ]),
    checkUserSession,
    updateUserProfile
);

userRouter.post("/users/logout", checkUserSession, logout);


export default userRouter