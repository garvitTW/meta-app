const URL = {
  LOGIN: "/",
  VERIFICATION: "/verification",
  EMAIL_VERIFICATION: "/email-verification",
  EMAIL_VERIFICATION_FAILED: "/email-verification-failed",
  DASHBOARD: "/dashboard",
  PATIENT: {
    LISTING: "/patients/listing",
    CREATE: "/patients/create",
    EDIT: "/patients/edit",
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
    CREATE: {
      PROFILE_DETAIL: "/clinics/create/profile-detail",
      PROFESSIONAL_DETAIL: "/clinics/create/professional-detail",
      PAYMENT: "/clinics/create/payment",
    },
    EDIT: {
      PROFILE_DETAIL: "/clinics/edit/profile-detail",
      PROFESSIONAL_DETAIL: "/clinics/edit/professional-detail",
      PAYMENT: "/clinics/edit/payment",
    },
  },
  DOCTOR: {
    LISTING: "/doctors/listing",
    CREATE: {
      PROFILE_DETAIL: "/doctors/create/profile-detail",
      PROFESSIONAL_DETAIL: "/doctors/create/professional-detail",
      PAYMENT: "/doctors/create/payment",
    },
    EDIT: {
      PROFILE_DETAIL: "/doctors/edit/profile-detail",
      PROFESSIONAL_DETAIL: "/doctors/edit/professional-detail",
      PAYMENT: "/doctors/edit/payment",
    },
  },
  REPORTS: "/reports",
  SETTINGS: "/settings",
};

export default URL;
