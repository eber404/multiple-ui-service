import { User } from "../entities/user.ts";

export interface CreateUserRepository {
  create(user: User): Promise<void>;
}
