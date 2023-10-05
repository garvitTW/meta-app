import "./style.scss";
import PaginationSection from "../../../components/PaginationSection";
import {
  Table,
  InputGroup,
  Row,
  Col,
  Button,
  Tabs,
  Tab,
} from "react-bootstrap";
import EditIcon from "../../../assests/images/dashborad/edit.png";
import { useNavigate } from "react-router-dom";
import Search from "../../../assests/images/dashborad/Search.png";
import AddIcon from "../../../assests/images/dashborad/add.png";
import URL from "../../../constants/routesURL";
function OrganisationDeclined() {
  const navigate = useNavigate();
  const handleTabChange = (eventKey) => {
    navigate(eventKey);
  };
  return (
    <>
      <div className="Patients_section Organization-section">
        <Row>
          <Col md={3}>
            <h1>Organization Clinics</h1>
          </Col>
          <Col md={4}>
            <div className="position-relative">
              <img className="search-img" src={Search} alt="search" />
              <input
                className="w-100 search-input"
                placeholder="Search by Organization Name"
              />
            </div>
          </Col>
          <Col md={2}>
            <button className="btn export-button">Export</button>
          </Col>
          <Col md={3}>
            <button
              onClick={() => navigate(URL.ORGANISATION.CREATE.PROFILE_DETAIL)}
              className="btn Organization-button"
            >
              <img src={AddIcon} className="pe-2" alt="add" />
              Add Organization
            </button>
          </Col>
        </Row>
        <Tabs
          defaultActiveKey={URL.ORGANISATION.DECLINED}
          id="uncontrolled-tab-example"
          className="organise_tabs"
          onSelect={handleTabChange}
        >
          <Tab eventKey={URL.ORGANISATION.LISTING} title="Registered (5)"></Tab>
          <Tab eventKey={URL.ORGANISATION.PENDING} title="Pending(6)"></Tab>
          <Tab eventKey={URL.ORGANISATION.DECLINED} title="Declined(9)"></Tab>
        </Tabs>
        <Row className="table-margin">
          <Col md={12}>
            <Table
              responsive
              className="table-stripednew Patients-table Decliend_table"
              variant="dark"
            >
              <thead>
                <tr>
                  <th>
                    <InputGroup className="mb-3">
                      <InputGroup.Checkbox aria-label="Checkbox for following text input" />
                    </InputGroup>
                  </th>
                  <th> Organizational Clinic Name</th>
                  <th> Email Address</th>
                  <th> Status</th>
                  <th> Reason</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <InputGroup className="mb-3">
                      <InputGroup.Checkbox aria-label="Checkbox for following text input" />
                    </InputGroup>
                  </td>
                  <td className="name-text">Apollo Clinic</td>
                  <td>loremipsum@mail.com</td>
                  <td>
                    <Button className="Declined_button">Declined</Button>
                  </td>
                  <td>
                    <div>
                      Incorrect Information provided ......{" "}
                      <span className="name-text">View More</span>
                    </div>
                  </td>
                  <td>
                    <Button className="Edit_button">
                      <img src={EditIcon} alt="edit" />
                    </Button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <InputGroup className="mb-3">
                      <InputGroup.Checkbox aria-label="Checkbox for following text input" />
                    </InputGroup>
                  </td>
                  <td className="name-text">Apollo Clinic</td>
                  <td>loremipsum@mail.com</td>
                  <td>
                    <Button className="Declined_button">Declined</Button>
                  </td>
                  <td>
                    <div>Incorrect Information provided</div>
                  </td>
                  <td>
                    <Button className="Edit_button">
                      <img src={EditIcon} alt="edit" />
                    </Button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <InputGroup className="mb-3">
                      <InputGroup.Checkbox aria-label="Checkbox for following text input" />
                    </InputGroup>
                  </td>
                  <td className="name-text">Apollo Clinic</td>
                  <td>loremipsum@mail.com</td>
                  <td>
                    <Button className="Declined_button">Declined</Button>
                  </td>
                  <td>
                    <div>Incorrect Information provided</div>
                  </td>
                  <td>
                    <Button className="Edit_button">
                      <img src={EditIcon} alt="edit" />
                    </Button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <InputGroup className="mb-3">
                      <InputGroup.Checkbox aria-label="Checkbox for following text input" />
                    </InputGroup>
                  </td>
                  <td className="name-text">Apollo Clinic</td>
                  <td>loremipsum@mail.com</td>
                  <td>
                    <Button className="Declined_button">Declined</Button>
                  </td>
                  <td>
                    <div>Incorrect Information provided</div>
                  </td>
                  <td>
                    <Button className="Edit_button">
                      <img src={EditIcon} alt="edit" />
                    </Button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <InputGroup className="mb-3">
                      <InputGroup.Checkbox aria-label="Checkbox for following text input" />
                    </InputGroup>
                  </td>
                  <td className="name-text">Apollo Clinic</td>
                  <td>loremipsum@mail.com</td>
                  <td>
                    <Button className="Declined_button">Declined</Button>
                  </td>
                  <td>
                    <div>Incorrect Information provided</div>
                  </td>
                  <td>
                    <Button className="Edit_button">
                      <img src={EditIcon} alt="edit" />
                    </Button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <InputGroup className="mb-3">
                      <InputGroup.Checkbox aria-label="Checkbox for following text input" />
                    </InputGroup>
                  </td>
                  <td className="name-text">Apollo Clinic</td>
                  <td>loremipsum@mail.com</td>
                  <td>
                    <Button className="Declined_button">Declined</Button>
                  </td>
                  <td>
                    <div>Incorrect Information provided</div>
                  </td>
                  <td>
                    <Button className="Edit_button">
                      <img src={EditIcon} alt="edit" />
                    </Button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <InputGroup className="mb-3">
                      <InputGroup.Checkbox aria-label="Checkbox for following text input" />
                    </InputGroup>
                  </td>
                  <td className="name-text">ORG - 1</td>
                  <td>loremipsum@mail.com</td>
                  <td>
                    <Button className="Declined_button">Declined</Button>
                  </td>
                  <td>
                    <div>Incorrect Information provided</div>
                  </td>
                  <td>
                    <Button className="Edit_button">
                      <img src={EditIcon} alt="edit" />
                    </Button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <InputGroup className="mb-3">
                      <InputGroup.Checkbox aria-label="Checkbox for following text input" />
                    </InputGroup>
                  </td>
                  <td className="name-text">Apollo Clinic</td>
                  <td>loremipsum@mail.com</td>
                  <td>
                    <Button className="Declined_button">Declined</Button>
                  </td>
                  <td>
                    <div>Incorrect Information provided</div>
                  </td>
                  <td>
                    <Button className="Edit_button">
                      <img src={EditIcon} alt="edit" />
                    </Button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <InputGroup className="mb-3">
                      <InputGroup.Checkbox aria-label="Checkbox for following text input" />
                    </InputGroup>
                  </td>
                  <td className="name-text">ORG - 1</td>
                  <td>loremipsum@mail.com</td>
                  <td>
                    <Button className="Declined_button">Declined</Button>
                  </td>
                  <td>
                    <div>Incorrect Information provided</div>
                  </td>
                  <td>
                    <Button className="Edit_button">
                      <img src={EditIcon} alt="edit" />
                    </Button>
                  </td>
                </tr>
              </tbody>
            </Table>
          </Col>
          <Col md={12}>
            <PaginationSection />
          </Col>
        </Row>
      </div>
    </>
  );
}

export default OrganisationDeclined;
