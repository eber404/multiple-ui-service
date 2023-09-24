import { FastifyReply, FastifyRequest } from "fastify";
import httpStatus from "http-status-codes";

import { Controller } from "@/domain/controllers/controller.ts";
import { DomainError } from "@/domain/errors/domain-error.ts";
import { DomainErrorType } from "@/domain/errors/error-type.ts";

export class FastifyAdapter {
  static onRequest(controller: Controller) {
    return async function (req: FastifyRequest, reply: FastifyReply) {
      const onSuccess = () => {
        return reply.status(httpStatus.CREATED);
      };

      const onError = (error: DomainError) => {
        if (error.type === DomainErrorType.BadInput) {
          return reply.status(httpStatus.BAD_REQUEST).send({
            message: error.message,
          });
        }

        if (error.type === DomainErrorType.NotFound) {
          return reply.status(httpStatus.NOT_FOUND).send({
            message: error.message,
          });
        }
      };

      try {
        const input = {
          ...(req.body || {}),
          ...(req.query || {}),
          ...(req.params || {}),
          ...(req.headers || {}),
        };

        await controller.handle({ input, handlers: { onSuccess, onError } });
      } catch (error) {
        reply.status(httpStatus.INTERNAL_SERVER_ERROR).send(error);
      }
    };
  }
}
