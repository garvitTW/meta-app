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
  return apiService.post(apiURL.ORGANISATION_CLINIC, body);
}
async function getOrganisationClinic(id) {
  return apiService.get(apiURL.ORGANISATION_CLINIC + id + "/");
}
async function updateOrganisationClinic(id, body) {
  return apiService.put(apiURL.ORGANISATION_CLINIC + id + "/", body);
}
async function postOrganisationClinicDocument(id, body) {
  return apiService.postForm(
    apiURL.ADD_ORGANISATION_CLINIC_DOCUMENT + id,
    body
  );
}
async function getOrganisationSummary(params) {
  return apiService.get(apiURL.ORGANISATION_SUMMARY_LIST, params);
}
async function getOrganisationNameId() {
  return apiService.get(apiURL.ORGANISATION_LIST);
}

async function changeOrganisationStatus(id, body) {
  return apiService.put(apiURL.ORGANISATION_SUMMARY_LIST + id + "/", body);
}

async function checkOrganisationMail(params) {
  return apiService.get(apiURL.ORGANISATION_EMAIL_CHECK, params);
}

async function deleteOrganisationDocument(id) {
  return apiService.delete(apiURL.ORGANISATION_DOCUMENT + id + "/");
}

export const OrganisationService = {
  getServicesOffered,
  getLanguages,
  postServicesOffered,
  postOrganisationClinic,
  postOrganisationClinicDocument,
  getOrganisationSummary,
  changeOrganisationStatus,
  getOrganisationClinic,
  getOrganisationNameId,
  updateOrganisationClinic,
  checkOrganisationMail,
  deleteOrganisationDocument,
};
