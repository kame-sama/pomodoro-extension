// Define interface for the first type of data
interface UserData {
  username: string;
  email: string;
}

// Define interface for the second type of data
interface SettingsData {
  theme: string;
  language: string;
}

// Define interface for the third type of data
interface PreferencesData {
  notifications: boolean;
  darkMode: boolean;
}

// Create a map interface to ensure type safety when retrieving data
interface StorageDataMap {
  userData: UserData;
  settingsData: SettingsData;
  preferencesData: PreferencesData;
}

// Function to get data from Chrome storage
export default function getDataFromSyncStorage<T extends keyof StorageDataMap>(
  key?: T | T[]
): Promise<
  StorageDataMap[T] | StorageDataMap | Partial<StorageDataMap> | undefined
> {
  // No key
  if (!key) {
    return new Promise((resolve, reject) => {
      chrome.storage.sync.get((data) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          if (!Object.keys(data).length) {
            resolve(undefined);
          } else {
            resolve(data as StorageDataMap);
          }
        }
      });
    });
  }

  // Single key
  if (typeof key === 'string') {
    return new Promise((resolve, reject) => {
      chrome.storage.sync.get(key, (data) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          if (!Object.keys(data).length) {
            resolve(undefined);
          } else {
            resolve(data[key] as StorageDataMap[T]);
          }
        }
      });
    });
  }

  // Multiple keys
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get(key, (data) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        if (!Object.keys(data).length) {
          resolve(undefined);
        } else {
          resolve(data as Partial<StorageDataMap>);
        }
      }
    });
  });
}
