import URL from "./routesURL";

const addClinicTabs = [
  {
    url: URL.CLINIC.CREATE.PROFILE_DETAIL,
    title: "Profile Details",
  },
  {
    url: URL.CLINIC.CREATE.PROFESSIONAL_DETAIL,
    title: "Professional Details",
  },
  {
    url: URL.CLINIC.CREATE.PAYMENT,
    title: "Payment Plan",
  },
];
const editClinicTabs = [
  {
    url: URL.CLINIC.EDIT.PROFILE_DETAIL,
    title: "Profile Details",
  },
  {
    url: URL.CLINIC.EDIT.PROFESSIONAL_DETAIL,
    title: "Professional Details",
  },
  {
    url: URL.CLINIC.EDIT.PAYMENT,
    title: "Payment Plan",
  },
];

export { addClinicTabs, editClinicTabs };
