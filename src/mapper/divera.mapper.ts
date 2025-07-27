import { Alarm } from '../types/alarm.type';
import { DiveraAlarm } from '../types/divera.type';
import { convertUnixToDate } from '../utils/time.utils.js';

export function mapDiveraAlarmToAlarm(raw: DiveraAlarm): Alarm {
  return {
    id: raw.id,
    foreign_id: raw.foreign_id,
    title: raw.title,
    text: raw.text,
    address: raw.address,
    lat: raw.lat,
    lng: raw.lng,
    priority: raw.priority,
    notification_type: raw.notification_type,
    created: convertUnixToDate(raw.ts_create)
  };
}
