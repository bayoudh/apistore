import dotenv from 'dotenv';

dotenv.config();

export const env = {
  PORT: parseInt(process.env.PORT || '3000'),
  NODE_ENV: process.env.NODE_ENV || 'development',

  DB_HOST: process.env.DB_HOST ,
  DB_PORT: parseInt(process.env.DB_PORT||'50013'),
  DB_USER: process.env.DB_USER ,
  DB_PASSWORD: process.env.DB_PASSWORD ,
  DB_NAME: process.env.DB_NAME ,

  JWT_ACCESS_SECRET: process.env.JWT_SECRET || 'access_secret',
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRT || 'refresh_secret',
  JWT_ACCESS_EXPIRY: process.env.ACCESS_TOKEN_EXPIRY || '15m',
  JWT_REFRESH_EXPIRY: process.env.REFRESH_TOKEN_EXPIRY || '7d',

  RATE_LIMIT_WINDOW: parseInt(process.env.RATE_LIMIT_WINDOW || '15'),
  RATE_LIMIT_MAX: parseInt(process.env.RATE_LIMIT_MAX || '100'),
};