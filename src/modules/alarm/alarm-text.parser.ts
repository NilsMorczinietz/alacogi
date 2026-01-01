import { Address } from '../../common/address';

export interface ParsedAlarmText {
  reporter: string | null;
  remarks: string | null;
  address: Address | null;
}

export class AlarmTextParser {
  /**
   * Parses the Divera alarm text field to extract:
   * - Melder (reporter)
   * - Anmerkung (notes/remarks)
   * - Address components
   *
   * Expected format examples:
   * "F2_Gebäude, Lichtenberger Straße ,MNH-Mitte,  BUS Treptower Str., , ENR:68, Melder:arab, Einweiser an der haltestelle brennt ein Balkon"
   */
  public static parse(text: string, diveraAddress?: string): ParsedAlarmText {
    const result: ParsedAlarmText = {
      reporter: null,
      remarks: null,
      address: null,
    };

    if (!text) {
      return result;
    }

    // Extract Melder (reporter)
    const melderMatch = text.match(/Melder:\s*([^,]+)/i);
    if (melderMatch) {
      result.reporter = melderMatch[1].trim();
    }

    // Extract Anmerkung (remarks)
    const parts = text.split(',');
    if (parts.length > 0) {
      // Find the last part that doesn't contain "Melder:"
      for (let i = parts.length - 1; i >= 0; i--) {
        const part = parts[i].trim();
        if (part && !part.match(/Melder:/i) && !part.match(/^ENR:/i)) {
          result.remarks = part;
          break;
        }
      }
    }

    // Parse address from diveraAddress field or text
    result.address = this.parseAddress(diveraAddress || text);

    return result;
  }

  /**
   * Parses address string into Address value object
   * Expected format: "BUS Treptower Str.,Lichtenberger Straße,MNH-Mitte,Monheim"
   */
  private static parseAddress(addressString: string): Address | null {
    if (!addressString) {
      return null;
    }

    const parts = addressString
      .split(',')
      .map((p) => p.trim())
      .filter((p) => p.length > 0);

    if (parts.length === 0) {
      return null;
    }

    // Try to identify street and city
    let street = '';
    let city = '';
    let details = '';

    if (parts.length === 1) {
      // Only one part, assume it's the street
      street = parts[0];
      city = 'Unbekannt';
    } else if (parts.length === 2) {
      // Two parts: street and city
      street = parts[0];
      city = parts[1];
    } else {
      // Multiple parts: first is usually street, last is city, rest are details
      street = parts[0];
      city = parts[parts.length - 1];
      details = parts.slice(1, -1).join(', ');
    }

    try {
      return new Address(street, city, details);
    } catch {
      // If validation fails, return null
      return null;
    }
  }

  /**
   * Extracts the title/category from the text (first comma-separated part)
   */
  public static extractTitle(text: string): string | null {
    if (!text) {
      return null;
    }

    const parts = text.split(',');
    return parts.length > 0 ? parts[0].trim() : null;
  }
}
