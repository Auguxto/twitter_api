import env from "dotenv";
env.config();

import "express-async-errors";
import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";

import errorHandler from "./middlewares/errorHandler";
import auth from "./middlewares/auth";

import userRoutes from "./modules/user/user.routes";
import authRoutes from "./modules/auth/auth.routes";
import followRoutes from "./modules/follow/follow.routes";
import tweetRoutes from "./modules/tweet/tweet.routes";

const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/user", userRoutes);
app.use("/user/auth", authRoutes);
app.use("/user/follow", auth, followRoutes);
app.use("/tweet", auth, tweetRoutes);

app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log("💻 Server is running!");
});
