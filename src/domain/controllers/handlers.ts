import { DomainError } from "@/domain/errors/domain-error.ts";

export interface Handlers {
  onSuccess: () => void;
  onError: (error: DomainError) => void;
}
