import { CreateUserController } from "@/presentation/controllers/create-user-controller.ts";
import { LocalCreateUserRepository } from "@/infra/repositories/local/local-create-user-repository.ts";
import { CreateUserUseCase } from "@/application/create-user/create-user-usecase.ts";

export function CreateUserIoc() {
  const userRepository = new LocalCreateUserRepository();
  const createUserUseCase = new CreateUserUseCase({ userRepository });
  const createUserController = new CreateUserController({
    createUserUseCase,
  });

  return { createUserController };
}
