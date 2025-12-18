export interface DiveraApiResponse<T> {
  success: boolean;
  data: T;
  ucr?: number;
}

export interface DiveraAlarmsResponse {
  items: Record<string, DiveraAlarm>;
  sorting: number[];
}

export interface DiveraAlarm {
  id: number;
  foreign_id?: string;
  author_id?: number;
  alarmcode_id?: number;
  date: number;
  priority: boolean;
  title: string;
  text?: string;
  address?: string;
  lat?: number;
  lng?: number;
  scene_object?: string;
  caller?: string;
  patient?: string;
  remark?: string;
  units?: string;
  closed: boolean;
  new: boolean;
  editable: boolean;
  answerable: boolean;
  ts_create: number;
  ts_update: number;
}
