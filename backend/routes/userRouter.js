import express from 'express';
import { userRegister } from '../controllers/userController.js';
const userRouter = express.Router();

userRouter.get("/", (req, res) => {
    res.send("hi");
});

userRouter.post("/register", userRegister);

export default userRouter;