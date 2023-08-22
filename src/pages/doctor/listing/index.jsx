import { useCallback, useEffect, useRef, useState } from "react";
import "./style.scss";
import { Row, Col, Table, Form, InputGroup } from "react-bootstrap";
import Search from "../../../assests/images/dashborad/Search.png";
import PaginationSection from "../../../components/PaginationSection";
import { useDebounce } from "../../../hooks/debounce";
import { doctorService } from "../../../services/doctor.service";
import { clinicService } from "../../../services/clinic.service";
import LoaderSpinner from "../../../components/spinner";
import StatusDropdown from "../../../components/statusDropdown";
import ListingDropdown from "../../../components/listingDropdown";
import ModalComponent from "../../../components/modal";
import PatientListing from "../../patient/listing";

function DoctorListing({ organization_id = "" }) {
  const [show, setShow] = useState("");
  const [clinics, setClinics] = useState([]);
  const [selectedClinic, setSelectedClinic] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingClinic, setLoadingClinic] = useState(false);
  const totalDoctorsRef = useRef(0);

  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const debouncedSearchTerm = useDebounce(search, 600);

  const handleShow = (id) => setShow(id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { count, results, total_doctor_count } =
          await doctorService.getDoctorSummary({
            organization_id: organization_id,
            clinic_id: selectedClinic,
            search: debouncedSearchTerm,
            status: status,
            page: currentPage,
          });
        setTotalItems(count);
        setDoctors(results);
        totalDoctorsRef.current = total_doctor_count;
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
  ]);

  useEffect(() => {
    const fetchClinics = async () => {
      try {
        setLoadingClinic(true);
        const { data } = await clinicService.getClinicNameId();
        setClinics(data);
        setLoadingClinic(false);
      } catch (err) {
        setLoadingClinic(false);
        console.log(err);
      }
    };
    fetchClinics();
  }, []);

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

  return (
    <>
      <div className="Patients_section">
        <div>
          <div className="d-inline-block">
            <h1>Doctors ({totalDoctorsRef.current})</h1>
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
              <button className="btn export-button w-export">Export</button>
            </div>
          </div>
        </div>

        <Row className="mt-4">
          <Col md={3} className="status_dropdown enable-status">
            <StatusDropdown status={status} filterHandle={filterHandle} />
          </Col>
          <Col md={3} className="status_dropdown enable-status">
            <ListingDropdown
              getFilterLabel={getClinicFilter}
              filterHandle={filterHandle}
              values={clinics}
              id="clinic_id"
              filterName="Clinic"
            />
          </Col>
        </Row>
        <Row>
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
                  <th>Doctor Name</th>
                  <th>Doctor ID</th>
                  <th>Email Address</th>
                  <th>Clinic Name</th>
                  <th>Patients</th>
                  <th>Enable/Disable</th>
                </tr>
              </thead>
              <tbody>
                {doctors?.map((doctor) => (
                  <tr key={doctor?.id}>
                    <td>
                      <InputGroup className="mb-3">
                        <InputGroup.Checkbox aria-label="Checkbox for following text input" />
                      </InputGroup>
                    </td>
                    <td className="name-text">{doctor?.doctor_name}</td>
                    <td>{doctor?.id}</td>
                    <td>{doctor?.doctor_email}</td>
                    <td className="">{doctor?.clinic_name}</td>
                    <td
                      className="name-text"
                      onClick={() => handleShow(doctor?.id)}
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
            <PaginationSection
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              count={totalItems}
            />
          </Col>
        </Row>
      </div>
      <ModalComponent setShow={setShow} show={show} className="maxWidth">
        <PatientListing doctor_id={show} />
      </ModalComponent>
    </>
  );
}

export default DoctorListing;
