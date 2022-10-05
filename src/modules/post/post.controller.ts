import { validate } from "class-validator";
import { Request, Response } from "express";

import PostService from "./post.service";

import CreatePostDto from "./dto/create-post.dto";

import AppError from "../../error/AppError";

export default class PostController {
  async create(request: Request, response: Response) {
    const createPostDto = new CreatePostDto(request.body);

    const errors = await validate(createPostDto);
    if (errors.length > 0) {
      throw new AppError("Invalid params", 404);
    }

    const service = new PostService();
    const post = await service.create(createPostDto, request.user);

    return response.status(201).json(post).end();
  }
}
