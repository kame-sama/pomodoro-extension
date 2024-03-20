import formatToTwoDigits from '../util/format-to-two-digits';

const timer: HTMLDivElement = document.querySelector('.timer')!;

export default function printTimer(timeLeftInSeconds: number): void {
  const m: number = Math.floor(timeLeftInSeconds / 60);
  const s: number = timeLeftInSeconds % 60;

  timer.textContent = `${formatToTwoDigits(m)}:${formatToTwoDigits(s)}`;
}
