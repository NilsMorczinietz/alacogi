import { Column } from 'typeorm';

export class Address {
  @Column({ type: 'varchar', length: 255, nullable: true })
  public street: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  public city: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  public details: string;

  constructor(street: string = '', city: string = '', details: string = '') {
    if (street && street.trim().length === 0) {
      throw new Error('Street cannot be empty');
    }
    if (city && city.trim().length === 0) {
      throw new Error('City cannot be empty');
    }

    this.street = street.trim();
    this.city = city.trim();
    this.details = details.trim();
  }

  get fullAddress(): string {
    const parts = [this.street, this.city];
    if (this.details) {
      parts.push(this.details);
    }
    return parts.join(', ');
  }

  public toString(): string {
    return this.fullAddress;
  }

  public equals(other: Address): boolean {
    return (
      this.street === other.street && this.city === other.city && this.details === other.details
    );
  }
}
