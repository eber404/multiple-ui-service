import { User } from "@/domain/entities/user.ts";

export interface UserRepository {
  create(user: User): Promise<void>;
}
