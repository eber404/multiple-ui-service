import { CreateUserController } from "@/presentation/controllers/create-user-controller.ts";
import { InMemoryCreateUserRepository } from "@/infra/repositories/in-memory-create-user-repository.ts";
import { CreateUserUseCase } from "@/application/create-user/create-user-usecase.ts";

export function CreateUserIoc() {
  const userRepository = new InMemoryCreateUserRepository();
  const createUserUseCase = new CreateUserUseCase({ userRepository });
  const createUserController = new CreateUserController({
    createUserUseCase,
  });

  return { createUserController };
}
