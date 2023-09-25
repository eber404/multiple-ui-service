import { Option } from "oxide";

import { User } from "@/domain/entities/user.ts";

export interface UserRepository {
  create(user: User): Promise<void>;
  getByEmail(email: string): Promise<Option<User>>;
}
