import apiURL from "../constants/apiURL";
import { STORAGE_KEYS } from "../constants/common.constants";
import { apiService } from "./api.service";
import { storageService } from "./storage.service";

const isAuthenticated = () => {
  const token = storageService.getFromLocalStorage(STORAGE_KEYS.AUTH_TOKEN);
  return !!token && token;
};

const isRememberFor30Days = () => {
  const isRememberFor30DaysTrue = storageService.getFromLocalStorage(
    STORAGE_KEYS.REMEMBER_DEVICE_FOR_30_DAYS
  );
  return !!isRememberFor30DaysTrue && isRememberFor30DaysTrue;
};

const getUserDetails = () => {
  const userData =
    storageService.getFromLocalStorage(STORAGE_KEYS.USER_DETAILS) ?? null;
  return userData;
};

const logout = () => {
  storageService.removeFromLocalStorage(STORAGE_KEYS.AUTH_TOKEN);
  storageService.removeFromLocalStorage(STORAGE_KEYS.USER_DETAILS);
  storageService.removeFromLocalStorage(
    STORAGE_KEYS.REMEMBER_DEVICE_FOR_30_DAYS
  );
};

const login = (values) => {
  return apiService.post(apiURL.LOGIN, values);
};

export const setUserDetails = (user) => {
  storageService.setToLocalStorage(STORAGE_KEYS.USER_DETAILS, user);
};

export const setRememberFor30Days = (value) => {
  storageService.setToLocalStorage(
    STORAGE_KEYS.REMEMBER_DEVICE_FOR_30_DAYS,
    value
  );
};

export const setAuthToken = (token) => {
  storageService.setToLocalStorage(STORAGE_KEYS.AUTH_TOKEN, token);
};

const acceptTermsAndCondition = (id) => {
  return apiService.get(apiURL.ACCEPT_TERMS_AND_CONDITION + id + "/");
};

const verifyOtp = (body) => {
  return apiService.post(apiURL.VERIFY_OTP, body);
};

const resendOtp = (email) => {
  return apiService.get(apiURL.RESEND_OTP, email);
};

export const authService = {
  isAuthenticated,
  isRememberFor30Days,
  getUserDetails,
  logout,
  login,
  acceptTermsAndCondition,
  verifyOtp,
  resendOtp,
};
