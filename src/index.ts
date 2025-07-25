import app from './app';
import { Request, Response } from 'express';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server läuft auf http://localhost:${PORT}`);
});

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from Backend!');
});