const URL = {
  LOGIN: "/",
  VERIFICATION: "/verification",
  DASHBOARD: "/dashboard",
  PATIENT: {
    LISTING: "/patient/listing",
  },
  ORGANISATION: {
    LISTING: "/organisation/listing",
    PENDING: "/organisation/pending",
    DECLINED: "/organisation/declined",
    CREATE: {
      PROFILE_DETAIL: "/organisation/create/profile-detail",
      PROFESSIONAL_DETAIL: "/organisation/create/professional-detail",
      PAYMENT:"/organisation/create/payment"
    },
    EDIT: {
      PROFILE_DETAIL: "/organisation/edit/profile-detail",
      PROFESSIONAL_DETAIL: "/organisation/edit/professional-detail",
      PAYMENT:"/organisation/edit/payment"
    },
  },
  CLINIC: {
    LISTING: "/clinic/listing",
  },
  DOCTOR: {
    LISTING: "/doctor/listing",
  },
  REPORTS: "/reports",
  SETTINGS:"/settings"
};

export default URL;
