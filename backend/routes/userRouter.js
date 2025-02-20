import express from 'express';
import { userLogin, userRegister } from '../controllers/userController.js';
const userRouter = express.Router();

userRouter.get("/", (req, res) => {
    res.send("hi");
});

userRouter.post("/register", userRegister);
userRouter.get("/login", userLogin);

export default userRouter;