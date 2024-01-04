import React, {
  Suspense,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import "./style.scss";
import { Row, Col, Table, Form, InputGroup } from "react-bootstrap";
import Search from "../../../assests/images/dashborad/Search.png";
import AddIcon from "../../../assests/images/dashborad/add.png";
import PaginationSection from "../../../components/PaginationSection";
import { useDebounce } from "../../../hooks/debounce";
import { doctorService } from "../../../services/doctor.service";
import { clinicService } from "../../../services/clinic.service";
import LoaderSpinner from "../../../components/spinner";
import StatusDropdown from "../../../components/statusDropdown";
import ListingDropdown from "../../../components/listingDropdown";
import ModalComponent from "../../../components/modal";
import URL from "../../../constants/routesURL";
import { useNavigate } from "react-router-dom";
import { Store } from "../../../store/Store";
import { roles } from "../../../constants/common.constants";
import { Type } from "../../../constants/storeAction.constants";
import {
  downloadCSV,
  generateDoctorProfileDetailsInitialValue,
  handleDataSelectionForExport,
} from "../../../utils/helperFunction";
import DetailsPopUp from "../../../components/detailsPopUp";
import popUpComponents from "../../../utils/popUpComponents";

function DoctorListing({ organization_id = "", clinic_id = "" }) {
  const { state, dispatch } = useContext(Store);
  const { userInfo, addDoctorStep1, editDoctorDetails } = state;
  const { user_type, id } = userInfo;
  const initialClinicId = user_type === roles.clinic ? id : clinic_id;

  const [show, setShow] = useState("");
  const navigate = useNavigate();
  const handleShow = (name) => setShow(name);
  const [clinics, setClinics] = useState([]);
  const [selectedClinic, setSelectedClinic] = useState(initialClinicId);
  const [doctors, setDoctors] = useState([]);
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");
  const [doctorToExport, setDoctorToExport] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingClinic, setLoadingClinic] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const debouncedSearchTerm = useDebounce(search, 600);
  const [showDetails, setShowDetails] = useState(false);
  const [doctorIdForPopUp, setDoctorIdForPopUp] = useState("");

  const handleShowDetailsClose = () => setShowDetails(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const initialOrganisationId =
          user_type === roles.organization ? id : organization_id;
        const { count, results } = await doctorService.getDoctorSummary({
          organization_id: initialOrganisationId,
          clinic_id: selectedClinic,
          search: debouncedSearchTerm,
          status: status,
          page: currentPage,
        });
        setTotalItems(count);
        setDoctors(results);

        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    };
    fetchData();
  }, [
    debouncedSearchTerm,
    status,
    selectedClinic,
    currentPage,
    organization_id,
    user_type,
    id,
  ]);

  useEffect(() => {
    const accessibleRoles = [roles.admin, roles.organization];
    if (accessibleRoles.includes(user_type)) {
      const fetchClinics = async () => {
        try {
          setLoadingClinic(true);
          const organization_id = user_type === roles.organization ? id : "";
          const { data } = await clinicService.getClinicNameId({
            organization_id: organization_id,
          });
          setClinics(data);
          setLoadingClinic(false);
        } catch (err) {
          setLoadingClinic(false);
          console.log(err);
        }
      };
      fetchClinics();
    }
  }, [id, user_type]);

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
    if (count > 0 && user_type !== roles.clinic) {
      setDoctorIdForPopUp(id);
      handleShow(name);
    }
  };

  const getClinicFilter = useCallback(() => {
    if (selectedClinic) {
      return clinics?.find((clinic) => clinic?.clinic_id === selectedClinic)
        ?.name;
    } else {
      return "All";
    }
  }, [clinics, selectedClinic]);

  const filterHandle = useCallback((slug, value) => {
    setCurrentPage(1);
    if (slug === "Clinic") {
      setSelectedClinic(value);
    }
    if (slug === "Status") {
      setStatus(value);
    }
    if (slug === "search") {
      setSearch(value);
    }
  }, []);

  const handleEditDoctor = async (id) => {
    const allowedUserTypes = [roles.organization, roles.admin, roles.clinic];

    if (allowedUserTypes.includes(userInfo.user_type)) {
      try {
        setLoading(true);
        const data = await doctorService.getDoctorDetails(id);

        setLoading(false);
        setShowDetails(true);
        dispatch({
          type: Type.ADD_EDIT_DOCTOR_STEP_1,
          payload: generateDoctorProfileDetailsInitialValue(data),
        });
        dispatch({ type: Type.EDIT_DOCTOR_DETAILS, payload: data });
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    }
  };

  const handleAddDoctor = () => {
    if (addDoctorStep1?.name) {
      dispatch({ type: Type.REMOVE_DOCTOR_STEP_1 });
    }
    navigate(URL.DOCTOR.CREATE.PROFILE_DETAIL);
  };

  const handleSwitchToggle = async (doctor) => {
    try {
      setLoading(true);
      const { id, is_enabled } = doctor;
      const { data } = await doctorService.changeDoctorStatus(id, {
        enabled: !is_enabled,
      });
      const updatedDoctor = doctors?.map((doctor) => {
        if (doctor.id === data.doctor_id) {
          doctor.is_enabled = data.enabled;
        }
        return doctor;
      });
      setDoctors(updatedDoctor);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  const handleCheckboxChange = (type, doctorId) => {
    const updatedList = handleDataSelectionForExport(
      type,
      doctorToExport,
      doctors,
      doctorId
    );
    setDoctorToExport(updatedList);
  };

  const downloadData = () => {
    if (doctorToExport.length > 0) {
      const selectedDoctorsData = doctors.filter((doctor) =>
        doctorToExport.includes(doctor.id)
      );

      const csvData = selectedDoctorsData.map((doctor) =>
        [
          doctor.doctor_name,
          doctor.doctor_uniqueid,
          doctor.doctor_email,
          doctor.clinic_name,
          doctor.patients_count,
          doctor.is_enabled ? "Enabled" : "Disabled",
        ].join(",")
      );

      // Add table headers
      const csvContent = [
        "Doctor Name,Doctor ID,Email Address,Clinic Name,Patients,Enable/Disable",
      ]
        .concat(csvData)
        .join("\n");

      downloadCSV("selected_doctors", csvContent);
    }
  };

  const isPopUP = organization_id || clinic_id;

  const className = isPopUP && show ? "make_display_none" : "Patients_section";

  const clinicFilter = useMemo(() => {
    const accessibleRoles = [roles.admin, roles.organization];
    return accessibleRoles.includes(user_type) ? (
      <Col md={3} className="status_dropdown enable-status">
        <ListingDropdown
          getFilterLabel={getClinicFilter}
          filterHandle={filterHandle}
          values={clinics}
          id="clinic_id"
          filterName="Clinic"
        />
      </Col>
    ) : null;
  }, [clinics, filterHandle, getClinicFilter, user_type]);

  const addDoctorButton = useMemo(() => {
    return user_type === roles.clinic ? (
      <button onClick={handleAddDoctor} className="btn Clinic-button">
        <img src={AddIcon} className="pe-2" alt="add" />
        Add Doctor
      </button>
    ) : null;
  }, [user_type]);

  return (
    <>
      <div className={className}>
        <div>
          <div className="d-inline-block">
            <h1>Doctors ({totalItems})</h1>
          </div>
          <div className="right-header">
            <LoaderSpinner loading={loading || loadingClinic} />
            <div className="position-relative">
              <img className="search-img" src={Search} alt="search" />
              <input
                value={search}
                onChange={(e) => filterHandle("search", e.target.value)}
                className=" search-input"
                placeholder="Search by Doctors name, email address"
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
            {addDoctorButton}
          </div>
        </div>

        <Row className="mt-4">
          <Col md={3} className="status_dropdown enable-status">
            <StatusDropdown status={status} filterHandle={filterHandle} />
          </Col>
          {clinicFilter}
        </Row>
        <Row>
          <Col md={12} className="mt-4">
            <div className="Patienttable">
              <Table
                responsive
                className={`table-stripednew Patients-table `}
                variant="dark"
              >
                <thead>
                  <tr>
                    <th>
                      <InputGroup className="mb-3">
                        <InputGroup.Checkbox
                          aria-label="Checkbox for following text input"
                          checked={
                            doctorToExport.length === doctors.length &&
                            doctors.length > 0
                          }
                          onChange={() => handleCheckboxChange("All", null)}
                        />
                      </InputGroup>
                    </th>
                    <th>Doctor Name</th>
                    <th>Doctor ID</th>
                    <th>Email Address</th>
                    <th>Clinics</th>
                    <th>Patients</th>
                    <th>Enable/Disable</th>
                  </tr>
                </thead>
                <tbody>
                  {doctors?.map((doctor) => (
                    <tr key={doctor?.id}>
                      <td>
                        <InputGroup className="mb-3">
                          <InputGroup.Checkbox
                            aria-label="Checkbox for following text input"
                            checked={doctorToExport.includes(doctor.id)}
                            onChange={() => handleCheckboxChange("", doctor.id)}
                          />
                        </InputGroup>
                      </td>
                      <td
                        className="name-text"
                        onClick={() => handleEditDoctor(doctor?.id)}
                      >
                        {doctor?.doctor_name}
                      </td>
                      <td>{doctor?.doctor_uniqueid}</td>
                      <td>{doctor?.doctor_email}</td>
                      <td
                        className="name-text"
                        onClick={() =>
                          handlePopUp("clinic", doctor?.id, doctor?.clinic_name)
                        }
                      >
                        {doctor?.clinic_name}
                      </td>
                      <td
                        className="name-text"
                        onClick={() =>
                          handlePopUp(
                            "patient",
                            doctor?.id,
                            doctor?.patients_count
                          )
                        }
                      >
                        {doctor?.patients_count}
                      </td>
                      <td>
                        <div>
                          <Form>
                            <Form.Check
                              type="switch"
                              id="custom-switch"
                              label=""
                              checked={doctor?.is_enabled}
                              onChange={() => handleSwitchToggle(doctor)}
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
      {GetPopUpComponent && (
        <ModalComponent setShow={setShow} show={show} className="maxWidth">
          <Suspense fallback={<div>Loading...</div>}>
            <GetPopUpComponent doctor_id={doctorIdForPopUp} />
          </Suspense>
        </ModalComponent>
      )}
      <DetailsPopUp
        show={showDetails}
        handleClose={handleShowDetailsClose}
        details={editDoctorDetails}
        faxKey={"doctor_fax"}
        handleEdit={() => navigate(URL.DOCTOR.EDIT.PROFILE_DETAIL)}
      />
    </>
  );
}

export default DoctorListing;
