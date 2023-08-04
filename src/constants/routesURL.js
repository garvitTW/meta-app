const URL = {
  LOGIN: "/",
  VERIFICATION: "/verification",
  DASHBOARD: "/dashboard",
  PATIENT: {
    LISTING: "/patients/listing",
  },
  ORGANISATION: {
    LISTING: "/organisations/listing",
    PENDING: "/organisations/pending",
    DECLINED: "/organisations/declined",
    CREATE: {
      PROFILE_DETAIL: "/organisations/create/profile-detail",
      PROFESSIONAL_DETAIL: "/organisations/create/professional-detail",
      PAYMENT: "/organisations/create/payment",
    },
    EDIT: {
      PROFILE_DETAIL: "/organisations/edit/profile-detail",
      PROFESSIONAL_DETAIL: "/organisations/edit/professional-detail",
      PAYMENT: "/organisations/edit/payment",
    },
  },
  CLINIC: {
    LISTING: "/clinics/listing",
  },
  DOCTOR: {
    LISTING: "/doctors/listing",
  },
  REPORTS: "/reports",
  SETTINGS: "/settings",
};

export default URL;
