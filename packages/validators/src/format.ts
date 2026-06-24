export function formatINR(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatINRCompact(amount: number): string {
  if (amount >= 10_000_000) {
    const value = parseFloat((amount / 10_000_000).toFixed(2));
    return `₹${value}Cr`;
  }
  if (amount >= 100_000) {
    const value = parseFloat((amount / 100_000).toFixed(2));
    return `₹${value}L`;
  }
  return formatINR(amount);
}

export function parseINR(formatted: string): number {
  return Number(formatted.replace(/[₹,\s]/g, ""));
}
