import "./style.scss";
import Logo from "../../assests/images/sidebar/logo.png";
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
import Setting from "../../assests/images/sidebar/setting.png";
import Logout from "../../assests/images/sidebar/logout.png";


function SideBar() {
  return (
    <>
      <div>
        <div className="Sidebar_menu">
          <div className="logo-border">
            <img src={Logo} />
          </div>
          <ul>
            <li>
              <span>
                <img src={Dashboard} className="image-first"/>
                <img src={DashboardHover} className="image-hover d-none"/>
              </span>
              <span>Dashboard</span>
            </li>
            <li>
              <span>
                <img src={Patients} className="image-first"/>
                <img src={PatientsHover} className="image-hover d-none"/>
              </span>
              <span>Patients</span>
            </li>
            <li>
              <span>
                <img src={Organization} className="image-first"/>
                <img src={Organizationhover} className="image-hover d-none"/>
              </span>
              <span>Organization Clinics</span>
            </li>
            <li>
              <span>
                <img src={Clinics} className="image-first" />
                <img src={ClinicsHover} className="image-hover d-none"/>
              </span>
              <span>Clinics</span>
            </li>
            <li>
              <span><img src={Doctors} className="image-first"/>
              <img src={Doctorshover} className="image-hover d-none"/>
              </span>
              <span>Doctors</span>
            </li>
            <li>
              <span><img src={Reports} className="image-first"/>
              <img src={DashboardHover} className="image-hover d-none"/>
              </span>
              <span>Reports</span>
            </li>
          </ul>
          <p>ACCOUNT</p>
          <ul>
            <li>
              <span><img src={Setting}/></span>
              <span>Settings</span>
            </li>
            <li>
              <span><img src={Logout}/></span>
              <span>Logout</span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default SideBar;
