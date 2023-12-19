import { v4 as uuid } from "uuid";
import { Table, InputGroup, Form } from "react-bootstrap";
import "./style.scss";

function Tablemy({
  data,
  patientToExport,
  handleSwitchToggle,
  handleEditPatient,
  handleCheckboxChange,
}) {
  return (
    <div>
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
                    patientToExport.length === data.length && data.length > 0
                  }
                  onChange={() => handleCheckboxChange("All", null)}
                />
              </InputGroup>
            </th>
            <th> MRN</th>
            <th> Patient Name</th>
            <th> Posture Score</th>
            <th> Last Doctor’s Appointment</th>
            <th> Last Self Scan</th>
            <th> Next Scan</th>
            <th> Status</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((patient) => (
            <tr key={uuid()}>
              <td>
                <InputGroup className="mb-3">
                  <InputGroup.Checkbox
                    aria-label="Checkbox for following text input"
                    checked={patientToExport.includes(patient?.id)}
                    onChange={() => handleCheckboxChange("", patient?.id)}
                  />
                </InputGroup>
              </td>
              <td>{patient?.mrn}</td>
              <td
                className="name-text"
                onClick={() => handleEditPatient(patient?.id)}
              >
                {patient?.patient_name}
              </td>
              <td>
                {patient?.posture_score !== ""
                  ? `${patient?.posture_score}%`
                  : "No Data"}
              </td>
              <td>{patient?.last_doctors_appointment || "No Data"}</td>
              <td>{patient?.last_self_scan || "No Data"}</td>
              <td>{patient?.next_scan || "No Data"}</td>
              <td>
                <div>
                  <Form>
                    <Form.Check
                      type="switch"
                      id="custom-switch"
                      label=""
                      checked={patient?.is_enabled}
                      onChange={() => handleSwitchToggle(patient)}
                    />
                  </Form>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Tablemy;
