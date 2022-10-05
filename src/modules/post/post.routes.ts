import { Router } from "express";

import PostController from "./post.controller";

const postRoutes = Router();

postRoutes.post("/", new PostController().create);

export default postRoutes;
