export interface Alarm {
  id: number;
  foreign_id: string;
  title: string;
  text: string;
  address: string;
  lat: number;
  lng: number;
  priority: boolean;
  notification_type: number;
  ts_create: Date;
}

export interface AlarmList {
  data: {
    sorting: number[];
    items: { [key: number]: Alarm };
  };
  ucr?: number;
}
