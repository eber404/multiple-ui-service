export interface UseCase<I = unknown, O = void> {
  execute(input?: I): Promise<O>;
}
