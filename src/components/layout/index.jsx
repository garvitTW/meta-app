import { Col, Row } from "react-bootstrap";
import Header from "../header";
import SideBar from "../sideBar";

function Layout({ children }) {
  return (
    <>
      <div className="p-4">
        <Row>
          <Col sm={3}>
            <SideBar />
          </Col>
          <Col sm={9}>
            <Header />
            {children}
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Layout;
