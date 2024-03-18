import './style.css';

document.querySelector('#settings')?.addEventListener('click', () => {
  chrome.tabs.create({ url: './settings.html' });
});
