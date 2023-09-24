import { Publisher } from "@/domain/pubsub/publisher.ts";

import { redis } from "./redis-client.ts";

export class RedisSubscriberService implements Publisher {
  private readonly redis = redis;

  async publish(channel: string, message: string): Promise<void> {
    await this.redis.publish(channel, message);
  }
}
