import { GenericId } from "src/common/id/generic-id";

export class UserId extends GenericId {
  public constructor();
  public constructor(id: string);
  public constructor(id?: string) {
    super(id);
  }
}
