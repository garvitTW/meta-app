import URL from "./routesURL";
import Login from "../pages/login";
import Verification from "../pages/verification";
import Dashboard from "../pages/dashboard";
import PatientListing from "../pages/patient/listing";
import OrganisationListing from "../pages/organisation/listing";
import OrganisationPending from "../pages/organisation/pending";
import OrganisationDeclined from "../pages/organisation/declined";
import AddOrganisationProfile from "../pages/organisation/add/profileDetails";
import AddOrganisationProfessional from "../pages/organisation/add/professionalDetails";
import EditOrganisationProfile from "../pages/organisation/edit/profileDetails";
import EditOrganisationProfessional from "../pages/organisation/edit/professionalDetails";
import ClinicListing from "../pages/clinic/listing";
import DoctorListing from "../pages/doctor/listing";
import Reports from "../pages/reports";
import Settings from "../pages/setting";
import AddPayment from "../pages/organisation/add/payment";
import EditPayment from "../pages/organisation/edit/payment";
import AddClinicProfile from "../pages/clinic/add/profileDetails";
import AddClinicProfessional from "../pages/clinic/add/professionalDetails";
import AddClinicPayment from "../pages/clinic/add/payment";
import EditClinicProfile from "../pages/clinic/edit/profileDetails";
import EditClinicProfessional from "../pages/clinic/edit/professionalDetails";
import EditClinicPayment from "../pages/clinic/edit/payment";
import EditDoctorPayment from "../pages/doctor/edit/payment";
import EditDoctorProfessional from "../pages/doctor/edit/professionalDetails";
import EditDoctorProfile from "../pages/doctor/edit/profileDetails";
import AddDoctorPayment from "../pages/doctor/add/payment";
import AddDoctorProfessional from "../pages/doctor/add/professionalDetails";
import AddDoctorProfile from "../pages/doctor/add/profileDetails";
import { roles } from "./common.constants";
import addPatient from "../pages/patient/add";
import editPatient from "../pages/patient/edit";

const publicRoutes = [
  {
    id: 1,
    path: URL.LOGIN,
    component: Login,
  },
  {
    id: 2,
    path: URL.VERIFICATION,
    component: Verification,
  },
];

const protectedRoutes = [
  {
    id: 3,
    path: URL.DASHBOARD,
    component: Dashboard,
    roles: [roles.admin, roles.organization, roles.clinic],
  },
  {
    id: 4,
    path: URL.PATIENT.LISTING,
    component: PatientListing,
    roles: [roles.admin, roles.organization, roles.clinic],
  },
  {
    id: 30,
    path: URL.PATIENT.CREATE,
    component: addPatient,
    roles: [roles.admin, roles.organization, roles.clinic],
  },
  {
    id: 31,
    path: URL.PATIENT.EDIT,
    component: editPatient,
    roles: [roles.admin, roles.organization, roles.clinic],
  },
  {
    id: 5,
    path: URL.ORGANISATION.LISTING,
    component: OrganisationListing,
    roles: [roles.admin],
  },
  {
    id: 6,
    path: URL.ORGANISATION.PENDING,
    component: OrganisationPending,
    roles: [roles.admin],
  },
  {
    id: 7,
    path: URL.ORGANISATION.DECLINED,
    component: OrganisationDeclined,
    roles: [roles.admin],
  },
  {
    id: 8,
    path: URL.ORGANISATION.CREATE.PROFILE_DETAIL,
    component: AddOrganisationProfile,
    roles: [roles.admin],
  },
  {
    id: 9,
    path: URL.ORGANISATION.CREATE.PROFESSIONAL_DETAIL,
    component: AddOrganisationProfessional,
    roles: [roles.admin],
  },
  {
    id: 10,
    path: URL.ORGANISATION.CREATE.PAYMENT,
    component: AddPayment,
    roles: [roles.admin],
  },
  {
    id: 11,
    path: URL.ORGANISATION.EDIT.PROFILE_DETAIL,
    component: EditOrganisationProfile,
    roles: [roles.admin],
  },
  {
    id: 12,
    path: URL.ORGANISATION.EDIT.PROFESSIONAL_DETAIL,
    component: EditOrganisationProfessional,
    roles: [roles.admin],
  },
  {
    id: 13,
    path: URL.ORGANISATION.EDIT.PAYMENT,
    component: EditPayment,
    roles: [roles.admin],
  },
  {
    id: 14,
    path: URL.CLINIC.LISTING,
    component: ClinicListing,
    roles: [roles.admin, roles.organization],
  },
  {
    id: 15,
    path: URL.CLINIC.CREATE.PROFILE_DETAIL,
    component: AddClinicProfile,
    roles: [roles.organization],
  },
  {
    id: 16,
    path: URL.CLINIC.CREATE.PROFESSIONAL_DETAIL,
    component: AddClinicProfessional,
    roles: [roles.organization],
  },
  {
    id: 17,
    path: URL.CLINIC.CREATE.PAYMENT,
    component: AddClinicPayment,
    roles: [roles.organization],
  },
  {
    id: 18,
    path: URL.CLINIC.EDIT.PROFILE_DETAIL,
    component: EditClinicProfile,
    roles: [roles.admin, roles.organization],
  },
  {
    id: 19,
    path: URL.CLINIC.EDIT.PROFESSIONAL_DETAIL,
    component: EditClinicProfessional,
    roles: [roles.admin, roles.organization],
  },
  {
    id: 20,
    path: URL.CLINIC.EDIT.PAYMENT,
    component: EditClinicPayment,
    roles: [roles.admin, roles.organization],
  },
  {
    id: 21,
    path: URL.DOCTOR.LISTING,
    component: DoctorListing,
    roles: [roles.admin, roles.organization, roles.clinic],
  },
  {
    id: 22,
    path: URL.DOCTOR.CREATE.PROFILE_DETAIL,
    component: AddDoctorProfile,
    roles: [roles.organization, roles.clinic],
  },
  {
    id: 23,
    path: URL.DOCTOR.CREATE.PROFESSIONAL_DETAIL,
    component: AddDoctorProfessional,
    roles: [roles.organization, roles.clinic],
  },
  {
    id: 24,
    path: URL.DOCTOR.CREATE.PAYMENT,
    component: AddDoctorPayment,
    roles: [roles.organization, roles.clinic],
  },
  {
    id: 25,
    path: URL.DOCTOR.EDIT.PROFILE_DETAIL,
    component: EditDoctorProfile,
    roles: [roles.admin, roles.organization, roles.clinic],
  },
  {
    id: 26,
    path: URL.DOCTOR.EDIT.PROFESSIONAL_DETAIL,
    component: EditDoctorProfessional,
    roles: [roles.admin, roles.organization, roles.clinic],
  },
  {
    id: 27,
    path: URL.DOCTOR.EDIT.PAYMENT,
    component: EditDoctorPayment,
    roles: [roles.admin, roles.organization, roles.clinic],
  },
  {
    id: 28,
    path: URL.REPORTS,
    component: Reports,
    roles: [roles.admin, roles.organization, roles.clinic],
  },
  {
    id: 29,
    path: URL.SETTINGS,
    component: Settings,
    roles: [roles.admin, roles.organization, roles.clinic],
  },
];

export { publicRoutes, protectedRoutes };
