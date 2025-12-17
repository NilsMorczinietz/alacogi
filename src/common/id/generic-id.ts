import { randomUUID } from 'crypto';

/**
 * Abstract base class for typed IDs.
 * Ensures type safety for entity IDs and prevents accidental mismatches.
 */
export abstract class GenericId {
  protected readonly id: string;

  protected constructor();
  protected constructor(id: string);
  protected constructor(id?: string) {
    this.id = id ?? randomUUID();
  }

  public getId(): string {
    return this.id;
  }

  public equals(other: GenericId | null | undefined): boolean {
    if (other === null || other === undefined) {
      return false;
    }
    return this.id === other.id;
  }

  public hashCode(): number {
    let hash = 0;
    for (let i = 0; i < this.id.length; i++) {
      const char = this.id.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
  }

  public toString(): string {
    return this.id;
  }
}
