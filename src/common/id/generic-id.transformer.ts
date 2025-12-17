import { ValueTransformer } from 'typeorm';
import { GenericId } from './generic-id';

/**
 * Abstract base class for TypeORM value transformers for typed IDs.
 * Ensures proper database mapping of typed ID classes.
 *
 * NOTE: The transformer is automatically applied and should not be directly used in code!
 */
export abstract class GenericIdTransformer<T extends GenericId> implements ValueTransformer {
  private readonly factory: (id: string) => T;

  protected constructor(factory: (id: string) => T) {
    this.factory = factory;
  }

  /**
   * Transforms typed ID to database column (string/UUID)
   */
  public to(value: T | null | undefined): string | null {
    return value !== null && value !== undefined ? value.getId() : null;
  }

  /**
   * Transforms database column (string/UUID) to typed ID
   */
  public from(value: string | null | undefined): T | null {
    return value !== null && value !== undefined && value !== '' ? this.factory(value) : null;
  }
}
