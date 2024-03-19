export default function getDataFromSyncStorage<
  T extends keyof SyncStorageDataMap
>(
  key: T | T[]
): Promise<SyncStorageDataMap[T] | Partial<SyncStorageDataMap> | undefined> {
  return new Promise((resolve, reject) => {
    if (typeof key === 'string') {
      chrome.storage.sync.get(key, (data) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          if (!Object.keys(data).length) {
            resolve(undefined);
          } else {
            resolve(data[key] as SyncStorageDataMap[T]);
          }
        }
      });
    } else {
      chrome.storage.sync.get((data) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          if (!Object.keys(data).length) {
            resolve(undefined);
          } else {
            resolve(data as Partial<SyncStorageDataMap>);
          }
        }
      });
    }
  });
}
