import express from 'express';
import { getbalance, logoutUser, userLogin, userRegister } from '../controllers/userController.js';
import isLoggedIn from '../middlewares/isLoggedIn.js';
const userRouter = express.Router();

userRouter.post("/register", userRegister);
userRouter.post("/login", userLogin);
userRouter.get("/get/balance", isLoggedIn, getbalance);
userRouter.get("/logout", isLoggedIn, logoutUser);

export default userRouter;