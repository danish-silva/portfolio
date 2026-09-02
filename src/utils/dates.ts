// Dates in content files are month precision (the day is always 01), so they
// are always shown as "May 2026". Month names are a fixed list rather than
// Intl output because en-AU abbreviates June as "June" and September as
// "Sept", which does not match the resume. getUTCMonth is used so a build
// machine in a negative timezone cannot roll a date back into the previous
// month.

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function formatMonth(date: Date): string {
  return `${MONTHS[date.getUTCMonth()]} ${date.getUTCFullYear()}`;
}

export function formatRange(start?: Date, end?: Date, ongoing = false): string {
  if (!start) return '';
  const from = formatMonth(start);
  if (ongoing) return `${from} to present`;
  if (!end) return from;
  const to = formatMonth(end);
  return from === to ? from : `${from} to ${to}`;
}
