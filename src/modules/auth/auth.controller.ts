import { validate } from "class-validator";
import { Request, Response } from "express";

import AuthService from "./auth.service";

import { AuthenticateUserDto } from "./dto/authenticate-user.dto";

import AppError from "../../error/AppError";

export default class AuthController {
  async authenticate(request: Request, response: Response) {
    const authenticateUserDto = new AuthenticateUserDto(request.body);

    const errors = await validate(authenticateUserDto);
    if (errors.length > 0) {
      throw new AppError("Invalid params", 404);
    }

    const service = new AuthService();
    const auth_response = await service.authenticate(
      authenticateUserDto,
      response
    );

    return response.status(201).json(auth_response).end();
  }
}
