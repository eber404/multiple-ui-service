import { Err, Ok, Result } from "oxide";

import { User } from "@/domain/entities/user.ts";
import { UserRepository } from "@/domain/repositories/create-user-repository.ts";
import { DomainError } from "../../domain/errors/domain-error.ts";
import { DomainErrorType } from "@/domain/errors/error-type.ts";

interface Dependencies {
  userRepository: UserRepository;
}

interface Props {
  name: string;
  email: string;
  password: string;
}

export class CreateUserUseCase {
  constructor(private readonly deps: Dependencies) {}

  async execute({
    email,
    name,
    password,
  }: Props): Promise<Result<void, DomainError>> {
    const user = User.new({
      email,
      name,
      password,
    });

    if (user.isErr()) {
      return Err(
        new DomainError({
          message: user.unwrapErr(),
          type: DomainErrorType.BadInput,
        }),
      );
    }

    return Ok(await this.deps.userRepository.create(user.unwrap()));
  }
}
