import { GenericId } from '../../../common/id/generic-id';

export class AlarmId extends GenericId {
  constructor();
  constructor(id: string);
  constructor(id?: string) {
    super(id as string);
  }
}
