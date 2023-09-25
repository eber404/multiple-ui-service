import { OpineRequest, OpineResponse } from "opine";
import { Status } from "http-status";

import { Controller } from "@/domain/controllers/controller.ts";

export class OpineAdapter {
  static onRequest(controller: Controller) {
    return async function (req: OpineRequest, res: OpineResponse) {
      try {
        const input = {
          ...(req.query || {}),
          ...(req.params || {}),
          ...(req.headers || {}),
          ...(req.body || {}),
        };

        const { message, status } = await controller.handle(input);

        res.setStatus(status).send(message && { message });
      } catch (error) {
        res.setStatus(Status.InternalServerError).send({
          message: error.message,
        });
      }
    };
  }
}
