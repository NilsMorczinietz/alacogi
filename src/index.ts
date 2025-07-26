import app from './app.js';
import dotenv from 'dotenv';
import { Request, Response } from 'express';

dotenv.config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server läuft auf http://localhost:${PORT}`);
});

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from Backend!');
});
