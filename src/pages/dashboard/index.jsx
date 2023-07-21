import { Col,Row } from "react-bootstrap";
import Header from "../../components/header";
import SideBar from "../../components/sideBar";
import Patients from "../../components/Patients"
import "./style.scss";
function Dashboard() {
  return (
    <>
    <div className="p-4">
    <Row>
      <Col sm={3}>
      <SideBar />

      </Col>
      <Col sm={9}>
      <Header />
     <Patients/>
      </Col>
    </Row>
    </div>
   
    </>
  );
}

export default Dashboard;
