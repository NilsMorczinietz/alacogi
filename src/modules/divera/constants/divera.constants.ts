export const DIVERA_CONFIG = {
  BASE_URL: 'https://app.divera247.com',
  API_VERSION: 'v2',
} as const;

export const DIVERA_ENDPOINTS = {
  ALARMS: '/api/v2/alarms',
  ALARMS_LIST: '/api/v2/alarms/list',
  ALARM_BY_ID: (id: number) => `/api/v2/alarms/${id}`,
} as const;
