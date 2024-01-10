import { roles } from "../../constants/common.constants";
import URL from "../../constants/routesURL";

const headerNames = {
  [URL.ORGANISATION.LISTING]: "Organization",
  [URL.ORGANISATION.PENDING]: "Organization",
  [URL.ORGANISATION.DECLINED]: "Organization",
  [URL.ORGANISATION.CREATE.PROFILE_DETAIL]: "Add Organization",
  [URL.ORGANISATION.CREATE.PROFESSIONAL_DETAIL]: "Add Organization",
  [URL.ORGANISATION.CREATE.PAYMENT]: "Add Organization",
  [URL.ORGANISATION.EDIT.PROFILE_DETAIL]: "Edit Organization",
  [URL.ORGANISATION.EDIT.PROFESSIONAL_DETAIL]: "Edit Organization",
  [URL.ORGANISATION.EDIT.PAYMENT]: "Edit Organization",
  [URL.DME]: "DME Lookup",
};

const headerRoles = {
  [roles.admin]: "Administrator",
  [roles.organization]: " Organization",
  [roles.clinic]: "Clinic",
};
export { headerRoles };

export default headerNames;
