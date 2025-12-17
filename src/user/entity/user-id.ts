import { GenericId } from 'src/common/id/generic-id';

export class UserId extends GenericId {
  constructor();
  constructor(id: string);
  constructor(id?: string) {
    super(id as string);
  }
}
