import apiURL from "../constants/apiURL";
import { apiService } from "./api.service";

async function getServicesOffered() {
  return apiService.get(apiURL.ORGANISATION_SERVICE);
}
async function getLanguages() {
  return apiService.get(apiURL.LISTING_OF_LANGUAGES);
}
async function postServicesOffered(body) {
  return apiService.post(apiURL.ORGANISATION_SERVICE, body);
}
async function postOrganisationClinic(body) {
  return apiService.post(apiURL.ADD_ORGANISATION_CLINIC, body);
}
async function postOrganisationClinicDocument(id, body) {
  return apiService.postForm(
    apiURL.ADD_ORGANISATION_CLINIC_DOCUMENT + id,
    body
  );
}

export const OrganisationService = {
  getServicesOffered,
  getLanguages,
  postServicesOffered,
  postOrganisationClinic,
  postOrganisationClinicDocument,
};
