import express, { Express } from "express";
import dotenv from "dotenv";

import UsersRouter from './api/users/routes';
import ChatsRouter from './api/chats/routes';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

// Initializing routers
console.log('Initializing routers');
app.use('/users', UsersRouter);
app.use('/chats', ChatsRouter);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});