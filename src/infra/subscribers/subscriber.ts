type MessageCallback<T> = (message: T) => void;

export interface Subscriber<T = string> {
  onMessage(
    topic: string,
    callback: MessageCallback<T>,
  ): void;

  publish(topic: string, message: string): void;
}
