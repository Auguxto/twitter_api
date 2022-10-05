import { Response } from "express";
import jwt from "jsonwebtoken";

import prisma from "../../lib/prisma";
import * as crypt from "../../lib/crypt";

import AppError from "../../error/AppError";

import { AuthenticateUserDto } from "./dto/authenticate-user.dto";
import { AuthenticateUserResponseDto } from "./dto/authenticate-user-response.dto";

export default class AuthService {
  async authenticate(
    authenticateUserDto: AuthenticateUserDto,
    response: Response
  ): Promise<AuthenticateUserResponseDto> {
    let user = await prisma.user.findFirst({
      where: {
        OR: [
          {
            username: authenticateUserDto.username
          },
          {
            email: authenticateUserDto.username
          }
        ]
      }
    });

    if (!user) throw new AppError("User not found", 404);

    const password_match =
      authenticateUserDto.password === crypt.decrypt(user.password);

    if (!password_match)
      throw new AppError("Invalid username/password combination", 401);

    const access_token = jwt.sign({}, process.env.CRYPT, {
      subject: user.id,
      expiresIn: "1h",
      algorithm: "HS256"
    });

    response.cookie("access", access_token, {
      maxAge: 3600,
      httpOnly: true,
      sameSite: "strict"
    });

    return { access_token };
  }
}
