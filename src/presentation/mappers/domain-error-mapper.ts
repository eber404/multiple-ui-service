import { Status } from "http-status";

import { ControllerOutput } from "@/domain/controllers/controller.ts";
import { BadInputException } from "@/domain/exceptions/bad-input.ts";
import { NotFoundException } from "@/domain/exceptions/not-found.ts";

export function mapDomainException(
  exception: Error,
): ControllerOutput {
  if (exception instanceof BadInputException) {
    return {
      status: Status.BadRequest,
      message: exception.message,
    };
  }

  if (exception instanceof NotFoundException) {
    return {
      status: Status.NotFound,
      message: exception.message,
    };
  }

  return {
    status: Status.InternalServerError,
    message: exception.message,
  };
}
