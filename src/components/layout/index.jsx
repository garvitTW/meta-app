import { useState } from "react";
import Header from "../header";
import SideBar from "../sideBar";
import "./style.scss";
function Layout({ children }) {
  const [isMenuFull,setIsMenuFull]=useState(true);
  return (
    <>
      <div>
        <div className="main_wrapper p-4">
          <div className="side-wrapper">
            <SideBar isMenuFull={isMenuFull} setIsMenuFull={setIsMenuFull}/>
          </div>
          <div className={isMenuFull?"content-wrapper":"content-wrapper_collpase"}>
            <Header />
            <div>{children}</div>
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
