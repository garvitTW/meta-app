import URL from "./routesURL";
import Login from "../pages/login";
import Verification from "../pages/verification";
import Dashboard from "../pages/dashboard";
import PatientListing from "../pages/patient/listing";
import OrganisationListing from "../pages/organisation/listing";
import OrgnisationPending from "../pages/organisation/pending";
import OrganisationDeclined from "../pages/organisation/declined";
import AddOrganisationProfile from "../pages/organisation/add/profileDetails";
import AddOrganisationProfessional from "../pages/organisation/add/professionalDetails";
import EditOrganisationProfile from "../pages/organisation/edit/profileDetails";
import EditOrganisationProfessional from "../pages/organisation/edit/professionalDetails";
import ClinicListing from "../pages/clinic/listing";
import DoctorListing from "../pages/doctor/listing";

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
  },
  {
    id: 4,
    path: URL.PATIENT.LISTING,
    component: PatientListing,
  },
  {
    id: 5,
    path: URL.ORGANISATION.LISTING,
    component: OrganisationListing,
  },
  {
    id: 6,
    path: URL.ORGANISATION.PENDING,
    component: OrgnisationPending,
  },
  {
    id: 7,
    path: URL.ORGANISATION.DECLINED,
    component: OrganisationDeclined,
  },
  {
    id: 8,
    path: URL.ORGANISATION.CREATE.PROFILE_DETAIL,
    component: AddOrganisationProfile,
  },
  {
    id: 9,
    path: URL.ORGANISATION.CREATE.PROFESSIONAL_DETAIL,
    component: AddOrganisationProfessional,
  },
  {
    id: 10,
    path: URL.ORGANISATION.EDIT.PROFILE_DETAIL,
    component: EditOrganisationProfile,
  },
  {
    id: 11,
    path: URL.ORGANISATION.EDIT.PROFESSIONAL_DETAIL,
    component: EditOrganisationProfessional,
  },
  {
    id: 12,
    path: URL.CLINIC.LISTING,
    component: ClinicListing,
  },
  {
    id: 13,
    path: URL.DOCTOR.LISTING,
    component: DoctorListing,
  },
];

export { publicRoutes, protectedRoutes };
