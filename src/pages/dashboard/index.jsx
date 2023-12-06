import "./style.scss";
import { Col, Row } from "react-bootstrap";
import Dashboardfirst from "../../assests/images/dashborad/orga.svg";
import Dashboardsecond from "../../assests/images/dashborad/patient.svg";
import Dashboardthird from "../../assests/images/dashborad/doc.svg";
import { useContext } from "react";
import { Store } from "../../store/Store";
import { roles } from "../../constants/common.constants";
function Dashboard() {
  const {
    state: {
      userInfo: { user_type },
    },
  } = useContext(Store);

  const cardPermissions = {
    clinic: [roles.admin, roles.organization],
    organization: [roles.admin],
  };

  const clinicCard = () => {
    return (
      cardPermissions.clinic.includes(user_type) && (
        <Col md={4}>
          <div className="inner_div">
            <div>
              <img src={Dashboardfirst} alt="img" />
            </div>
            <div className="ps-3">
              <p>Clinics</p>
              <p>1240</p>
            </div>
          </div>
        </Col>
      )
    );
  };

  const organizationCard = () => {
    return (
      cardPermissions.organization.includes(user_type) && (
        <Col md={4}>
          <div className="inner_div">
            <div>
              <img src={Dashboardfirst} alt="img" />
            </div>
            <div className="ps-3">
              <p>Organizations</p>
              <p>1240</p>
            </div>
          </div>
        </Col>
      )
    );
  };

  return (
    <div className="dashboard_page">
      <Row>
        {clinicCard()}
        <Col md={4}>
          <div className="inner_div">
            <div>
              <img src={Dashboardsecond} alt="img" />
            </div>
            <div className="ps-3">
              <p>Total Patients</p>
              <p>1240</p>
            </div>
          </div>
        </Col>
        <Col md={4}>
          <div className="inner_div">
            <div>
              <img src={Dashboardthird} alt="img" />
            </div>
            <div className="ps-3">
              <p>Total Doctors</p>
              <p>1240</p>
            </div>
          </div>
        </Col>
        {organizationCard()}
      </Row>
    </div>
  );
}

export default Dashboard;
