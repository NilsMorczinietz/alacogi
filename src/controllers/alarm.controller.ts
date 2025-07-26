import { Request, Response } from 'express';
import { AlarmPayload } from '../types/alarm.type.js';
import { fetchAllAlarms } from '../services/divera.service.js';

export const handleAlarmEcho = (req: Request<unknown, unknown, AlarmPayload>, res: Response) => {
  const data = req.body;
  res.json({ received: data });
};

export const createAlarm = (req: Request<unknown, unknown, AlarmPayload>, res: Response) => {
  const alarm = req.body;
  res.status(201).json({ message: 'Alarm erfolgreich empfangen', alarm });
};

export const incomingAlarm = (req: Request<unknown, unknown, AlarmPayload>, res: Response) => {
  const alarm = req.body;
  res.status(201).json({ message: 'Alarm erfolgreich empfangen', alarm });
};

export const announceAlarm = async (
  req: Request<unknown, unknown, AlarmPayload>,
  res: Response
) => {
  try {
    const alarm = req.body;
    const diveraData = await fetchAllAlarms();
    res.status(201).json({ message: 'Alarm empfangen', alarm, diveraData });
  } catch (error) {
    console.error('Fehler beim Abrufen der divera-Daten:', error);
    res.status(500).json({ error: 'Fehler beim Abrufen der divera-Daten' });
  }
};
