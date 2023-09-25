import { json, opine } from "opine";

export const httpServer = opine();

httpServer.use(json());
