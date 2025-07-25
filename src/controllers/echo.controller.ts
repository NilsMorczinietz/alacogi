import { Request, Response } from 'express';

export const handleEcho = (req: Request, res: Response) => {
  const data = req.body;
  res.json({ received: data });
};