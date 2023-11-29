import Dashboard from "../../assests/images/sidebar/dashboard.png";
import DashboardHover from "../../assests/images/sidebar/dashboard-hover.png";
import Patients from "../../assests/images/sidebar/patient.png";
import PatientsHover from "../../assests/images/sidebar/patient-hover.png";
import Organization from "../../assests/images/sidebar/organise.png";
import Organizationhover from "../../assests/images/sidebar/organise-hover.png";
import Clinics from "../../assests/images/sidebar/doct.png";
import ClinicsHover from "../../assests/images/sidebar/doct-hover.png";
import Doctors from "../../assests/images/sidebar/clinic.png";
import Doctorshover from "../../assests/images/sidebar/clinic-hover.png";
import Reports from "../../assests/images/sidebar/report.png";
import ReportHover from "../../assests/images/sidebar/report-hover.png";
import URL from "../../constants/routesURL";
import { roles } from "../../constants/common.constants";

const sideBarItems = [
  {
    id: 1,
    name: "Dashboard",
    image: Dashboard,
    hoverIamge: DashboardHover,
    navigate: URL.DASHBOARD,
    roles: [roles.admin, roles.organization, roles.clinic],
  },
  {
    id: 2,
    name: "Patients",
    image: Patients,
    hoverIamge: PatientsHover,
    navigate: URL.PATIENT.LISTING,
    roles: [roles.admin, roles.organization, roles.clinic],
  },
  {
    id: 3,
    name: "Organization Clinics",
    image: Organization,
    hoverIamge: Organizationhover,
    navigate: URL.ORGANISATION.LISTING,
    roles: [roles.admin],
  },
  {
    id: 4,
    name: "Clinics",
    image: Clinics,
    hoverIamge: ClinicsHover,
    navigate: URL.CLINIC.LISTING,
    roles: [roles.admin, roles.organization],
  },
  {
    id: 5,
    name: "Doctors",
    image: Doctors,
    hoverIamge: Doctorshover,
    navigate: URL.DOCTOR.LISTING,
    roles: [roles.admin, roles.organization, roles.clinic],
  },
  {
    id: 6,
    name: "Reports",
    image: Reports,
    hoverIamge: ReportHover,
    navigate: URL.REPORTS,
    roles: [roles.admin, roles.organization, roles.clinic],
  },
  {
    id: 7,
    name: "DME Lookup",
    image: Reports,
    hoverIamge: ReportHover,
    navigate: URL.DME,
    roles: [roles.admin],
  },
];

export default sideBarItems;
