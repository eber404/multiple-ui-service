import { CreateUserUseCase } from '@/application/create-user-usecase.ts'

export interface CreateUserPubSub {
  onUserArrive(
    createUserUseCase: Pick<CreateUserUseCase, 'execute'>
  ): Promise<void>
}
