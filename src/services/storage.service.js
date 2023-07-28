import CryptoJS from "crypto-js";
import { STORAGE_KEYS } from "../constants/common.constants";

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

const encryptCredentials = (rememberMe, value) => {
  if (rememberMe) {
    const encryptedPassword = CryptoJS.AES.encrypt(
      value.password,
      process.env.REACT_APP_SECRET_KEY
    ).toString();

    // Save the encrypted email and password to localStorage

    storageService.setToLocalStorage(STORAGE_KEYS.REMEMBER_ME_DETAILS, {
      ...value,
      password: encryptedPassword,
    });
  } else {
    storageService.removeFromLocalStorage(STORAGE_KEYS.REMEMBER_ME_DETAILS);
  }
};

const decryptCredentials = () => {
  // Retrieve encrypted email and password from localStorage
  const encryptedData = storageService.getFromLocalStorage(
    STORAGE_KEYS.REMEMBER_ME_DETAILS
  );

  if (encryptedData) {
    try {
      const decryptedPassword = CryptoJS.AES.decrypt(
        encryptedData.password,
        process.env.REACT_APP_SECRET_KEY
      ).toString(CryptoJS.enc.Utf8);

      // Use decryptedEmail and decryptedPassword for authentication
      return { email: encryptedData.email, password: decryptedPassword };
    } catch (error) {
      // Handle decryption error
      console.error("Error decrypting credentials:", error);
    }
  }

  // Return null if no credentials found or decryption failed
  return null;
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
  encryptCredentials,
  decryptCredentials,
};
