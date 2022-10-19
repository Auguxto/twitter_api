import { Router } from "express";

import TweetController from "./tweet.controller";

const tweetRoutes = Router();

tweetRoutes.post("/", new TweetController().create);
tweetRoutes.get("/", new TweetController().list);
tweetRoutes.delete("/:id", new TweetController().delete);

export default tweetRoutes;
