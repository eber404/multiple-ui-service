type MessageCallback<T> = (message: T) => void;

export interface PubSub<T = string> {
  onMessage(
    topic: string,
    callback: MessageCallback<T>,
  ): void;

  publish(topic: string, message: string): void;
}
