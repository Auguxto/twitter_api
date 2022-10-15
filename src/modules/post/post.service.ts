import { Post } from "@prisma/client";

import prisma from "../../lib/prisma";

import CreatePostDto from "./dto/create-post.dto";

export default class PostService {
  async create(createPostDto: CreatePostDto, user_id: string): Promise<Post> {
    const post = await prisma.post.create({
      data: {
        ...createPostDto,
        user_id
      }
    });

    return post;
  }

  async list(): Promise<Post[]> {
    const posts = await prisma.post.findMany({
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

    return posts;
  }
}
