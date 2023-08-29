import "./style.scss";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useDebounce } from "../../../hooks/debounce";
import { patientService } from "../../../services/patient.service";
import { clinicService } from "../../../services/clinic.service";
import { doctorService } from "../../../services/doctor.service";
import { Col, Row } from "react-bootstrap";
import Search from "../../../assests/images/dashborad/Search.png";
import StatusDropdown from "../../../components/statusDropdown";
import ListingDropdown from "../../../components/listingDropdown";
import LoaderSpinner from "../../../components/spinner";
import PaginationSection from "../../../components/PaginationSection";
import TableSection from "../../../components/TableSection";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { Store } from "../../../store/Store";
import { roles } from "../../../constants/common.constants";

function PatientListing({
  doctor_id = "",
  organization_id = "",
  clinic_id = "",
}) {
  const { state } = useContext(Store);
  const { userInfo } = state;
  const { user_type, id } = userInfo;
  const initialClinicId = user_type === roles.clinic ? id : clinic_id;

  const [clinics, setClinics] = useState([]);
  const [selectedClinic, setSelectedClinic] = useState(initialClinicId);
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(doctor_id);
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingClinic, setLoadingClinic] = useState(false);
  const [patients, setPatients] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

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
  ]);

  useEffect(() => {
    if (user_type === roles.admin) {
      const fetchData = async () => {
        try {
          setLoadingClinic(true);
          const { data } = await clinicService.getClinicNameId();
          const { data: doctors } = await doctorService.getDoctorNameId();
          setClinics(data);
          setDoctors(doctors);
          setLoadingClinic(false);
        } catch (err) {
          setLoadingClinic(false);
          console.log(err);
        }
      };
      fetchData();
    }
  }, [user_type]);

  const getClinicFilter = useCallback(() => {
    if (selectedClinic) {
      return clinics?.find((clinic) => clinic?.clinic_id === selectedClinic)
        ?.name;
    } else {
      return "All";
    }
  }, [clinics, selectedClinic]);

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
    if (slug === "Status") {
      setStatus(value);
    }
    if (slug === "search") {
      setSearch(value);
    }
  }, []);

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

  const downloadData = () => {
    if (patients.length > 0) {
      const pdf = new jsPDF();
      const tableData = [];

      patients.forEach((patient) => {
        tableData.push([
          patient?.MRN,
          patient?.patient_name,
          patient?.posture_score,
          patient?.last_doctors_appointment,
          patient?.last_self_scan,
          patient?.next_scan,
          patient?.is_enabled ? "Enabled" : "Disabled",
        ]);
      });

      // Add table headers
      const tableHeaders = [
        "MRN",
        "Patient Name",
        "Posture Score",
        "Last Doctor’s Appointment",
        "Last Self Scan",
        "Next Scan",
        "Status",
      ];

      pdf.autoTable({
        head: [tableHeaders],
        body: tableData,
      });

      pdf.save("Patients.pdf");
    }
  };

  const doctorFilter = useMemo(() => {
    return user_type === roles.admin ? (
      <Col md={3} className="status_dropdown">
        <ListingDropdown
          getFilterLabel={getDoctorFilter}
          filterHandle={filterHandle}
          values={doctors}
          id="doctor_id"
          filterName="Doctor"
        />
      </Col>
    ) : null;
  }, [doctors, filterHandle, getDoctorFilter, user_type]);

  const clinicFilter = useMemo(() => {
    return user_type === roles.admin ? (
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

  return (
    <>
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
                placeholder="Search patients"
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
          </div>
        </div>
        <Row className="mt-4">
          <Col md={3} className="status_dropdown enable-status">
            <StatusDropdown status={status} filterHandle={filterHandle} />
          </Col>
          {clinicFilter}
          {doctorFilter}
        </Row>
        <Row className="table-margin">
          <Col md={12}>
            <TableSection
              data={patients}
              handleSwitchToggle={handleSwitchToggle}
            />
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
    </>
  );
}

export default PatientListing;
