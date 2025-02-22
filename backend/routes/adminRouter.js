import express from 'express';
import isLoggedIn from '../middlewares/isLoggedIn.js';
import { createAdmin, getAllReversals, loginAdmin } from '../controllers/adminController.js';
const reversalRouter = express.Router();


reversalRouter.post("/register", createAdmin);
reversalRouter.get("/login", loginAdmin);
reversalRouter.get("/reversals/get", isLoggedIn, getAllReversals);

export default reversalRouter;