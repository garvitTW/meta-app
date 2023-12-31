import apiURL from "../constants/apiURL";
import { apiService } from "./api.service";

async function getPatientSummary(params) {
  return apiService.get(apiURL.PATIENT_SUMMARY, params);
}

async function changePatientStatus(id, body) {
  return apiService.put(apiURL.PATIENT_SUMMARY + id + "/", body);
}

async function createPatient(body) {
  return apiService.post(apiURL.PATIENT, body);
}

async function getPatientDetails(id) {
  return apiService.get(apiURL.PATIENT + id + "/");
}
async function deletePatient(id) {
  return apiService.delete(apiURL.PATIENT + id + "/");
}
async function updatePatient(id, body) {
  return apiService.put(apiURL.PATIENT + id + "/", body);
}
async function checkPatientMail(params) {
  return apiService.get(apiURL.PATIENT_EMAIL_CHECK, params);
}

export const patientService = {
  getPatientSummary,
  changePatientStatus,
  createPatient,
  getPatientDetails,
  updatePatient,
  checkPatientMail,
  deletePatient,
};
