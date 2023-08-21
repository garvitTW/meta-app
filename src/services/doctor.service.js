import apiURL from "../constants/apiURL";
import { apiService } from "./api.service";

async function getDoctorSummary(params) {
  return apiService.get(apiURL.DOCTOR_SUMMARY, params);
}

async function changeDoctorStatus(id, body) {
  return apiService.put(apiURL.DOCTOR_SUMMARY + id + "/", body);
}
async function getDoctorNameId() {
  return apiService.get(apiURL.DOCTOR_LIST);
}
export const doctorService = {
  getDoctorSummary,
  changeDoctorStatus,
  getDoctorNameId,
};
