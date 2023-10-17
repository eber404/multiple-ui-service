import { User } from "@/domain/entities/user.ts";
import { UserRepository } from "@/domain/repositories/user-repository.ts";
import { UseCase } from "./usecase.ts";
import { BadInputException } from "@/domain/exceptions/bad-input.ts";

interface Dependencies {
  userRepository: UserRepository;
}

interface Input {
  name: string;
  email: string;
  password: string;
}

export class CreateUserUseCase implements UseCase {
  constructor(private readonly deps: Dependencies) {}

  async execute({
    email,
    name,
    password,
  }: Input): Promise<void> {
    const user = User.new({
      email,
      name,
      password,
    });

    const retriviedUser = await this.deps.userRepository.getByEmail(
      user.email,
    );

    if (retriviedUser.isSome()) {
      throw new BadInputException(
        `Email address ${user.email} is already in use.`,
      );
    }

    await this.deps.userRepository.create(user);
  }
}
