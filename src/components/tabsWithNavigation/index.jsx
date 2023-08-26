import { Col, Row, Tab, Tabs } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { numArray } from "../../constants/common.constants";

function TabsWithNavigation({ tabs = [], heading }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const handleTabChange = (eventKey) => {
    navigate(eventKey);
  };
  return (
    <Row>
      <Col>
        <h1>{heading}</h1>
      </Col>
      <Col md={12}>
        <Tabs
          defaultActiveKey={pathname}
          id="uncontrolled-tab-example"
          className="organise_tabs"
          onSelect={handleTabChange}
        >
          {tabs?.map((tab, index) => (
            <Tab
              key={numArray[index]}
              eventKey={tab?.url}
              title={tab?.title}
            ></Tab>
          ))}
        </Tabs>
      </Col>
    </Row>
  );
}

export default TabsWithNavigation;
