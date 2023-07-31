import "./style.scss";
import { Col, Row } from "react-bootstrap";
import Dashboardfirst from "../../assests/images/dashborad/orga.svg";
import Dashboardsecond from "../../assests/images/dashborad/patient.svg";
import Dashboardthird from "../../assests/images/dashborad/doc.svg";
function Dashboard() {
  return (
    <>
      <div className="dashboard_page">
        <Row>
          <Col md={4}>
            <div className="inner_div">
              <div>
                <img src={Dashboardfirst} />
              </div>
              <div className="ps-3">
                <p>Clinics</p>
                <p>1240</p>
              </div>
            </div>
          </Col>
          <Col md={4}>
            <div className="inner_div">
              <div>
                <img src={Dashboardsecond} />
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
                <img src={Dashboardthird} />
              </div>
              <div className="ps-3">
                <p>Total Doctors</p>
                <p>1240</p>
              </div>
            </div>
          </Col>
          <Col md={4}>
            <div className="inner_div">
              <div>
                <img src={Dashboardfirst} />
              </div>
              <div className="ps-3">
                <p>Organisations</p>
                <p>1240</p>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Dashboard;
