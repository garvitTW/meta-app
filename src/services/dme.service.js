import apiURL from "../constants/apiURL";
import { apiService } from "./api.service";

async function getDMELookUp(params) {
  return apiService.get(apiURL.DME_LOOKUP, params);
}

async function getCompanyName(params) {
  return apiService.get(apiURL.COMPANY_SEARCH, params);
}

async function getDiagnosisName(params) {
  return apiService.get(apiURL.DIAGNOSIS_SEARCH, params);
}

export const dmeService = {
  getDMELookUp,
  getCompanyName,
  getDiagnosisName,
};
