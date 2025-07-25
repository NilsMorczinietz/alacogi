import { Request, Response } from 'express';
import { AlarmPayload } from '../types/alarm.type';

export const handleAlarmEcho = (req: Request<{}, {}, AlarmPayload>, res: Response) => {
  const data = req.body;
  console.log('Empfangen:', data);
  res.json({ received: data });
};