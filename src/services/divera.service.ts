import axios from 'axios';
import { DiveraAlarms } from '../types/divera.type';

const DIVERA_API_URL = 'https://divera247.com/api/v2/alarms';

/**
 * Fetch all non-archived alarms from DIVERA247 API.
 * The access key is passed as a query parameter.
 * @returns {Promise<any>} The response data from the API.
 * @throws {Error} If the access key is not set or the request fails.
 */
export async function fetchAllAlarms(): Promise<DiveraAlarms> {
  const accessKey = process.env.DIVERA_API_KEY;
  if (!accessKey) {
    throw new Error('Environment variable DIVERA_API_KEY is not set.');
  }

  const url = `${DIVERA_API_URL}?accesskey=${accessKey}`;

  try {
    const response = await axios.get(url);
    if (response.status !== 200) {
      throw new Error(`Failed to fetch alarms: ${response.statusText}`);
    }
    return response.data as DiveraAlarms;
  } catch (error) {
    console.error('Failed to fetch alarms from DIVERA247:', error);
    throw error;
  }
}

/**
 * Processes the alarm text to extract relevant information.
 * The text is expected to be in a specific format.
 *
 * Example for the expected text format (anonymized):
 * "EINSATZART, Musterstraße 1, MUSTERSTADT,  , ENR:12345, Melder: , Beispielbeschreibung"
 *
 * @param {string} text - The alarm text to process.
 * @returns {Object} An object containing the processed information.
 * @throws {Error} If the text does not contain enough parts to process.
 */
export default function processAlarmText(text: string): {
  title: string | undefined;
  streetAndHouseNumber: string | undefined;
  city1: string | undefined;
  city2: string | undefined;
  city3: string | undefined;
  enr: number | undefined;
  melder: string | undefined;
  description: string | undefined;
} {
  const parts: string[] = text.split(',');

  if (parts.length < 7) {
    throw new Error('Alarm text does not contain enough parts to process.');
  }

  const title: string | undefined = parts[0].trim() || undefined;
  const streetAndHouseNumber: string | undefined = parts[1].trim() || undefined;
  const city1: string | undefined = parts[2].trim() || undefined;
  const city2: string | undefined = parts[3].trim() || undefined;
  const city3: string | undefined = parts[4].trim() || undefined;

  // Extract the number from "ENR:68131" (parts[5])
  const enrMatch = parts[5].match(/\d+/);
  const enr: number | undefined = enrMatch ? parseInt(enrMatch[0], 10) : undefined;

  // Extract the melder info from "Melder: Max Mustermann" (parts[6])
  const melderMatch = parts[6].match(/Melder:\s*(.*)/);
  const melder: string | undefined = melderMatch ? melderMatch[1].trim() : undefined;

  const description: string | undefined = parts[7].trim() || undefined;

  return { title, streetAndHouseNumber, city1, city2, city3, enr, melder, description };
}
