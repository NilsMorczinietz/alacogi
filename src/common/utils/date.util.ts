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
 * Stores the German local time as UTC (e.g., 01:18:27 Berlin → 01:18:27 UTC)
 * @param timestamp Unix timestamp in seconds
 * @returns Date object with German local time stored as UTC
 */
export function unixToGermanDate(timestamp: number): Date {
  const berlinTime = dayjs.unix(timestamp).tz(GERMAN_TIMEZONE);
  // Extract the time components in Berlin timezone and create a UTC date with those values
  return new Date(
    Date.UTC(
      berlinTime.year(),
      berlinTime.month(),
      berlinTime.date(),
      berlinTime.hour(),
      berlinTime.minute(),
      berlinTime.second(),
      berlinTime.millisecond(),
    ),
  );
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
