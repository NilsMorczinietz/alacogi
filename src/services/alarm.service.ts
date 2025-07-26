import { Pool, PoolConfig, QueryResult } from 'pg';
import { AlarmPayload } from '../types/alarm.type.js';

const dbUser = process.env.POSTGRES_USER || 'alacogi';
const dbPassword = process.env.POSTGRES_PASSWORD || 'alacogi';
const dbHost = process.env.POSTGRES_HOST || 'localhost';
const dbPort = process.env.POSTGRES_PORT || '5432';
const dbName = process.env.POSTGRES_DB || 'alacogi';

const connectionString = `postgresql://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`;

const config: PoolConfig = {
  connectionString
};

const pool = new Pool(config);

interface AlarmRow {
  id?: number;
  foreign_id: string;
  title: string;
  text: string;
  address: string;
  lat: number;
  lng: number;
  priority: number;
  notification_type: string;
  ts_create: Date;
  ts_update: Date;
}

export async function saveAlarm(alarm: AlarmPayload): Promise<AlarmRow> {
  const query = `
    INSERT INTO alarms (
      foreign_id, title, text, address, lat, lng, priority, notification_type, ts_create, ts_update
    ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
    RETURNING *;
  `;

  const values = [
    alarm.foreign_id,
    alarm.title,
    alarm.text,
    alarm.address,
    alarm.lat,
    alarm.lng,
    alarm.priority,
    alarm.notification_type,
    alarm.ts_create,
    alarm.ts_update
  ];

  try {
    const result: QueryResult<AlarmRow> = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error('Error saving alarm:', error);
    throw error;
  }
}
