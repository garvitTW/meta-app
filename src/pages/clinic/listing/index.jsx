import "./style.scss";
import { Row, Col, Table, Form, InputGroup } from "react-bootstrap";
import Search from "../../../assests/images/dashborad/Search.png";
import PaginationSection from "../../../components/PaginationSection";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useDebounce } from "../../../hooks/debounce";
import LoaderSpinner from "../../../components/spinner";
import { clinicService } from "../../../services/clinic.service";
import { OrganisationService } from "../../../services/Organisation.service";
import StatusDropDown from "../../../components/statusDropdown";
import ListingDropDown from "../../../components/listingDropdown";
import DoctorListing from "../../doctor/listing";
import PatientListing from "../../patient/listing";
import AddIcon from "../../../assests/images/dashborad/add.png";
import ModalComponent from "../../../components/modal";
import { useNavigate } from "react-router-dom";
import URL from "../../../constants/routesURL";
import { Store } from "../../../store/Store";
import { roles } from "../../../constants/common.constants";
import { Type } from "../../../constants/storeAction.constants";
import {
  downloadCSV,
  handleDataSelectionForExport,
} from "../../../utils/helperFunction";

const popUpComponents = [
  {
    name: "doctor",
    component: DoctorListing,
  },
  {
    name: "patient",
    component: PatientListing,
  },
];

function ClinicListing({ organization_id = "" }) {
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;
  const { user_type, id } = userInfo;
  const [show, setShow] = useState("");
  const navigate = useNavigate();
  const [clinics, setClinics] = useState([]);
  const [organizations, setOrganizations] = useState([]);
  const [status, setStatus] = useState("");
  const initialOrganisationId =
    user_type === roles.organization ? id : organization_id;
  const [selectedOrganisation, setSelectedOrganisation] = useState(
    initialOrganisationId
  );
  const [search, setSearch] = useState("");
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingOrganisation, setLoadingOrganisation] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [clinicToExport, setClinicToExport] = useState([]);
  const [clinicIdForPopUp, setClinicIdForPopUp] = useState("");
  const debouncedSearchTerm = useDebounce(search, 600);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { count, results } = await clinicService.getClinicSummary({
          organization_id: selectedOrganisation,
          search: debouncedSearchTerm,
          status: status,
          page: currentPage,
        });
        setTotalItems(count);
        setClinics(results);

        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    };
    fetchData();
  }, [debouncedSearchTerm, status, selectedOrganisation, currentPage]);

  useEffect(() => {
    if (user_type === roles.admin) {
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
    }
  }, [user_type]);

  const GetPopUpComponent = useMemo(() => {
    const popUpComponent = popUpComponents.find((comp) => comp.name === show);
    return popUpComponent ? popUpComponent.component : null;
  }, [show]);
  const handleShow = (name) => setShow(name);

  const handlePopUp = (name, id, count) => {
    if (count > 0) {
      setClinicIdForPopUp(id);
      handleShow(name);
    }
  };

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

  const handleEditClinic = async (id) => {
    if (
      userInfo.user_type === roles.organization ||
      userInfo.user_type === roles.admin
    ) {
      try {
        setLoading(true);
        const { data } = await clinicService.getClinicDetails(id);
        setLoading(false);
        dispatch({ type: Type.EDIT_CLINIC_DETAILS, payload: data });
        navigate(URL.CLINIC.EDIT.PROFILE_DETAIL);
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    }
  };

  const handleCheckboxChange = (type, clinicId) => {
    const updatedList = handleDataSelectionForExport(
      type,
      clinicToExport,
      clinics,
      clinicId
    );
    setClinicToExport(updatedList);
  };

  const downloadData = () => {
    if (clinicToExport.length > 0) {
      const selectedClinicsData = clinics.filter((clinic) =>
        clinicToExport.includes(clinic.id)
      );

      const csvData = selectedClinicsData.map((clinic) =>
        [
          clinic.user,
          clinic.email,
          clinic?.organization_clinic,
          clinic?.doctors_count,
          clinic?.patients_count,
          clinic?.is_enabled ? "Enabled" : "Disabled",
        ].join(",")
      );

      // Add table headers
      const csvContent = [
        "Clinic Name,Email Address,Organization Clinic,Doctors,Patients,Enable/Disable",
      ]
        .concat(csvData)
        .join("\n");

      downloadCSV("selected_Clinics", csvContent);
    }
  };

  const organisationFilter = useMemo(() => {
    return user_type === roles.admin ? (
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
    ) : null;
  }, [filterHandle, getOrganisationFilter, organizations, user_type]);
  const addClinicButton = useMemo(() => {
    return user_type === roles.organization ? (
      <button
        onClick={() => navigate(URL.CLINIC.CREATE.PROFILE_DETAIL)}
        className="btn Clinic-button"
      >
        <img src={AddIcon} className="pe-2" alt="add" />
        Add Clinic
      </button>
    ) : null;
  }, [navigate, user_type]);

  const isPopUP = organization_id;

  const className =
    organization_id && show ? "make_display_none" : "Patients_section";
  return (
    <>
      <div className={className}>
        <div>
          <div className="d-inline-block">
            <h1>Clinics ({totalItems})</h1>
          </div>
          <div className="right-header">
            <LoaderSpinner loading={loading || loadingOrganisation} />
            <div className="position-relative">
              <img className="search-img" src={Search} alt="search" />
              <input
                value={search}
                onChange={(e) => filterHandle("search", e.target.value)}
                className=" search-input"
                placeholder=" Search Clinics"
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
            {addClinicButton}
          </div>
        </div>

        <Row className="mt-4">
          <Col md={3} className="status_dropdown enable-status">
            <StatusDropDown status={status} filterHandle={filterHandle} />
          </Col>

          {organisationFilter}

          <Col md={12} className="mt-4">
            <div className={` ${isPopUP && "Patienttable"}`}>
              <Table
                responsive
                className="table-stripednew Patients-table"
                variant="dark"
              >
                <thead>
                  <tr>
                    <th>
                      <InputGroup className="mb-3">
                        <InputGroup.Checkbox
                          aria-label="Checkbox for following text input"
                          checked={
                            clinicToExport.length === clinics.length &&
                            clinics.length > 0
                          }
                          onChange={() => handleCheckboxChange("All", null)}
                        />
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
                          <InputGroup.Checkbox
                            aria-label="Checkbox for following text input"
                            checked={clinicToExport.includes(clinic?.id)}
                            onChange={() =>
                              handleCheckboxChange("", clinic?.id)
                            }
                          />
                        </InputGroup>
                      </td>
                      <td
                        className="name-text"
                        onClick={() => handleEditClinic(clinic?.id)}
                      >
                        {clinic?.user}
                      </td>
                      <td>{clinic?.email}</td>
                      <td>{clinic?.organization_clinic}</td>
                      <td
                        className="name-text"
                        onClick={() =>
                          handlePopUp(
                            popUpComponents[0].name,
                            clinic?.id,
                            clinic?.doctors_count
                          )
                        }
                      >
                        {clinic?.doctors_count}
                      </td>
                      <td
                        className="name-text"
                        onClick={() =>
                          handlePopUp(
                            popUpComponents[1].name,
                            clinic?.id,
                            clinic?.patients_count
                          )
                        }
                      >
                        {clinic?.patients_count}
                      </td>
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
            </div>
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
          <GetPopUpComponent clinic_id={clinicIdForPopUp} />
        )}
      </ModalComponent>
    </>
  );
}

export default ClinicListing;
