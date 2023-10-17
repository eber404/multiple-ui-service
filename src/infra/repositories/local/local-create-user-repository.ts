import { None, Option, Some } from "oxide";

import { User } from "@/domain/entities/user.ts";
import { UserRepository } from "@/domain/repositories/user-repository.ts";
import { usersCollection } from "@/infra/repositories/local/users-collection.ts";

export class LocalCreateUserRepository implements UserRepository {
  public users = usersCollection;

  async create(user: User): Promise<void> {
    this.users.push(user);

    console.log(this.users);
  }

  async getByEmail(email: string): Promise<Option<User>> {
    const user = this.users.find((user) => user.email === email);

    if (!user) return None;

    return Promise.resolve(Some(user));
  }
}
