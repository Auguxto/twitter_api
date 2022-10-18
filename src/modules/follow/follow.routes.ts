import { Router } from "express";

import FollowController from "./follow.controller";

const followRoutes = Router();

followRoutes.post("/:target_id", new FollowController().create);
followRoutes.delete("/:target_id", new FollowController().delete);

export default followRoutes;
