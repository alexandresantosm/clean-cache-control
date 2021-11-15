export class CachePolicy {
  private static maxAgeInDate = 3;

  private constructor() {}

  static validate(timestamp: Date, date: Date): boolean {
    const maxAge = new Date(timestamp);
    maxAge.setDate(maxAge.getDate() + this.maxAgeInDate);
    return maxAge > date;
  }
}
