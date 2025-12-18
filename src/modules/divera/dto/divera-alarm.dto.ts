export class DiveraAlarmDto {
  id: number;
  foreign_id?: string;
  date: number;
  priority: boolean;
  title: string;
  text?: string;
  address?: string;
  lat?: number;
  lng?: number;
  closed: boolean;
  new: boolean;
  ts_create: number;
  ts_update: number;

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
