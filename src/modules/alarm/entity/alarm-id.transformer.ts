import { GenericIdTransformer } from '../../../common/id/generic-id.transformer';
import { AlarmId } from './alarm-id';

export class AlarmIdTransformer extends GenericIdTransformer<AlarmId> {
  constructor() {
    super((id: string) => new AlarmId(id));
  }
}
