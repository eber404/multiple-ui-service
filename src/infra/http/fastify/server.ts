import fastify from "fastify";

export const fastifyServer = fastify({ logger: true });

fastifyServer.listen({ port: 3333 });
