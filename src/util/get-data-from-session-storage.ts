export default function getDataFromSessionStorage<
  T extends keyof SessionStorageDataMap
>(key: T): Promise<SessionStorageDataMap[T]>;

export default function getDataFromSessionStorage(
  keys: Array<keyof SessionStorageDataMap>
): Promise<Partial<SessionStorageDataMap>>;

export default function getDataFromSessionStorage(
  key: keyof SessionStorageDataMap | Array<keyof SessionStorageDataMap>
): Promise<any> {
  return new Promise((resolve, reject) => {
    if (typeof key === 'string') {
      chrome.storage.session.get(key, (data) => {
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
      chrome.storage.session.get((data) => {
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
