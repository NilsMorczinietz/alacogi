import { Request, Response } from 'express';

export const handleEcho = (req: Request<unknown, unknown, unknown>, res: Response) => {
  const data = req.body;
  res.json({ received: data });
};
