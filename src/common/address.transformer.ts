import { ValueTransformer } from 'typeorm';
import { Address } from './address';

export class AddressTransformer implements ValueTransformer {
  to(value: Address | null): string | null {
    if (!value) {
      return null;
    }
    return JSON.stringify({
      street: value.street,
      city: value.city,
      details: value.details,
    });
  }

  from(value: string | null): Address | null {
    if (!value) {
      return null;
    }

    try {
      const data = JSON.parse(value) as { street: string; city: string; details?: string };
      return new Address(data.street, data.city, data.details || '');
    } catch {
      return null;
    }
  }
}
