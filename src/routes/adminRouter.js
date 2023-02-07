import { login, register } from "../controllers/adminController";

import { Router } from "express";

const adminRouter = Router();

adminRouter.post("/register", register);
adminRouter.post("/login", login);

export default adminRouter;
