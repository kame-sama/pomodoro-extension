export default function storeDataInSessionStorage(
  items: Partial<SessionStorageDataMap>
): Promise<void> {
  return new Promise((resolve, reject) => {
    chrome.storage.session.set(items, () => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve();
      }
    });
  });
}
