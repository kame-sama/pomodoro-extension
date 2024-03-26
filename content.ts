const formatToTwoDigits = function (n: number): string {
  return n > 9 ? `${n}` : `0${n}`;
};

const getTimeLeftToAlarm = function (alarm: Alarm): number {
  return Math.round((alarm.scheduledTime - Date.now()) / 1000);
};

const printTimer = function (
  timerDiv: HTMLDivElement,
  timeLeftInSeconds: number,
): void {
  const m: number = Math.floor(timeLeftInSeconds / 60);
  const s: number = timeLeftInSeconds % 60;

  timerDiv.textContent = `${formatToTwoDigits(m)}:${formatToTwoDigits(s)}`;
};

const dialog: HTMLDialogElement = document.createElement('dialog');
const timer: HTMLDivElement = document.createElement('div');

dialog.id = '__pomodoro__extension__overlay__';
dialog.style.background = 'rgba(255, 99, 71, 0.8)';
dialog.style.color = 'cornsilk';
dialog.style.backdropFilter = 'blur(2px)';
dialog.style.width = '100vw';
dialog.style.height = '100vh';
dialog.style.border = 'none';
dialog.style.outline = 'none';
dialog.style.borderRadius = 'none';
dialog.style.margin = '0';
dialog.style.maxWidth = '100%';
dialog.style.maxHeight = '100%';

timer.id = '__pomodoro__extension__timer__';
timer.style.height = '100%';
timer.style.fontSize = '50vh';
timer.style.fontWeight = 'bold';
timer.style.display = 'flex';
timer.style.justifyContent = 'center';
timer.style.alignItems = 'center';

dialog.appendChild(timer);
document.body.appendChild(dialog);

setInterval(async () => {
  const alarm = await chrome.runtime.sendMessage({ msg: 'IS_FOCUS_TIME' });

  if (!document.querySelector('#__pomodoro__extension__overlay__')) {
    document.body.appendChild(dialog);
  }

  if (alarm) {
    if (!dialog.hasAttribute('open')) dialog.showModal();
    printTimer(timer, getTimeLeftToAlarm(alarm));
  } else {
    dialog.close();
  }
}, 1000);

chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
  if (request.msg === 'ARE_YOU_THERE_CONTENT_SCRIPT') {
    sendResponse({ msg: 'YES' });
  }
});
