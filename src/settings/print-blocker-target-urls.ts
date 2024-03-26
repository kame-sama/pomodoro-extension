export default function printBlockerTargetUrls(
  ul: HTMLOListElement,
  urls: string[],
): void {
  ul.textContent = '';

  urls.forEach((url, i) => {
    const li: HTMLLIElement = document.createElement('li');
    li.textContent = url;
    li.className = 'flex';
    const button: HTMLButtonElement = document.createElement('button');
    button.textContent = 'Delete';
    button.className = 'button';
    button.setAttribute('data-id', `${i}`);
    li.appendChild(button);
    ul.appendChild(li);
  });
}
