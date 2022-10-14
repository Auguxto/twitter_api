import { validate } from "class-validator";
import { Request, Response } from "express";

import UserService from "./user.service";

import CreateUserDto from "./dto/create-user.dto";

import AppError from "../../error/AppError";

export default class UserController {
  async create(request: Request, response: Response) {
    const createUserDto = new CreateUserDto(request.body);

    const errors = await validate(createUserDto);
    if (errors.length > 0) {
      throw new AppError("Invalid params", 404);
    }

    const service = new UserService();
    await service.create(createUserDto);

    return response.status(201).end();
  }

  async read(request: Request, response: Response) {
    const service = new UserService();
    const user = await service.read(request.user);

    return response.status(200).json(user).end();
  }
}
