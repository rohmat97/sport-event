const localStorageKey = 'auth';

export const saveDataToLocalStorage = (data: any) => {
  try {
    const serializedData = JSON.stringify(data);
    localStorage.setItem(localStorageKey, serializedData);
  } catch (error) {
    console.error('Error saving data to local storage:', error);
  }
};

export const getDataFromLocalStorage = () => {
  try {
    const serializedData = localStorage.getItem(localStorageKey);
    return serializedData ? JSON.parse(serializedData) : null;
  } catch (error) {
    console.error('Error getting data from local storage:', error);
    return null;
  }
};