export class TimeUtils {
  public static isFuture(date: Date): boolean {
    return date.getTime() > Date.now();
  }
}
