import { STORAGE_KEYS } from "../constants/common.constants";
import { apiService } from "./api.service";
import { storageService } from "./storage.service";

const isAuthenticated = () => {
  const token = storageService.getFromLocalStorage(STORAGE_KEYS.AUTH_TOKEN);
  return !!token && token;
};

const getUserDetails = () => {
  const userData =
    storageService.getFromLocalStorage(STORAGE_KEYS.USER_DETAILS) ?? null;
  return userData;
};

const logout = () => {
  storageService.removeFromLocalStorage(STORAGE_KEYS.AUTH_TOKEN);
  storageService.removeFromLocalStorage(STORAGE_KEYS.USER_DETAILS);
};

const login = (values) => {
  return apiService.post("login/", values);
};

export const setUserDetails = (user) => {
  storageService.setToLocalStorage(STORAGE_KEYS.USER_DETAILS, user);
};

export const setRememberMe = (rememberMe, values) => {
  if (rememberMe) {
    storageService.setToLocalStorage(STORAGE_KEYS.REMEMBER_ME_DETAILS, values);
  } else {
    storageService.removeFromLocalStorage(STORAGE_KEYS.REMEMBER_ME_DETAILS);
  }
};

export const setAuthToken = (token) => {
  storageService.setToLocalStorage(STORAGE_KEYS.AUTH_TOKEN, token);
};

export const authService = {
  isAuthenticated,
  getUserDetails,
  setRememberMe,
  logout,
  login,
};
