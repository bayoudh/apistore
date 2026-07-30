import dotenv from "dotenv";
import path from "path";

dotenv.config();

export const env = {
  port: parseInt(process.env.PORT || "3000", 10),
  nodeEnv: process.env.NODE_ENV || "development",

  jwt: {
    secret: process.env.JWT_SECRET || "default-secret",
    expiration: parseInt(process.env.JWT_EXPIRATION || "3600", 10),
    refreshSecret: process.env.JWT_REFRESH_SECRET || "default-refresh-secret",
    refreshExpiration: parseInt(process.env.JWT_REFRESH_EXPIRATION || "604800", 10),
  },

  db: {
    path: process.env.DB_PATH || path.join(__dirname, "../../database.sqlite"),
  },

  upload: {
    dir: process.env.UPLOAD_DIR || path.join(__dirname, "../../uploads"),
    maxFileSize: parseInt(process.env.MAX_FILE_SIZE || "10485760", 10),
  },
};
