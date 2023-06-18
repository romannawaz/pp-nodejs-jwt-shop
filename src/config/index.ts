import dotenv from 'dotenv';

dotenv.config();

const SERVER_PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

export default {
  server: { port: SERVER_PORT },
};
