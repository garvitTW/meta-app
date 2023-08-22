import PaginationSection from "../../../components/PaginationSection";
import { Table, InputGroup, Row, Form, Col, Tabs, Tab } from "react-bootstrap";
import Search from "../../../assests/images/dashborad/Search.png";
import AddIcon from "../../../assests/images/dashborad/add.png";
import "./style.scss";
import Pending from "../../organisation/pending";
import Declined from "../../organisation/declined";
import { useNavigate } from "react-router-dom";
import URL from "../../../constants/routesURL";
import { useContext, useEffect, useMemo, useState } from "react";
import ModalComponent from "../../../components/modal";
import ClinicListing from "../../clinic/listing";
import DoctorListing from "../../doctor/listing";
import PatientListing from "../../patient/listing";
import { OrganisationService } from "../../../services/Organisation.service";
import { useDebounce } from "../../../hooks/debounce";
import { Store } from "../../../store/Store";
import { Type } from "../../../constants/storeAction.constants";
import LoaderSpinner from "../../../components/spinner";
import jsPDF from "jspdf";
import "jspdf-autotable";

const popUpComponents = [
  {
    name: "clinic",
    component: ClinicListing,
  },
  {
    name: "doctor",
    component: DoctorListing,
  },
  {
    name: "patient",
    component: PatientListing,
  },
];

function OrganisationListing() {
  const [show, setShow] = useState(false);
  const [organizations, setOrganizations] = useState([]);
  const [search, setSearch] = useState("");
  const { dispatch } = useContext(Store);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [organisationIdForPopUp, setOrganisationIdForPopUp] = useState("");

  const debouncedSearchTerm = useDebounce(search, 600);

  const navigate = useNavigate();
  const handleShow = (name) => setShow(name);
  const handleTabChange = (eventKey) => {
    navigate(eventKey);
  };

  const GetPopUpComponent = useMemo(() => {
    const popUpComponent = popUpComponents.find((comp) => comp.name === show);
    return popUpComponent ? popUpComponent.component : null;
  }, [show]);

  const handlePopUp = (name, id, count) => {
    if (count > 0) {
      setOrganisationIdForPopUp(id);
      handleShow(name);
    }
  };
  const handleSearch = (e) => {
    setCurrentPage(1);
    setSearch(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { result, count } =
          await OrganisationService.getOrganisationSummary({
            search: debouncedSearchTerm,
            page: currentPage,
            // page_num: currentPage,
          });

        setOrganizations(result);
        setTotalItems(count);

        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    };
    fetchData();
  }, [debouncedSearchTerm, currentPage]);

  const handleSwitchToggle = async (organization) => {
    try {
      setLoading(true);
      const { id, enabled } = organization;
      const { data } = await OrganisationService.changeOrganisationStatus(id, {
        enabled: !enabled,
      });
      const updatedOrganisation = organizations?.map((organization) => {
        if (organization.id === data.organization_id) {
          organization.enabled = data.enabled;
          return organization;
        } else {
          return organization;
        }
      });
      setOrganizations(updatedOrganisation);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };
  const handleEditOrganisation = async (id) => {
    try {
      setLoading(true);
      const { data } = await OrganisationService.getOrganisationClinic(id);
      setLoading(false);
      dispatch({ type: Type.EDIT_ORGANISATION_DETAILS, payload: data });
      navigate(URL.ORGANISATION.EDIT.PROFILE_DETAIL);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };
  function getEnableDisableValue(organization) {
    return organization.enabled ? "Enabled" : "Disabled";
  }
  const downloadData = () => {
    const pdf = new jsPDF();
    pdf.autoTable({
      html: "#table",
      didParseCell: function (data) {
        if (data.cell.raw && data.cell.raw.type === "switch") {
          data.text = getEnableDisableValue(organizations[data.row.index]);
        }
      },
    });
    pdf.save("Organizations.pdf");
  };

  return (
    <>
      <div className="Patients_section Organization-section">
        <div>
          <div className="d-inline-block">
            <h1>Organization Clinics</h1>
          </div>
          <div className="right-header">
            <LoaderSpinner loading={loading} />
            <div className="position-relative">
              <img className="search-img" src={Search} alt="search" />
              <input
                value={search}
                onChange={(e) => handleSearch(e)}
                className=" search-input"
                placeholder="Search by Organization Name"
              />
            </div>
            <div>
              <button
                onClick={downloadData}
                className="btn export-button w-export"
              >
                Export
              </button>
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
            title={`Registered (${totalItems})`}
          ></Tab>
          <Tab eventKey={URL.ORGANISATION.PENDING} title="Pending(20)">
            <Pending />
          </Tab>
          <Tab eventKey={URL.ORGANISATION.DECLINED} title="Declined(45)">
            <Declined />
          </Tab>
        </Tabs>
        <Row className="table-margin">
          <Col md={12}>
            <Table
              responsive
              className="stripednew table-stripednew Patients-table"
              variant="dark"
              id="table"
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
                  <tr key={organization?.id}>
                    <td>
                      <InputGroup className="mb-3">
                        <InputGroup.Checkbox aria-label="Checkbox for following text input" />
                      </InputGroup>
                    </td>
                    <td
                      className="name-textunder"
                      onClick={() => handleEditOrganisation(organization?.id)}
                    >
                      {organization?.user}
                    </td>
                    <td>{organization?.email}</td>
                    <td
                      className="name-text"
                      onClick={() =>
                        handlePopUp(
                          popUpComponents[0].name,
                          organization?.id,
                          organization?.clinics
                        )
                      }
                    >
                      {organization?.clinics}
                    </td>
                    <td
                      className="name-text"
                      onClick={() =>
                        handlePopUp(
                          popUpComponents[1].name,
                          organization?.id,
                          organization?.doctors
                        )
                      }
                    >
                      {organization?.doctors}
                    </td>
                    <td
                      className="name-text"
                      onClick={() =>
                        handlePopUp(
                          popUpComponents[2].name,
                          organization?.id,
                          organization?.patients
                        )
                      }
                    >
                      {organization?.patients}
                    </td>
                    <td>
                      <button className="RegisteredButton">
                        {organization?.status}
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
        {GetPopUpComponent && (
          <GetPopUpComponent organization_id={organisationIdForPopUp} />
        )}
      </ModalComponent>
    </>
  );
}

export default OrganisationListing;
