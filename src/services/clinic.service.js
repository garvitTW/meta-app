import apiURL from "../constants/apiURL";
import { apiService } from "./api.service";

async function getClinicSummary(params) {
  return apiService.get(apiURL.CLINIC_SUMMARY, params);
}

export const clinicService = {
  getClinicSummary,
};
