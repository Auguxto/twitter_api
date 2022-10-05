import { Router } from "express";

import UserController from "./user.controller";

const userRoutes = Router();

userRoutes.post("/", new UserController().create);

export default userRoutes;
