import { CreateUserController } from "@/presentation/controllers/create-user-controller.ts";
import { CreateUserUseCase } from "@/application/create-user-usecase.ts";
import { InMemoryCreateUserRepository } from "../repositories/in-memory-create-user-repository.ts";

const createUserRepository = new InMemoryCreateUserRepository();
const createUserUseCase = new CreateUserUseCase(createUserRepository);
const createUserController = new CreateUserController(createUserUseCase);

export { createUserController };
