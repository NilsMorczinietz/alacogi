import { Request, Response } from 'express';
import { AlarmPayload } from '../types/alarm.type.js';
import processAlarmText, { fetchAllAlarms } from '../services/divera.service.js';
import { saveAlarm } from '../services/alarm.service.js';
import { DiveraAlarms } from '../types/divera.type.js';

export const handleAlarmEcho = (req: Request<unknown, unknown, AlarmPayload>, res: Response) => {
  const data = req.body;
  res.json({ received: data });
};

export const createAlarm = async (req: Request<unknown, unknown, AlarmPayload>, res: Response) => {
  const alarm = req.body;
  await saveAlarm(alarm)
    .then(() => {
      res.status(201).json({ message: 'Alarm erfolgreich gespeichert' });
    })
    .catch((error) => {
      console.error('Fehler beim Speichern des Alarms:', error);
      res.status(500).json({ error: 'Fehler beim Speichern des Alarms' });
    });
};

export const incomingAlarm = (req: Request<unknown, unknown, AlarmPayload>, res: Response) => {
  const alarm = req.body;
  res.status(201).json({ message: 'Alarm erfolgreich empfangen', alarm });
};

export const announceAlarm = async (req: Request, res: Response) => {
  try {
    const alarms: DiveraAlarms = await fetchAllAlarms();
    if (!alarms) return res.status(404).json({ error: 'Keine Alarme gefunden' });

    if (alarms.data.sorting.length === 0)
      return res.status(404).json({ error: 'Keine neuen Alarme gefunden' });

    const latestAlarmId: number = alarms.data.sorting[0];
    const latestAlarm = alarms.data.items[latestAlarmId];

    const processedAlarmText = processAlarmText(latestAlarm.text);
    if (processedAlarmText.description) {
      latestAlarm.text = processedAlarmText.description;
    }

    res.status(201).json({ message: 'Announcement empfangen', latestAlarm });
  } catch (error) {
    console.error('Fehler beim Abrufen der divera-Daten:', error);
    res.status(500).json({ error: 'Fehler beim Abrufen der divera-Daten' });
  }
};

// Im Request gibt es drei generische Typen:
// 1. req.params (hier: unknown) – URL-Parameter
// 2. req.res (hier: unknown) – Response-Body (wird selten genutzt, meist unknown)
// 3. req.body (hier: AlarmPayload) – Request-Body, also die gesendeten Daten (z.B. ein Alarm)
