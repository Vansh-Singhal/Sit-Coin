import express from 'express';
import { getAmount, logoutUser, userLogin, userRegister } from '../controllers/userController.js';
import isLoggedIn from '../middlewares/isLoggedIn.js';
const userRouter = express.Router();

userRouter.get("/", (req, res) => {
    res.send("hi");
});

userRouter.post("/register", userRegister);
userRouter.get("/login", userLogin);
userRouter.get("/get/amount",isLoggedIn, getAmount);
userRouter.get("/logout",isLoggedIn, logoutUser);

export default userRouter;