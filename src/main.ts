import { createUserController } from "./infra/ioc/create-user-ioc.ts";
import { RedisPubSubAdapter } from "@/infra/subscribers/redis/redis-subscriber-adapter.ts";
import { RedisSubscriber } from "@/infra/subscribers/redis/redis-subscriber.ts";

const redis = new RedisSubscriber();

redis.onMessage(
  "my-channel",
  RedisPubSubAdapter.onMessage(createUserController),
);
