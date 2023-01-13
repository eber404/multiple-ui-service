import { createUserController } from "@/infra/ioc/create-user-ioc.ts";
import { RedisPubSub } from "@/infra/pubsub/redis/redis-pubsub.ts";
import { RedisPubSubAdapter } from "@/infra/pubsub/redis/redis-pubsub-adapter.ts";

const redisPubSub = new RedisPubSub();

redisPubSub.onMessage(
  "my-channel",
  RedisPubSubAdapter.onMessage(createUserController),
);
