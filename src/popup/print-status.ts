const statusBar: NodeListOf<HTMLDivElement> =
  document.querySelectorAll('.status-bar > *');

export default function printStatus(status: TimerName) {
  statusBar.forEach((item) => {
    if (item.id === status) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });
}
