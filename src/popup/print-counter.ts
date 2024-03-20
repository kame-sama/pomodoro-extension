const counter: HTMLDivElement = document.querySelector('.counter')!;

export default function (count: number): void {
  counter!.textContent = `#${count}`;
}
