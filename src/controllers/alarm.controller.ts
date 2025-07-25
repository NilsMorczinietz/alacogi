import { Request, Response } from 'express';
import { AlarmPayload } from '../types/alarm.type';
import { fetchAllAlarms } from '../services/divera246.service';

export const handleAlarmEcho = (req: Request<{}, {}, AlarmPayload>, res: Response) => {
  const data = req.body;
  console.log('Empfangen:', data);
  res.json({ received: data });
};

export const createAlarm = (req: Request<{}, {}, AlarmPayload>, res: Response) => {
  const alarm = req.body;
  console.log('Alarm empfangen:', alarm);
  res.status(201).json({ message: 'Alarm erfolgreich empfangen', alarm });
};

export const incomingAlarm = (req: Request<{}, {}, AlarmPayload>, res: Response) => {
  const alarm = req.body;
  console.log('Alarm empfangen:', alarm);
  res.status(201).json({ message: 'Alarm erfolgreich empfangen', alarm });
};

export const announceAlarm = async (req: Request<{}, {}, AlarmPayload>, res: Response) => {
  try {
    const alarm = req.body;
    const diveraData = await fetchAllAlarms();
    res.status(201).json({ message: 'Alarm empfangen', alarm, diveraData });
  } catch (error) {
    console.error('Fehler beim Abrufen der divera-Daten:', error);
    res.status(500).json({ error: 'Fehler beim Abrufen der divera-Daten' });
  }
};
