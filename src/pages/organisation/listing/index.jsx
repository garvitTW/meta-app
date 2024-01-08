import PaginationSection from "../../../components/PaginationSection";
import { Table, InputGroup, Row, Form, Col } from "react-bootstrap";
import Search from "../../../assests/images/dashborad/Search.png";
import AddIcon from "../../../assests/images/dashborad/add.png";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import URL from "../../../constants/routesURL";
import React, {
  Suspense,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import ModalComponent from "../../../components/modal";
import { OrganisationService } from "../../../services/Organisation.service";
import { useDebounce } from "../../../hooks/debounce";
import { Store } from "../../../store/Store";
import { Type } from "../../../constants/storeAction.constants";
import LoaderSpinner from "../../../components/spinner";
import { useWindowSize } from "../../../hooks";

import {
  downloadCSV,
  generateProfileDetailsInitialValue,
  handleDataSelectionForExport,
} from "../../../utils/helperFunction";
import DetailsPopUp from "../../../components/detailsPopUp";
import StatusDropdown from "../../../components/statusDropdown";
import popUpComponents from "../../../utils/popUpComponents";

function OrganisationListing() {
  const [show, setShow] = useState("");
  const [status, setStatus] = useState("");
  const [organizations, setOrganizations] = useState([]);
  const [search, setSearch] = useState("");
  const { state, dispatch } = useContext(Store);
  const { addOrganisationStep1, editOrganisationDetails } = state;
  const [totalItems, setTotalItems] = useState(0);
  const [organisationToExport, setOrganisationToExport] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [organisationIdForPopUp, setOrganisationIdForPopUp] = useState("");

  const debouncedSearchTerm = useDebounce(search, 600);

  const [showDetails, setShowDetails] = useState(false);

  const handleShowDetailsClose = () => setShowDetails(false);

  const navigate = useNavigate();
  const handleShow = (name) => setShow(name);

  const { width, height } = useWindowSize();
  const containerStyle = {
    width: width <= 1287 && height <= 720 ? "max-content" : "auto",
  };

  const GetPopUpComponent = useMemo(() => {
    if (show) {
      const componentLoader = popUpComponents[show];

      if (componentLoader) {
        return React.lazy(() => componentLoader());
      }
    }
    return null;
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
            status: status,
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
  }, [debouncedSearchTerm, currentPage, status]);

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

  const handleCheckboxChange = (type, organizationId) => {
    const updatedList = handleDataSelectionForExport(
      type,
      organisationToExport,
      organizations,
      organizationId
    );
    setOrganisationToExport(updatedList);
  };
  const handleEditOrganisation = async (id) => {
    try {
      setLoading(true);
      const { data } = await OrganisationService.getOrganisationClinic(id);
      setLoading(false);
      setShowDetails(true);
      dispatch({
        type: Type.ADD_EDIT_ORGANISATION_STEP_1,
        payload: generateProfileDetailsInitialValue(data),
      });
      dispatch({ type: Type.EDIT_ORGANISATION_DETAILS, payload: data });
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };
  const filterHandle = useCallback((slug, value) => {
    setCurrentPage(1);

    if (slug === "Status") {
      setStatus(value);
    }
  }, []);

  const downloadData = () => {
    if (organisationToExport.length > 0) {
      const selectedOrganisationData = organizations.filter((organization) =>
        organisationToExport.includes(organization.id)
      );

      // Iterate through organizations and prepare data for the PDF table
      const csvData = selectedOrganisationData.map((organization) =>
        [
          organization.user,
          organization.email,
          organization.clinics,
          organization.doctors,
          organization.patients,
          organization.status,
          organization.enabled ? "Enabled" : "Disabled",
        ].join(",")
      );

      // Add table headers
      const csvContent = [
        "Organization Clinic Name,Email Address,Clinics,Doctors,Patients,Status,Enable/Disable",
      ]
        .concat(csvData)
        .join("\n");
      downloadCSV("selected_Organizations", csvContent);
    }
  };
  const handleAddOrganization = () => {
    if (addOrganisationStep1) {
      dispatch({ type: Type.REMOVE_ORGANISATION_STEP_1 });
    }
    navigate(URL.ORGANISATION.CREATE.PROFILE_DETAIL);
  };

  return (
    <>
      <div className="Patients_section Organization-section">
        <div className="d-flex justify-content-between">
          <div>
            <h1>Organization Clinics ({totalItems})</h1>
          </div>
          <div className="right-header">
            <LoaderSpinner loading={loading} />
            <div className="position-relative">
              <img className="search-img" src={Search} alt="search" />
              <input
                value={search}
                onChange={(e) => handleSearch(e)}
                className=" search-input"
                placeholder="Search by organization name, email address"
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
              onClick={handleAddOrganization}
              className="btn Organization-button"
            >
              <img src={AddIcon} className="pe-2" alt="add" />
              Add Organization
            </button>
          </div>
        </div>

        <Row className="mt-4">
          <Col md={3} className="status_dropdown enable-status">
            <StatusDropdown status={status} filterHandle={filterHandle} />
          </Col>

          <Col md={12} className="mt-4">
            <div className="Patienttable">
              <Table
                responsive
                className="stripednew table-stripednew Patients-table"
                variant="dark"
              >
                <thead>
                  <tr>
                    <th>
                      <InputGroup className="mb-3">
                        <InputGroup.Checkbox
                          aria-label="Checkbox for following text input"
                          checked={
                            organisationToExport.length ===
                              organizations.length && organizations.length > 0
                          }
                          onChange={() => handleCheckboxChange("All", null)}
                        />
                      </InputGroup>
                    </th>
                    <th> Organization Clinic Name</th>
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
                          <InputGroup.Checkbox
                            checked={organisationToExport.includes(
                              organization?.id
                            )}
                            onChange={() =>
                              handleCheckboxChange("", organization?.id)
                            }
                          />
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
                            "clinic",
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
                            "doctor",
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
                            "patient",
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
            </div>
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
          <Suspense fallback={<div>Loading...</div>}>
            <GetPopUpComponent organization_id={organisationIdForPopUp} />
          </Suspense>
        )}
      </ModalComponent>
      <DetailsPopUp
        show={showDetails}
        handleClose={handleShowDetailsClose}
        details={editOrganisationDetails}
        faxKey={"organization_fax"}
        handleEdit={() => navigate(URL.ORGANISATION.EDIT.PROFILE_DETAIL)}
      />
    </>
  );
}

export default OrganisationListing;
