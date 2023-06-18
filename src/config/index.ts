import dotenv from 'dotenv';

dotenv.config();

const SERVER_PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

const DB_URL = process.env.DATABASE_URL ?? '';

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET ?? '';
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET ?? '';
const ACCESS_TOKEN_LIFE = process.env.ACCESS_TOKEN_LIFE ?? '2h';
const REFRESH_TOKEN_LIFE = process.env.REFRESH_TOKEN_LIFE ?? '7d';
const SALT = process.env.SALT ?? '';

export default {
  server: { port: SERVER_PORT },
  db: { url: DB_URL },
  token: {
    access_secret: ACCESS_TOKEN_SECRET,
    refresh_secret: REFRESH_TOKEN_SECRET,
    access_life: ACCESS_TOKEN_LIFE,
    refresh_life: REFRESH_TOKEN_LIFE,
    salt: SALT,
  },
};
