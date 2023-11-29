import "./style.scss";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useDebounce } from "../../../hooks/debounce";
import { patientService } from "../../../services/patient.service";
import { clinicService } from "../../../services/clinic.service";
import { doctorService } from "../../../services/doctor.service";
import { Col, Row } from "react-bootstrap";
import AddIcon from "../../../assests/images/dashborad/add.png";
import Search from "../../../assests/images/dashborad/Search.png";
import StatusDropdown from "../../../components/statusDropdown";
import ListingDropdown from "../../../components/listingDropdown";
import LoaderSpinner from "../../../components/spinner";
import PaginationSection from "../../../components/PaginationSection";
import TableSection from "../../../components/TableSection";
import { Store } from "../../../store/Store";
import { roles } from "../../../constants/common.constants";
import URL from "../../../constants/routesURL";
import { useNavigate } from "react-router-dom";
import { Type } from "../../../constants/storeAction.constants";
import {
  downloadCSV,
  handleDataSelectionForExport,
} from "../../../utils/helperFunction";

const posture_scores = [
  { name: "90-100%", value: "90-100" },
  { name: "80-89%", value: "80-89" },
  { name: "70-79%", value: "70-79" },
  { name: "50-69%", value: "50-69" },
  { name: "0-49%", value: "0-49" },
];

