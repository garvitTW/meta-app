import "./style.scss";
import { Row, Col, Dropdown, Table, Form, InputGroup } from "react-bootstrap";
import Search from "../../../assests/images/dashborad/Search.png";
import Dropdownarrow from "../../../assests/images/dashborad/dropdown.png";
import PaginationSection from "../../../components/PaginationSection";
import { useEffect, useState } from "react";
import { useDebounce } from "../../../hooks/debounce";
import LoaderSpinner from "../../../components/spinner";
import { clinicService } from "../../../services/clinic.service";
import { OrganisationService } from "../../../services/Organisation.service";
function ClinicListing({ organization_id = "" }) {
  const [clinics, setClinics] = useState([]);
  const [organizations, setOrganizations] = useState([]);
  const [status, setStatus] = useState("");
  const [selectedOrganisation, setSelectedOrganisation] =
    useState(organization_id);
  const [search, setSearch] = useState("");
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalClinics, setTotalClinics] = useState(0);

  const debouncedSearchTerm = useDebounce(search, 600);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { count, results, total_clinic_count } =
          await clinicService.getClinicSummary({
            organization_id: selectedOrganisation,
            search: debouncedSearchTerm,
            status: status,
            page: currentPage,
          });
        setTotalItems(count);
        setClinics(results);
        setTotalClinics(total_clinic_count);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    };
    fetchData();
  }, [debouncedSearchTerm, status, selectedOrganisation, currentPage]);

  useEffect(() => {
    const fetchOrganisation = async () => {
      try {
        setLoading(true);
        const { data } = await OrganisationService.getOrganisationNameId();
        setOrganizations(data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    };
    fetchOrganisation();
  }, []);

  const getOrganisationFilter = () => {
    if (selectedOrganisation) {
      return organizations?.find(
        (org) => org?.organization_id === selectedOrganisation
      ).name;
    } else {
      return "All";
    }
  };
  const getStatusLabel = () => {
    if (status === true) {
      return "Enabled";
    } else if (status === false) {
      return "Disabled";
    } else {
      return "All";
    }
  };
  const filterHandle = (slug, value) => {
    if (slug === "organization") {
      setSelectedOrganisation(value);
    }
    if (slug === "Status") {
      setStatus(value);
    }
    if (slug === "search") {
      setCurrentPage(1);
      setSearch(value);
    }
  };
  return (
    <>
      <div className="Patients_section">
        <div>
          <div className="d-inline-block">
            <h1>Clinics ({totalClinics})</h1>
          </div>
          <div className="right-header">
            <LoaderSpinner loading={loading} />
            <div className="position-relative">
              <img className="search-img" src={Search} alt="search" />
              <input
                value={search}
                onChange={(e) => filterHandle("search", e.target.value)}
                className=" search-input"
                placeholder=" Search clinics"
              />
            </div>
            <div>
              <button className="btn export-button w-export">Export</button>
            </div>
          </div>
        </div>

        <Row className="mt-4">
          <Col md={3} className="status_dropdown enable-status">
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                <span>Status:</span> {getStatusLabel()}
                <img src={Dropdownarrow} alt="down arrow" />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => filterHandle("Status", "")}>
                  All
                </Dropdown.Item>
                <Dropdown.Item onClick={() => filterHandle("Status", true)}>
                  Enable
                </Dropdown.Item>
                <Dropdown.Item onClick={() => filterHandle("Status", false)}>
                  Disable
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>

          <Col md={3} className="status_dropdown">
            <Dropdown className="Organization_drop">
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                <span>Organization:</span> {getOrganisationFilter()}
                <img src={Dropdownarrow} alt="down arrow" />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => filterHandle("organization", "")}>
                  All
                </Dropdown.Item>
                {organizations?.map((organization) => (
                  <Dropdown.Item
                    onClick={() =>
                      filterHandle(
                        "organization",
                        organization?.organization_id
                      )
                    }
                    key={organization?.organization_id}
                  >
                    {organization?.name}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Col>

          <Col md={12} className="mt-4">
            <Table
              responsive
              className="table-stripednew Patients-table"
              variant="dark"
            >
              <thead>
                <tr>
                  <th>
                    <InputGroup className="mb-3">
                      <InputGroup.Checkbox aria-label="Checkbox for following text input" />
                    </InputGroup>
                  </th>
                  <th>Clinic Name</th>
                  <th> Email Address</th>
                  <th> Organization Clinic</th>
                  <th> Doctors</th>
                  <th> Patients</th>
                  <th> Enable/Disable</th>
                </tr>
              </thead>
              <tbody>
                {clinics?.map((clinic) => (
                  <tr key={clinic?.id}>
                    <td>
                      <InputGroup className="mb-3">
                        <InputGroup.Checkbox aria-label="Checkbox for following text input" />
                      </InputGroup>
                    </td>
                    <td className="name-text">{clinic?.user}</td>
                    <td>{clinic?.email}</td>
                    <td>{clinic?.organization_clinic}</td>
                    <td className="name-textunder">{clinic?.doctors_count}</td>
                    <td className="name-textunder">{clinic?.patients_count}</td>
                    <td>
                      <div>
                        <Form>
                          <Form.Check
                            type="switch"
                            id="custom-switch"
                            label=""
                            checked={clinic?.is_enabled}
                          />
                        </Form>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <PaginationSection
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              count={totalItems}
            />
          </Col>
        </Row>
      </div>
    </>
  );
}

export default ClinicListing;
