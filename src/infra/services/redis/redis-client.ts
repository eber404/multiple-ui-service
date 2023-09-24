import { connect } from "redis";

export const redis = await connect({ hostname: "redis" });
