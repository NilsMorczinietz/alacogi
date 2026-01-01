import * as dayjs from 'dayjs';
import * as timezone from 'dayjs/plugin/timezone';
import * as utc from 'dayjs/plugin/utc';

// Extend dayjs with plugins
dayjs.extend(utc);
dayjs.extend(timezone);

/**
 * German timezone (Europe/Berlin)
 * Automatically handles CET (winter) and CEST (summer) time
 */
export const GERMAN_TIMEZONE = 'Europe/Berlin';

/**
 * Convert Unix timestamp to Date object in German timezone
 * @param timestamp Unix timestamp in seconds
 * @returns Date object in German timezone
 */
export function unixToGermanDate(timestamp: number): Date {
  return dayjs.unix(timestamp).tz(GERMAN_TIMEZONE).toDate();
}

/**
 * Get current date in German timezone
 * @returns Date object in German timezone
 */
export function getGermanDate(): Date {
  return dayjs().tz(GERMAN_TIMEZONE).toDate();
}

/**
 * Convert any date to German timezone
 * @param date Date to convert
 * @returns Date object in German timezone
 */
export function toGermanDate(date: Date | string): Date {
  return dayjs(date).tz(GERMAN_TIMEZONE).toDate();
}
