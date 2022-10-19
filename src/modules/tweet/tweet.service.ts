import { Post } from "@prisma/client";

import prisma from "../../lib/prisma";

import CreateTweetDto from "./dto/create-tweet.dto";

import AppError from "../../error/AppError";

export default class TweetService {
  async create(createTweetDto: CreateTweetDto, user_id: string): Promise<Post> {
    const tweet = await prisma.post.create({
      data: {
        ...createTweetDto,
        user_id
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            name: true,
            avatar: true
          }
        }
      }
    });

    return tweet;
  }

  async delete(id: string, user: string): Promise<void> {
    const tweet = await prisma.post.findFirst({
      where: {
        id
      }
    });

    if (!tweet) throw new AppError("Tweet not found", 404);

    if (tweet.user_id !== user) throw new AppError("Unauthorized", 401);

    await prisma.post.delete({
      where: {
        id
      }
    });
  }

  async list(): Promise<Post[]> {
    const tweets = await prisma.post.findMany({
      include: {
        user: {
          select: {
            id: true,
            username: true,
            name: true,
            avatar: true,
            followedBy: true,
            following: true
          }
        }
      }
    });

    return tweets;
  }
}
