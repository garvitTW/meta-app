import apiURL from "../constants/apiURL";
import { apiService } from "./api.service";

async function getClinicSummary(params) {
  return apiService.get(apiURL.CLINIC_SUMMARY, params);
}

async function changeClinicStatus(id, body) {
  return apiService.put(apiURL.CLINIC_SUMMARY + id + "/", body);
}

async function getClinicNameId() {
  return apiService.get(apiURL.CLINIC_LIST);
}

export const clinicService = {
  getClinicSummary,
  changeClinicStatus,
  getClinicNameId,
};
