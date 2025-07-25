export interface AlarmPayload {
  id?: number;
  foreign_id?: string;
  title?: string;
  text?: string;
  address?: string;
  lat?: number;
  lng?: number;
  priority?: boolean;
  notification_type?: number;
  cluster?: any[];
  group?: any[];
  user_cluster_relation?: any[];
  ts_create?: number;
  ts_update?: number;
}