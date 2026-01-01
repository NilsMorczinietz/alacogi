export class DiveraAlarmDto {
  id: number;
  author_id: number;
  cluster_id: number;
  alarmcode_id?: number;
  message_channel_id?: number;
  foreign_id: string;
  title: string;
  text: string;
  report?: string;
  address: string;
  lat: number;
  lng: number;
  priority: boolean;
  date: number;
  new: boolean;
  editable?: boolean;
  answerable?: boolean;
  notification_type?: number;
  vehicle?: number[];
  group?: number[];
  cluster?: number[];
  user_cluster_relation?: unknown[];
  hidden?: boolean;
  deleted?: boolean;
  message_channel?: boolean;
  custom_answers?: boolean;
  attachment_count?: number;
  closed: boolean;
  close_state?: number;
  duration?: string;
  ts_response?: number;
  response_time?: number;
  ucr_addressed?: number[];
  ucr_answered?: Record<string, Record<string, { ts: number; note: string }>>;
  ucr_answeredcount?: Record<string, number>;
  ucr_read?: number[];
  ucr_self_addressed?: boolean;
  count_recipients?: number;
  count_read?: number;
  private_mode?: boolean;
  custom?: unknown[];
  cross_unit_meta?: unknown;
  ts_publish?: number;
  ts_create: number;
  ts_update: number;
  ts_close?: number;
  notification_filter_vehicle?: boolean;
  notification_filter_status?: boolean;
  notification_filter_shift_plan?: number;
  notification_filter_access?: boolean;
  notification_filter_status_access?: boolean;
  ucr_self_status_id?: number;
  ucr_self_note?: string;

  constructor(data: Partial<DiveraAlarmDto>) {
    Object.assign(this, data);
  }
}

export class DiveraAlarmsListDto {
  items: Record<string, DiveraAlarmDto>;
  sorting: number[];

  constructor(items: Record<string, DiveraAlarmDto>, sorting: number[]) {
    this.items = items;
    this.sorting = sorting;
  }
}

export class DiveraAlarmsResponseDto {
  success: boolean;
  data: {
    items: Record<string, DiveraAlarmDto>;
    sorting: number[];
  };
  ucr: number;

  constructor(data: Partial<DiveraAlarmsResponseDto>) {
    Object.assign(this, data);
  }
}
