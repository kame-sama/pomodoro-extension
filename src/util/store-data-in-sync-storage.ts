export default function storeDataInSyncStorage(
  items: Partial<SyncStorageDataMap>
): Promise<void> {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.set(items, () => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve();
      }
    });
  });
}
