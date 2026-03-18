export function sanitizePhone(value) {
  return value.replace(/[^\d+]/g, "");
}

export function formatDisplayPhone(value) {
  const normalized = value.replace(/\s+/g, " ").trim();
  const compact = sanitizePhone(normalized);

  if (compact.startsWith("+91") && compact.length === 13) {
    const digits = compact.slice(3);
    return `+91 ${digits.slice(0, 5)} ${digits.slice(5)}`;
  }

  return normalized;
}

export function formatCreditPhone(value) {
  return `(${formatDisplayPhone(value.replace(/[()]/g, ""))})`;
}
