import "./style.scss";
import { Row, Col, Table, Form, InputGroup } from "react-bootstrap";
import Search from "../../../assests/images/dashborad/Search.png";
import PaginationSection from "../../../components/PaginationSection";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDebounce } from "../../../hooks/debounce";
import LoaderSpinner from "../../../components/spinner";
import { clinicService } from "../../../services/clinic.service";
import { OrganisationService } from "../../../services/Organisation.service";
import StatusDropDown from "../../../components/statusDropdown";
import ListingDropDown from "../../../components/listingDropdown";
function ClinicListing({ organization_id = "", subItemCount = "" }) {
  const [clinics, setClinics] = useState([]);
  const [organizations, setOrganizations] = useState([]);
  const [status, setStatus] = useState("");
  const [selectedOrganisation, setSelectedOrganisation] =
    useState(organization_id);
  const [search, setSearch] = useState("");
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingOrganisation, setLoadingOrganisation] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const totalClinicsRef = useRef(0);
  const clinicCount = subItemCount || totalClinicsRef.current;

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
        totalClinicsRef.current = total_clinic_count;
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
        setLoadingOrganisation(true);
        const { data } = await OrganisationService.getOrganisationNameId();
        setOrganizations(data);
        setLoadingOrganisation(false);
      } catch (err) {
        setLoadingOrganisation(false);
        console.log(err);
      }
    };
    fetchOrganisation();
  }, []);

  const getOrganisationFilter = useCallback(() => {
    if (selectedOrganisation) {
      return organizations?.find(
        (org) => org?.organization_id === selectedOrganisation
      )?.name;
    } else {
      return "All";
    }
  }, [organizations, selectedOrganisation]);

  const filterHandle = useCallback((slug, value) => {
    setCurrentPage(1);
    if (slug === "Organization") {
      setSelectedOrganisation(value);
    }
    if (slug === "Status") {
      setStatus(value);
    }
    if (slug === "search") {
      setSearch(value);
    }
  }, []);

  const handleSwitchToggle = async (clinic) => {
    try {
      setLoading(true);
      const { id, is_enabled } = clinic;
      const { data } = await clinicService.changeClinicStatus(id, {
        enabled: !is_enabled,
      });
      const updatedClinic = clinics?.map((clinic) => {
        if (clinic.id === data.clinic_id) {
          clinic.is_enabled = data.enabled;
        }
        return clinic;
      });
      setClinics(updatedClinic);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };
  return (
    <>
      <div className="Patients_section">
        <div>
          <div className="d-inline-block">
            <h1>Clinics ({clinicCount})</h1>
          </div>
          <div className="right-header">
            <LoaderSpinner loading={loading || loadingOrganisation} />
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
            <StatusDropDown status={status} filterHandle={filterHandle} />
          </Col>

          <Col md={3} className="status_dropdown">
            <ListingDropDown
              getFilterLabel={getOrganisationFilter}
              filterHandle={filterHandle}
              values={organizations}
              id="organization_id"
              filterName="Organization"
              className="Organization_drop"
            />
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
                            onChange={() => handleSwitchToggle(clinic)}
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
