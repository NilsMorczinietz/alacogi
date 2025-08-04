import { processAlarmText } from '../services/divera.service.js';
import { Alarm } from '../types/alarm.type';
import { DiveraAlarm } from '../types/divera.type';
import { convertUnixToDate } from '../utils/time.utils.js';

export function mapDiveraAlarmToAlarm(raw: DiveraAlarm): Alarm {
  if (!raw) throw new Error('Ungültige DiveraAlarm-Daten');

  try {
    const processedText = processAlarmText(raw.text);
    if (processedText.description) raw.text = processedText.description;
  } catch (error) {
    console.error('Fehler bei der Verarbeitung des Alarmtexts:', error);
  }

  return {
    id: raw.id,
    foreign_id: raw.foreign_id,
    title: raw.title,
    description: raw.text,
    address: raw.address,
    lat: raw.lat,
    lng: raw.lng,
    priority: raw.priority,
    notification_type: raw.notification_type,
    created: convertUnixToDate(raw.ts_create)
  };
}
