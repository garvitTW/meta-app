import { Col, Row, Tab, Tabs } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { numArray } from "../../constants/common.constants";

function TabsWithNavigation({
  tabs = [],
  heading,
  handleTabsChange = () => {},
  errors = {},
}) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const handleTabChange = (eventKey) => {
    if (Object.keys(errors).length === 0) {
      handleTabsChange();
      navigate(eventKey);
    }
  };
  return (
    <Row>
      <Col>
        <h1>{heading}</h1>
      </Col>
      <Col md={12}>
        <Tabs
          activeKey={pathname}
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
