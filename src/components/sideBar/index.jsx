import "./style.scss";
import Logo from "../../assests/images/sidebar/logo.png";
import Dashboard from "../../assests/images/sidebar/dashboard.png";
import Patients from "../../assests/images/sidebar/patient.png";
import Organization from "../../assests/images/sidebar/organise.png";
import Clinics from "../../assests/images/sidebar/doct.png";
import Doctors from "../../assests/images/sidebar/clinic.png";
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
                <img src={Dashboard} />
              </span>
              <span>Dashboard</span>
            </li>
            <li>
              <span>
                <img src={Patients} />
              </span>
              <span>Patients</span>
            </li>
            <li>
              <span>
                <img src={Organization} />
              </span>
              <span>Organization Clinics</span>
            </li>
            <li>
              <span>
                <img src={Clinics} />
              </span>
              <span>Clinics</span>
            </li>
            <li>
              <span><img src={Doctors}/></span>
              <span>Doctors</span>
            </li>
            <li>
              <span><img src={Reports}/></span>
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
