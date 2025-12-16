import { GenericIdTransformer } from "src/common/id/generic-id.transformer";
import { UserId } from './user-id';

export class UserIdTransformer extends GenericIdTransformer<UserId> {
  constructor() {
    super((id: string) => new UserId(id));
  }
}
