import './style.css';

document
  .querySelector<HTMLButtonElement>('#settings')!
  .addEventListener('click', () => {
    chrome.tabs.create({ url: './settings.html' });
  });
