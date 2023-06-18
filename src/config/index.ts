import dotenv from 'dotenv';

dotenv.config();

const SERVER_PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

const DB_URL = process.env.DATABASE_URL ?? '';

export default {
  server: { port: SERVER_PORT },
  db: { url: DB_URL },
};
