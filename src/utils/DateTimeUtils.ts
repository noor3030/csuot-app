export function formatPeriod(value: string): string {
  if (value) {
    const parts = value.split(":");
    return parts[0] + ":" + parts[1];
  } else {
    return "unknown";
  }
}
