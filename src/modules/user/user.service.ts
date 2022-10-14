import prisma from "../../lib/prisma";
import * as crypt from "../../lib/crypt";

import { User } from "@prisma/client";

import CreateUserDto from "./dto/create-user.dto";

import AppError from "../../error/AppError";
import { validateUsername } from "../../lib/username";

export default class UserService {
  async create(createUserDto: CreateUserDto): Promise<void> {
    let user = await prisma.user.findFirst({
      where: {
        OR: [
          {
            username: createUserDto.username
          },
          {
            email: createUserDto.email
          }
        ]
      }
    });

    if (user) throw new AppError("User already registered", 429);

    const is_valid_username = validateUsername(createUserDto.username);

    if (!is_valid_username) throw new AppError("Username is not valid", 400);

    const password = crypt.encrypt(createUserDto.password);

    user = await prisma.user.create({
      data: {
        ...createUserDto,
        password
      }
    });

    return;
  }

  async read(id: string): Promise<User> {
    const user = await prisma.user.findUnique({
      where: {
        id
      }
    });

    if (!user) throw new AppError("Unauthorized", 401);

    delete user.password;

    return user;
  }
}
