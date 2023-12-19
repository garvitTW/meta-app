import { roles } from "../../constants/common.constants";
import URL from "../../constants/routesURL";

const headerNames = {
  [URL.ORGANISATION.LISTING]: "Organization Clinics",
  [URL.ORGANISATION.PENDING]: "Organization Clinics",
  [URL.ORGANISATION.DECLINED]: "Organization Clinics",
  [URL.ORGANISATION.CREATE.PROFILE_DETAIL]: "Add Organization Clinics",
  [URL.ORGANISATION.CREATE.PROFESSIONAL_DETAIL]: "Add Organization Clinics",
  [URL.ORGANISATION.CREATE.PAYMENT]: "Add Organization Clinics",
  [URL.ORGANISATION.EDIT.PROFILE_DETAIL]: "Edit Organization Clinics",
  [URL.ORGANISATION.EDIT.PROFESSIONAL_DETAIL]: "Edit Organization Clinics",
  [URL.ORGANISATION.EDIT.PAYMENT]: "Edit Organization Clinics",
  [URL.DME]: "DME Lookup",
};

const headerRoles = {
  [roles.admin]: "Administrator",
  [roles.organization]: " Organization",
  [roles.clinic]: "Clinic",
};
export { headerRoles };

export default headerNames;
