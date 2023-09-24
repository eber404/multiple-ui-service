import { User } from "@/domain/entities/user.ts";
import { UserRepository } from "@/domain/repositories/create-user-repository.ts";

export class InMemoryCreateUserRepository implements UserRepository {
  public users: User[] = [];

  async create(user: User): Promise<void> {
    this.users.push(user);

    console.log(
      "[create user repository] success to create user",
      this.users.pop(),
      "",
    );
  }
}
