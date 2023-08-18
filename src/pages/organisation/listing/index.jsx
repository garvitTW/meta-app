import PaginationSection from "../../../components/PaginationSection";
import { Table, InputGroup, Row, Form, Col, Tabs, Tab } from "react-bootstrap";
import Search from "../../../assests/images/dashborad/Search.png";
import AddIcon from "../../../assests/images/dashborad/add.png";
import "./style.scss";
import Pending from "../../organisation/pending";
import Decliend from "../../organisation/declined";
import { useNavigate } from "react-router-dom";
import URL from "../../../constants/routesURL";
import { useContext, useEffect, useState } from "react";
import ModalComponent from "../../../components/modal";
import ClinicListing from "../../clinic/listing";
import DoctorListing from "../../doctor/listing";
import PatientListing from "../../patient/listing";
import { OrganisationService } from "../../../services/Organisation.service";
import { useDebounce } from "../../../hooks/debounce";
import { itemsPerPage } from "../../../constants/common.constants";
import { Store } from "../../../store/Store";
import { Type } from "../../../constants/storeAction.constants";

const popUpComponents = [
  {
    name: "clinic",
    component: <ClinicListing />,
  },
  {
    name: "doctor",
    component: <DoctorListing />,
  },
  {
    name: "patient",
    component: <PatientListing />,
  },
];

function OrganisationListing() {
  const [show, setShow] = useState(false);
  const [organizations, setOrganizations] = useState([]);
  const [search, setSearch] = useState("");
  const { dispatch } = useContext(Store);
  const [totalItems, setTotalItems] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);

  const debouncedSearchTerm = useDebounce(search, 600);

  const navigate = useNavigate();
  const handleShow = (name) => setShow(name);
  const handleTabChange = (eventKey) => {
    navigate(eventKey);
  };

  const getPopUpComponent = () => {
    return popUpComponents.find((comp) => comp.name === show)?.component;
  };
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { results } = await OrganisationService.getOrganisationSummary({
          search: debouncedSearchTerm,
          // page: itemsPerPage,
          // page_num: currentPage,
        });
        setOrganizations(results);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [debouncedSearchTerm, currentPage]);

  const handleSwitchToggle = async (organization) => {
    try {
      const { organization_id, enabled } = organization;
      const { data } = await OrganisationService.changeOrganisationStatus(
        organization_id,
        { enabled: !enabled }
      );
      const updatedOrganisation = organizations?.map((organization) => {
        if (organization.organization_id === data.organization_id) {
          organization.enabled = data.enabled;
          return organization;
        } else {
          return organization;
        }
      });
      setOrganizations(updatedOrganisation);
    } catch (err) {
      console.log(err);
    }
  };
  const handleEditOrganisation = async (id) => {
    try {
      const { data } = await OrganisationService.getOrganisationClinic(id);
      dispatch({ type: Type.EDIT_ORGANISATION_DETAILS, payload: data });
      navigate(URL.ORGANISATION.EDIT.PROFILE_DETAIL);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="Patients_section Organization-section">
        <div>
          <div className="d-inline-block">
            <h1>Organization Clinics</h1>
          </div>
          <div className="right-header">
            <div className="position-relative">
              <img className="search-img" src={Search} alt="search" />
              <input
                value={search}
                onChange={(e) => handleSearch(e)}
                className=" search-input"
                placeholder="Search by Organisation Name"
              />
            </div>
            <div>
              <button className="btn export-button w-export">Export</button>
            </div>
            <button
              onClick={() => navigate(URL.ORGANISATION.CREATE.PROFILE_DETAIL)}
              className="btn Organization-button"
            >
              <img src={AddIcon} className="pe-2" alt="add" />
              Add Organization
            </button>
          </div>
        </div>

        <Tabs
          defaultActiveKey={URL.ORGANISATION.LISTING}
          id="uncontrolled-tab-example"
          className="organise_tabs w-100"
          onSelect={handleTabChange}
        >
          <Tab
            eventKey={URL.ORGANISATION.LISTING}
            title="Registered (50)"
          ></Tab>
          <Tab eventKey={URL.ORGANISATION.PENDING} title="Pending(20)">
            <Pending />
          </Tab>
          <Tab eventKey={URL.ORGANISATION.DECLINED} title="Declined(45)">
            <Decliend />
          </Tab>
        </Tabs>
        <Row className="table-margin">
          <Col md={12}>
            <Table
              responsive
              className="stripednew table-stripednew Patients-table"
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
                  <th> Clinics</th>
                  <th> Doctors</th>
                  <th>Patients</th>
                  <th> Status</th>
                  <th> Enable/Disable</th>
                </tr>
              </thead>
              <tbody>
                {organizations?.map((organization) => (
                  <tr key={organization?.organization_id}>
                    <td>
                      <InputGroup className="mb-3">
                        <InputGroup.Checkbox aria-label="Checkbox for following text input" />
                      </InputGroup>
                    </td>
                    <td
                      className="name-textunder"
                      onClick={() =>
                        handleEditOrganisation(organization?.organization_id)
                      }
                    >
                      {organization?.organization_name}
                    </td>
                    <td>{organization.organization_email}</td>
                    <td
                      className="name-text"
                      onClick={() => handleShow(popUpComponents[0].name)}
                    >
                      {organization?.clinics_count}
                    </td>
                    <td
                      className="name-text"
                      onClick={() => handleShow(popUpComponents[1].name)}
                    >
                      {organization?.doctors_count}
                    </td>
                    <td
                      className="name-text"
                      onClick={() => handleShow(popUpComponents[2].name)}
                    >
                      {organization?.patients_count}
                    </td>
                    <td>
                      <button className="RegisteredButton">
                        {organization?.organization_status}
                      </button>
                    </td>
                    <td>
                      <div>
                        <Form>
                          <Form.Check
                            type="switch"
                            id="custom-switch"
                            label=""
                            checked={organization?.enabled}
                            onChange={() => handleSwitchToggle(organization)}
                          />
                        </Form>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
          <Col md={12}>
            <PaginationSection
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              count={totalItems}
            />
          </Col>
        </Row>
      </div>
      <ModalComponent setShow={setShow} show={show} className="maxWidth">
        {getPopUpComponent()}
      </ModalComponent>
    </>
  );
}

export default OrganisationListing;