function PatientListing({
  doctor_id = "",
  organization_id = "",
  clinic_id = "",
}) {
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;
  const navigate = useNavigate();
  const { user_type, id } = userInfo;
  const initialClinicId = user_type === roles.clinic ? id : clinic_id;

  const isPopUP = organization_id || doctor_id || clinic_id;
  const [clinics, setClinics] = useState([]);
  const [selectedClinic, setSelectedClinic] = useState(initialClinicId);
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(doctor_id);
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [patientToExport, setPatientToExport] = useState([]);
  const [loadingClinic, setLoadingClinic] = useState(false);
  const [patients, setPatients] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPostureScore, setSelectedPostureScore] = useState("");

  const debouncedSearchTerm = useDebounce(search, 600);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const initialOrganisationId =
          user_type === roles.organization ? id : organization_id;
        const { count, results } = await patientService.getPatientSummary({
          organization_id: initialOrganisationId,
          clinic_id: selectedClinic,
          doctor_id: selectedDoctor,
          search: debouncedSearchTerm,
          status: status,
          page: currentPage,
          posture_score: selectedPostureScore,
        });

        setTotalItems(count);
        setPatients(results);
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
    selectedDoctor,
    user_type,
    id,
    selectedPostureScore,
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const organization_id = user_type === roles.organization ? id : "";
        const clinic_id = user_type === roles.clinic ? id : "";
        setLoadingClinic(true);

        const { data: doctors } = await doctorService.getDoctorNameId({
          organization_id: organization_id,
          clinic_id: clinic_id,
        });
        setDoctors(doctors);
        if (user_type === roles.admin || user_type === roles.organization) {
          const { data } = await clinicService.getClinicNameId({
            organization_id: organization_id,
          });
          setClinics(data);
        }

        setLoadingClinic(false);
      } catch (err) {
        setLoadingClinic(false);
        console.log(err);
      }
    };
    fetchData();
  }, [id, user_type]);

  const getClinicFilter = useCallback(() => {
    if (selectedClinic) {
      return clinics?.find((clinic) => clinic?.clinic_id === selectedClinic)
        ?.name;
    } else {
      return "All";
    }
  }, [clinics, selectedClinic]);

  const getPostureFilter = useCallback(() => {
    if (selectedPostureScore) {
      return posture_scores?.find(
        (score) => score?.value === selectedPostureScore
      )?.name;
    } else {
      return "All";
    }
  }, [selectedPostureScore]);

  const getDoctorFilter = useCallback(() => {
    if (selectedDoctor) {
      return doctors?.find((doctor) => doctor?.doctor_id === selectedDoctor)
        ?.name;
    } else {
      return "All";
    }
  }, [doctors, selectedDoctor]);

  const filterHandle = useCallback((slug, value) => {
    setCurrentPage(1);
    if (slug === "Clinic") {
      setSelectedClinic(value);
    }
    if (slug === "Doctor") {
      setSelectedDoctor(value);
    }
    if (slug === "Posture Score") {
      setSelectedPostureScore(value);
    }
    if (slug === "Status") {
      setStatus(value);
    }
    if (slug === "search") {
      setSearch(value);
    }
  }, []);

  const handleEditPatient = async (id) => {
    const allowedUserTypes = [roles.organization, roles.admin, roles.clinic];

    if (allowedUserTypes.includes(userInfo.user_type)) {
      try {
        setLoading(true);
        const data = await patientService.getPatientDetails(id);
        setLoading(false);
        dispatch({ type: Type.EDIT_PATIENT_DETAILS, payload: data });
        navigate(URL.PATIENT.EDIT);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleSwitchToggle = async (patient) => {
    try {
      setLoading(true);
      const { id, is_enabled } = patient;
      const { data } = await patientService.changePatientStatus(id, {
        enabled: !is_enabled,
      });
      const updatedPatient = patients?.map((patient) => {
        if (patient.id === data.patient_id) {
          patient.is_enabled = data.enabled;
        }
        return patient;
      });
      setPatients(updatedPatient);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };
  const handleCheckboxChange = (type, patientId) => {
    const updatedList = handleDataSelectionForExport(
      type,
      patientToExport,
      patients,
      patientId
    );
    setPatientToExport(updatedList);
  };

  const downloadData = () => {
    if (patientToExport.length > 0) {
      const selectedPatientsData = patients.filter((patient) =>
        patientToExport.includes(patient.id)
      );

      const csvData = selectedPatientsData.map((patient) =>
        [
          patient?.mrn,
          patient?.patient_name,
          patient?.posture_score !== "" ? patient?.posture_score : "No Data",
          patient?.last_doctors_appointment || "No Data",
          patient?.last_self_scan || "No Data",
          patient?.next_scan || "No Data",
          patient?.is_enabled ? "Enabled" : "Disabled",
        ].join(",")
      );

      // Add table headers
      const csvContent = [
        "MRN, Patient Name,Posture Score,Last Doctor’s Appointment,Last Self Scan,Next Scan,Status",
      ]
        .concat(csvData)
        .join("\n");

      downloadCSV("selected_Patients", csvContent);
    }
  };

  const doctorFilter = useMemo(() => {
    return (
      <Col md={3} className="status_dropdown enable-status">
        <ListingDropdown
          getFilterLabel={getDoctorFilter}
          filterHandle={filterHandle}
          values={doctors}
          id="doctor_id"
          filterName="Doctor"
        />
      </Col>
    );
  }, [doctors, filterHandle, getDoctorFilter]);

  const postureFilter = useMemo(() => {
    return (
      <Col md={3} className="status_dropdown enable-status">
        <ListingDropdown
          getFilterLabel={getPostureFilter}
          filterHandle={filterHandle}
          values={posture_scores}
          id="value"
          filterName="Posture Score"
        />
      </Col>
    );
  }, [filterHandle, getPostureFilter]);

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

  const addPatientButton = useMemo(() => {
    return user_type === roles.clinic ? (
      <button
        onClick={() => navigate(URL.PATIENT.CREATE)}
        className="btn Clinic-button"
      >
        <img src={AddIcon} className="pe-2" alt="add" />
        Add Patient
      </button>
    ) : null;
  }, [navigate, user_type]);

  return (
    <div className="Patients_section">
      <div>
        <div className="d-inline-block">
          <h1>Patients ({totalItems})</h1>
        </div>
        <div className="right-header">
          <LoaderSpinner loading={loading || loadingClinic} />
          <div className="position-relative">
            <img className="search-img" src={Search} alt="search" />
            <input
              value={search}
              onChange={(e) => filterHandle("search", e.target.value)}
              className=" search-input"
              placeholder="Search by patient name, patient MRN"
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
          {addPatientButton}
        </div>
      </div>
      <Row className="mt-4">
        <Col md={3} className="status_dropdown enable-status">
          <StatusDropdown status={status} filterHandle={filterHandle} />
        </Col>
        {clinicFilter}
        {doctorFilter}
        {postureFilter}
      </Row>
      <Row className="table-margin">
        <Col md={12}>
          <div className={` ${isPopUP && "Patienttable"}`}>
            <TableSection
              data={patients}
              patientToExport={patientToExport}
              handleSwitchToggle={handleSwitchToggle}
              handleEditPatient={handleEditPatient}
              handleCheckboxChange={handleCheckboxChange}
            />
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
  );
}

export default PatientListing;
