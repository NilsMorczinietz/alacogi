export function convertUnixToDate(unixTimestamp: number): Date {
  return new Date(unixTimestamp * 1000);
}
