import { Handlers } from "@/domain/controllers/handlers.ts";

export interface HandleProps<T = any> {
  input?: T;
  handlers: Handlers;
}

export interface Controller {
  handle<T>(props: HandleProps<T>): Promise<void>;
}
