import { validate } from "class-validator";
import { Request, Response } from "express";

import TweetService from "./tweet.service";

import CreateTweeDto from "./dto/create-tweet.dto";

import AppError from "../../error/AppError";

export default class TweetController {
  async create(request: Request, response: Response) {
    const createTweetDto = new CreateTweeDto(request.body);

    const errors = await validate(createTweetDto);
    if (errors.length > 0) {
      throw new AppError("Invalid params", 404);
    }

    const service = new TweetService();
    const tweet = await service.create(createTweetDto, request.user);

    return response.status(201).json(tweet).end();
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    const service = new TweetService();
    await service.delete(id, request.user);

    return response.status(200).end();
  }

  async list(request: Request, response: Response) {
    const service = new TweetService();
    const tweets = await service.list();

    return response.status(201).json(tweets).end();
  }
}
