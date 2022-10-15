import { Router } from "express";

import PostController from "./post.controller";

const postRoutes = Router();

postRoutes.post("/", new PostController().create);
postRoutes.get("/", new PostController().list);

export default postRoutes;
