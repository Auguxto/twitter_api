import { Request, Response } from "express";

import FollowService from "./follow.service";

export default class FollowController {
  async create(request: Request, response: Response) {
    const { target_id } = request.params;

    const service = new FollowService();
    await service.create(request.user, target_id);

    return response.status(201).end();
  }

  async delete(request: Request, response: Response) {
    const { target_id } = request.params;

    const service = new FollowService();
    await service.delete(request.user, target_id);

    return response.status(200).end();
  }
}
