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
