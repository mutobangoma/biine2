export function validateEmail(email) {
  if (!email) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).toLowerCase());
}

export function validatePhone(phone) {
  if (!phone) return false;
  // simple E.164-ish check (very permissive)
  return /^\+?[1-9]\d{6,14}$/.test(phone);
}
