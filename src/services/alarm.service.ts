import { Pool, PoolConfig, QueryResult } from 'pg';
import { Alarm } from '../types/alarm.type.js';

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

export async function saveAlarm(alarm: Alarm): Promise<Alarm> {
  const query = `
    INSERT INTO alarms (
      id, foreign_id, title, text, address, lat, lng, priority, notification_type, created
    ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
    RETURNING *;
  `;

  const values = [
    alarm.id,
    alarm.foreign_id,
    alarm.title,
    alarm.text,
    alarm.address,
    alarm.lat,
    alarm.lng,
    alarm.priority,
    alarm.notification_type,
    alarm.created
  ];

  try {
    const result: QueryResult<Alarm> = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error('Error saving alarm:', error);
    throw error;
  }
}
