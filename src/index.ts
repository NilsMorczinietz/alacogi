import app from './app.js';
import dotenv from 'dotenv';
import { Request, Response } from 'express';

dotenv.config();

const BACKEND_PORT = process.env.BACKEND_PORT || 8080;

app.listen(BACKEND_PORT, () => {
  console.log(`🚀 Server läuft auf http://localhost:${BACKEND_PORT}`);
});

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from Backend!');
});
