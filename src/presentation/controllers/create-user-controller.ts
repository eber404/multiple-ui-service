import { CreateUserUseCase } from '@/application/create-user-usecase.ts'

export interface CreateUserControllerProps {
  data: any
}

export class CreateUserController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  async handle(props: CreateUserControllerProps) {
    for (const key in props.data) {
      if (!props.data[key]) {
        throw Error(`[create user controller] missing user props on controller`)
      }
    }

    await this.createUserUseCase.execute({
      email: props.data.user_email,
      name: props.data.user_name,
      password: props.data.user_password,
    })
  }
}
