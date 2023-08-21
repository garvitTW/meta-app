import apiURL from "../constants/apiURL";
import { apiService } from "./api.service";

async function getPatientSummary(params) {
  return apiService.get(apiURL.PATIENT_SUMMARY, params);
}

async function changePatientStatus(id, body) {
  return apiService.put(apiURL.PATIENT_SUMMARY + id + "/", body);
}

export const patientService = {
  getPatientSummary,
  changePatientStatus,
};
