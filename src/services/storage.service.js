const getFromLocalStorage = (key) => {
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.log(`Error: Value not get in key:${key}`);
    return null;
  }
};

const setToLocalStorage = (key, data) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.log(`Error: Value not set in key:${key}`);
  }
};

const removeFromLocalStorage = (key) => {
  try {
    window.localStorage.removeItem(key);
  } catch (error) {
    console.log(`Error: Value not remove in key:${key}`);
  }
};

export const storageService = {
  getFromLocalStorage,
  setToLocalStorage,
  removeFromLocalStorage,
};
