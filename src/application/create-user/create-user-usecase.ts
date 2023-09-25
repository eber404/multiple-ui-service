import { User } from "@/domain/entities/user.ts";
import { UserRepository } from "@/domain/repositories/user-repository.ts";
import { UseCase } from "@/domain/usecases/usecase.ts";
import { EmailValidator } from "@/domain/value-objects/email.ts";
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
    const emailResult = EmailValidator.validate(email);

    if (emailResult.isErr()) {
      throw new BadInputException(`Email ${email} has not a valid format.`);
    }

    const userResult = User.new({
      email,
      name,
      password,
    });

    if (userResult.isErr()) {
      throw new BadInputException(userResult.unwrapErr());
    }

    const retriviedUser = await this.deps.userRepository.getByEmail(
      emailResult.unwrap(),
    );

    if (retriviedUser.isSome()) {
      throw new BadInputException(
        `Email address ${emailResult.unwrap()} is already in use.`,
      );
    }

    await this.deps.userRepository.create(userResult.unwrap());
  }
}
