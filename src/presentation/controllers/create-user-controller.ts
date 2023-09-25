import _ from "lodash";
import { Status } from "http-status";

import { CreateUserUseCase } from "@/application/create-user/create-user-usecase.ts";
import {
  Controller,
  ControllerOutput,
} from "@/domain/controllers/controller.ts";
import { mapDomainException } from "@/presentation/mappers/domain-error-mapper.ts";

export interface Dependencies {
  createUserUseCase: CreateUserUseCase;
}

export interface Input {
  user_email: string;
  user_name: string;
  user_password: string;
}

export class CreateUserController implements Controller<Input> {
  constructor(private readonly deps: Dependencies) {}

  async handle(input: Input): Promise<ControllerOutput> {
    try {
      await this.deps.createUserUseCase.execute({
        email: input.user_email,
        name: input.user_name,
        password: input.user_password,
      });

      return {
        status: Status.Created,
      };
    } catch (error) {
      return mapDomainException(error);
    }
  }
}
