import { User } from '@/domain/entities/user.ts'
import { CreateUserRepository } from '@/domain/repositories/create-user-repository.ts'

interface Props {
  name: string
  email: string
  password: string
}

export class CreateUserUseCase {
  constructor(private readonly createUserRepository: CreateUserRepository) {}

  async execute(props: Props) {
    const user = new User(props)

    await this.createUserRepository.create(user)
  }
}
