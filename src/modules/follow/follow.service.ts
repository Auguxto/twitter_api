import prisma from "../../lib/prisma";

import AppError from "../../error/AppError";

export default class FollowService {
  async create(user_id: string, target_id: string): Promise<void> {
    const target = await prisma.user.findFirst({
      where: {
        id: target_id
      }
    });

    if (!target) throw new AppError("Bad request", 400);

    const follow = await prisma.follows.findFirst({
      where: {
        follower: {
          id: user_id
        },
        following: {
          id: target_id
        }
      }
    });

    if (follow) return;

    await prisma.follows.create({
      data: {
        follower: {
          connect: {
            id: user_id
          }
        },
        following: {
          connect: {
            id: target_id
          }
        }
      }
    });
  }

  async delete(user_id: string, target_id: string): Promise<void> {
    const follow = await prisma.follows.findFirst({
      where: {
        follower: {
          id: user_id
        },
        following: {
          id: target_id
        }
      }
    });

    if (!follow) throw new AppError("Bad request", 400);
  }
}
