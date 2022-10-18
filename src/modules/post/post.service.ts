import { Post } from "@prisma/client";

import prisma from "../../lib/prisma";

import CreatePostDto from "./dto/create-post.dto";

import AppError from "../../error/AppError";

export default class PostService {
  async create(createPostDto: CreatePostDto, user_id: string): Promise<Post> {
    const post = await prisma.post.create({
      data: {
        ...createPostDto,
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

    return post;
  }

  async delete(id: string, user: string): Promise<void> {
    const post = await prisma.post.findFirst({
      where: {
        id
      }
    });

    if (!post) throw new AppError("Post not found", 404);

    if (post.user_id !== user) throw new AppError("Unauthorized", 401);

    await prisma.post.delete({
      where: {
        id
      }
    });
  }

  async list(): Promise<Post[]> {
    const posts = await prisma.post.findMany({
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

    return posts;
  }
}
