export default function formatToTwoDigits(n: number): string {
  return n > 9 ? `${n}` : `0${n}`;
}
