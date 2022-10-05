import { Router } from "express";

import AuthController from "./auth.controller";

const authRoutes = Router();

authRoutes.post("/", new AuthController().authenticate);

export default authRoutes;
