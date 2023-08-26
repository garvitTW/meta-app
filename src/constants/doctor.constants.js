import URL from "./routesURL";

const addDoctorTabs = [
  {
    url: URL.DOCTOR.CREATE.PROFILE_DETAIL,
    title: "Profile Details",
  },
  {
    url: URL.DOCTOR.CREATE.PROFESSIONAL_DETAIL,
    title: "Professional Details",
  },
  {
    url: URL.DOCTOR.CREATE.PAYMENT,
    title: "Payment Plan",
  },
];
const editDoctorTabs = [
  {
    url: URL.DOCTOR.EDIT.PROFILE_DETAIL,
    title: "Profile Details",
  },
  {
    url: URL.DOCTOR.EDIT.PROFESSIONAL_DETAIL,
    title: "Professional Details",
  },
  {
    url: URL.DOCTOR.EDIT.PAYMENT,
    title: "Payment Plan",
  },
];

export { addDoctorTabs, editDoctorTabs };
