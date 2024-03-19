export default function getDataFromSyncStorage<
  T extends keyof SyncStorageDataMap
>(key: T): Promise<SyncStorageDataMap[T]>;

export default function getDataFromSyncStorage(
  keys: Array<keyof SyncStorageDataMap>
): Promise<Partial<SyncStorageDataMap>>;

export default function getDataFromSyncStorage(
  key: keyof SyncStorageDataMap | Array<keyof SyncStorageDataMap>
): Promise<any> {
  return new Promise((resolve, reject) => {
    if (typeof key === 'string') {
      chrome.storage.sync.get(key, (data) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          if (!Object.keys(data).length) {
            resolve(undefined);
          } else {
            resolve(data[key]);
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
            resolve(data);
          }
        }
      });
    }
  });
}
