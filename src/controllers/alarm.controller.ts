import { Request, Response } from 'express';
import { Alarm } from '../types/alarm.type.js';
import processAlarmText, { fetchAllAlarms } from '../services/divera.service.js';
import { saveAlarm } from '../services/alarm.service.js';
import { DiveraAlarmList } from '../types/divera.type.js';
import { mapDiveraAlarmToAlarm } from '../mapper/divera.mapper.js';

export const handleAlarmEcho = (req: Request<unknown, unknown, Alarm>, res: Response) => {
  const data = req.body;
  res.json({ received: data });
};

export const createAlarm = async (req: Request<unknown, unknown, Alarm>, res: Response) => {
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

export const incomingAlarm = (req: Request<unknown, unknown, Alarm>, res: Response) => {
  const alarm = req.body;
  res.status(201).json({ message: 'Alarm erfolgreich empfangen', alarm });
};

export const announceAlarm = async (req: Request, res: Response) => {
  try {
    const alarms: DiveraAlarmList = await fetchAllAlarms();
    if (!alarms) return res.status(404).json({ error: 'Keine Alarme gefunden' });

    if (alarms.data.sorting.length === 0)
      return res.status(404).json({ error: 'Keine neuen Alarme gefunden' });

    const latestAlarmId = alarms.data.sorting[0];
    const latestDiveraAlarm = alarms.data.items[latestAlarmId];

    const alarm: Alarm = mapDiveraAlarmToAlarm(latestDiveraAlarm);

    const processedAlarmText = processAlarmText(alarm.text);
    if (processedAlarmText.description) {
      alarm.text = processedAlarmText.description;
    }

    // await saveAlarm(alarm);

    res.status(201).json({
      message: 'Announcement empfangen',
      latestAlarm: alarm
    });
  } catch (error) {
    console.error('Fehler beim Abrufen der divera-Daten:', error);
    res.status(500).json({ error: 'Fehler beim Abrufen der divera-Daten' });
  }
};
