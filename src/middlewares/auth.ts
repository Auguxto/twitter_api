import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import prisma from "../lib/prisma";

import AppError from "../error/AppError";

async function auth(request: Request, response: Response, next: NextFunction) {
  const authHeader = request.headers.authorization;

  if (!authHeader) throw new AppError("Unauthorized", 401);

  const [, token] = authHeader.split(" ");

  try {
    const { sub } = jwt.verify(token, process.env.CRYPT) as {
      sub: string;
    };

    request.user = sub;

    const user = await prisma.user.findUnique({
      where: { id: sub }
    });

    if (!user) throw new AppError("Unauthorized", 401);

    return next();
  } catch {
    throw new AppError("Unauthorized", 401);
  }
}

export default auth;
