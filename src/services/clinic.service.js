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

async function createClinic(body) {
  return apiService.post(apiURL.CLINIC, body);
}

async function postClinicDocument(body) {
  return apiService.postForm(apiURL.CLINIC_DOCUMENT, body);
}

export const clinicService = {
  getClinicSummary,
  changeClinicStatus,
  getClinicNameId,
  createClinic,
  postClinicDocument,
};
