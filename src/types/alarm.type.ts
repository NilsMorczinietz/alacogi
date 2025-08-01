export interface Alarm {
  id: number;
  foreign_id: string;
  title: string;
  description: string;
  address: string;
  lat: number;
  lng: number;
  priority: boolean;
  notification_type: number;
  created: Date;
}

export interface AlarmList {
  data: {
    sorting: number[];
    items: { [key: number]: Alarm };
  };
  ucr?: number;
}
