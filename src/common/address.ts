export class Address {
  private readonly _street: string;
  private readonly _city: string;
  private readonly _details: string;
  private readonly _fullAddress: string;

  constructor(street: string, city: string, details: string = '') {
    if (!street || street.trim().length === 0) {
      throw new Error('Street cannot be empty');
    }
    if (!city || city.trim().length === 0) {
      throw new Error('City cannot be empty');
    }

    this._street = street.trim();
    this._city = city.trim();
    this._details = details.trim();
    this._fullAddress = this.buildFullAddress();
  }

  private buildFullAddress(): string {
    const parts = [this._street, this._city];
    if (this._details) {
      parts.push(this._details);
    }
    return parts.join(', ');
  }

  get street(): string {
    return this._street;
  }

  get city(): string {
    return this._city;
  }

  get details(): string {
    return this._details;
  }

  get fullAddress(): string {
    return this._fullAddress;
  }

  public toString(): string {
    return this._fullAddress;
  }

  public equals(other: Address): boolean {
    return (
      this._street === other._street &&
      this._city === other._city &&
      this._details === other._details
    );
  }
}
