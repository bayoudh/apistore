import { env } from "./env";

export const jwtConfig = {
  secret: env.jwt.secret,
  expiration: env.jwt.expiration,
  refreshSecret: env.jwt.refreshSecret,
  refreshExpiration: env.jwt.refreshExpiration,
};
