export function currency(amount, currencyCode = "USD") {
  if (amount == null) return "";
  return new Intl.NumberFormat(undefined, { style: "currency", currency: currencyCode }).format(amount);
}

export function shortDate(isoString) {
  if (!isoString) return "";
  const d = new Date(isoString);
  return d.toLocaleDateString();
}
