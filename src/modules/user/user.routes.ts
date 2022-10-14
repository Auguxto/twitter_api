import { Router } from "express";

import auth from "../../middlewares/auth";

import UserController from "./user.controller";

const userRoutes = Router();

userRoutes.post("/", new UserController().create);
userRoutes.get("/", auth, new UserController().read);

export default userRoutes;
