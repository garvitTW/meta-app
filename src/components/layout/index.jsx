import { Col, Row } from "react-bootstrap";
import Header from "../header";
import SideBar from "../sideBar";
import "./style.scss";
function Layout({ children }) {
  return (
    <>
      <div className="p-4">
        <div className="main_wrapper">
          <div className="side-wrapper">
          <SideBar />
          </div>
          <div className="content-wrapper">
          <Header />
          {children}
          </div>
        </div>




        {/* <Row>
          <Col sm={3}>
            <SideBar />
          </Col>
          <Col sm={9} className="ps-0">
            <Header />
            {children}
          </Col>
        </Row> */}
      </div>
    </>
  );
}

export default Layout;
