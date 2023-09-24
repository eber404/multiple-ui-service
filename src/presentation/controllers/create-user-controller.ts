import { CreateUserUseCase } from "@/application/create-user/create-user-usecase.ts";
import { Controller, HandleProps } from "@/domain/controllers/controller.ts";

export interface Dependencies {
  createUserUseCase: CreateUserUseCase;
}

export interface Input {
  user_email: string;
  user_name: string;
  user_password: string;
}

export class CreateUserController implements Controller {
  constructor(private readonly deps: Dependencies) {}

  async handle({ input, handlers }: HandleProps) {
    const outputResult = await this.deps.createUserUseCase.execute({
      email: input.user_email,
      name: input.user_name,
      password: input.user_password,
    });

    if (outputResult.isErr()) {
      return handlers.onError(outputResult.unwrapErr());
    }

    handlers.onSuccess();
  }
}
