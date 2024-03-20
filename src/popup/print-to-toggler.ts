const toggler: HTMLButtonElement = document.querySelector('#toggler')!;

export default function printToToggler(text?: 'Start' | 'Pause') {
  if (text) {
    toggler.textContent = text;
  } else {
    toggler.textContent = toggler.textContent === 'Start' ? 'Pause' : 'Start';
  }
}
