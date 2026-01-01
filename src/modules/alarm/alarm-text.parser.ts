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
   * "F2_Gebäude, Lichtenberger Straße ,MNH-Mitte,  BUS Treptower Str., , ENR:68, Melder:mustermann, Einweiser an der haltestelle brennt ein Balkon"
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
   * Pattern: [Building/Location], [Street], [District], [City]
   *
   * Fixed positions:
   * - parts[0] = Building/Location (details)
   * - parts[1] = Street
   * - parts[2] = District (ignored)
   * - parts[last] = City
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

    let street = '';
    let city = '';
    let details = '';

    // City is always the last part
    city = parts[parts.length - 1];

    if (parts.length === 1) {
      // Only one part, use it as both street and city
      street = parts[0];
      city = parts[0];
    } else if (parts.length === 2) {
      // Two parts: first is street, second is city
      street = parts[0];
    } else if (parts.length === 3) {
      // Three parts: [details/street], [street/district], [city]
      // Assume: parts[0] is street, parts[1] is district (ignored)
      street = parts[0];
    } else {
      // Four or more parts: [details], [street], [district], ..., [city]
      // parts[0] = details (building/location)
      // parts[1] = street
      // parts[2...n-1] = district and other info (ignored)
      // parts[last] = city
      details = parts[0];
      street = parts[1];
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
