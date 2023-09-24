import { OnMessageInput, Subscriber } from "@/domain/pubsub/subscriber.ts";

import { redis } from "./redis-client.ts";

export class RedisSubscriber implements Subscriber {
  private readonly redis = redis;

  async subscribe(
    channel: string,
    callback: ({ message }: OnMessageInput) => void,
  ): Promise<void> {
    const sub = await this.redis.subscribe(channel);

    for await (const { channel: redisChannel, message } of sub.receive()) {
      if (redisChannel === channel) {
        callback({ message });
      }
    }
  }
}
