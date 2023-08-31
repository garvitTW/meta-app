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
async function createDoctor(body) {
  return apiService.post(apiURL.DOCTOR, body);
}
async function postDoctorDocument(body) {
  return apiService.postForm(apiURL.DOCTOR_DOCUMENT, body);
}
async function getDoctorDetails(id) {
  return apiService.get(apiURL.DOCTOR + id + "/");
}
export const doctorService = {
  getDoctorSummary,
  changeDoctorStatus,
  getDoctorNameId,
  createDoctor,
  postDoctorDocument,
  getDoctorDetails,
};
