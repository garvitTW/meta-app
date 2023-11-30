import "./style.scss";
import Search from "../../assests/images/dashborad/Search.png";
import { Table, Row, Col } from "react-bootstrap";
import Dropdownarrow from "../../assests/images/dashborad/dropdown.png";
import Closeicon from "../../assests/images/dashborad/closeIcon.svg";
import { useState } from "react";

const ICD = [
  " ICD-10 CM M01 - Direct infections of joint in infectious...",
  " ICD-10 CM M01 - Direct infections of joint in infectious...",
  " ICD-10 CM M01 - Direct infections of joint in infectious...",
  " ICD-10 CM M03 - Direct infections of joint in infectious...",
  " ICD-10 CM M03 - Direct infections of joint in infectious...",
  " ICD-10 CM M04 - Direct infections of joint in infectious...",
  " ICD-10 CM M05 - Direct infections of joint in infectious...",
  " ICD-10 CM M01 - Direct infections of joint in infectious...",
];

function DMElookUp() {
  const [result, setResult] = useState(false);
  const [ICDList, setICDList] = useState(ICD);
  const [ICDSearchValue, setICDSearchValue] = useState("");
  const [selectedICDValue, setSelectedICDValue] = useState("");
  const [insuranceSearchValue, setInsuranceSearchValue] = useState("");
  const [insuranceSelectedValue, setInsuranceSelectedValue] = useState("");
  const [isInsuranceActive, setInsuranceActive] = useState(false);
  const [insuranceList, setInsuranceList] = useState(ICD);
  const [error, setError] = useState("");

  const handleICDSearch = (e) => {
    setICDSearchValue(e.target.value);
    setSelectedICDValue("");
    const searchResults = ICD.filter((code) =>
      code.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setICDList(searchResults);
  };

  const handleSelectICDValue = (data) => {
    setICDSearchValue(data);
    setSelectedICDValue(data);
    setError("");
  };

  const handleSelectInsuranceValue = (data) => {
    setInsuranceActive(false);
    setInsuranceSearchValue(data);
    setInsuranceSelectedValue(data);
    setError("");
  };

  const handleInsuranceSearch = (e) => {
    setInsuranceSearchValue(e.target.value);
    setInsuranceSelectedValue("");
    const searchResults = ICD.filter((code) =>
      code.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setInsuranceActive(true);
    setInsuranceList(searchResults);
  };

  const searchHandler = () => {
    if (selectedICDValue && insuranceSelectedValue) {
      setResult(true);
    } else {
      setError("Select Both ICD10 & Insurance Provider");
    }
  };

  const handleICDClear = () => {
    setICDSearchValue("");
    setSelectedICDValue("");
  };
  return (
    <div className="Patients_section Organization-section AddOrganisationProfile">
      <h1>Search using : ICD10 & Insurance Provider</h1>

      <div className="formBox">
        {result && (
          <p className="text-left">
            <button onClick={() => setResult(false)}>Search again</button>
          </p>
        )}
        <Row>
          <Col sm={6}>
            <div className="position-relative">
              {!result && (
                <>
                  <img className="search-img" src={Search} alt="search" />
                  <img
                    className="closeicon"
                    src={Closeicon}
                    alt="Close"
                    onClick={handleICDClear}
                  />
                </>
              )}
              <input
                value={ICDSearchValue}
                onChange={handleICDSearch}
                className="search-input"
                placeholder="Search for ICD-10 Code or diagnosis"
                readOnly={result}
              />
              {!result && ICDSearchValue && !selectedICDValue && (
                <div className="searchItem Scroll">
                  {ICDList.length > 0 ? (
                    ICDList.map((data) => (
                      <p
                        className="curserPointer"
                        onClick={() => handleSelectICDValue(data)}
                      >
                        {data}
                      </p>
                    ))
                  ) : (
                    <p>No data</p>
                  )}
                </div>
              )}
            </div>
          </Col>
          <Col sm={6}>
            <div className="position-relative">
              {!result && (
                <>
                  <img className="search-img" src={Search} alt="search" />
                  <img
                    className="closeicon"
                    src={Dropdownarrow}
                    alt="Close"
                    onClick={() => setInsuranceActive(!isInsuranceActive)}
                  />
                </>
              )}
              <input
                className="search-input"
                placeholder="Insurance Provider"
                readOnly={result}
                value={insuranceSearchValue}
                onChange={handleInsuranceSearch}
              />
              {!result && isInsuranceActive && (
                <div className="searchItem Scroll">
                  {insuranceList.length > 0 ? (
                    insuranceList.map((data) => (
                      <p
                        className="curserPointer"
                        onClick={() => handleSelectInsuranceValue(data)}
                      >
                        {data}
                      </p>
                    ))
                  ) : (
                    <p>No data</p>
                  )}
                </div>
              )}
            </div>
          </Col>
          {!result && (
            <>
              <button onClick={searchHandler}>Search</button>
              {error && <p className="errorMessage">{error}</p>}
            </>
          )}
        </Row>
        {result && (
          <Table
            responsive
            className="table-stripednew Patients-table Decliend_table"
            variant="dark"
          >
            <thead>
              <tr>
                <th>Supported HCPCS</th>
                <th>HCPCS Description</th>
                <th>SKU</th>
                <th>Year Of Service</th>
                <th>Total Payments</th>
                <th>Total Charges</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>E0128</td>
                <td>Apollo Clinic</td>
                <td></td>
                <td></td>
                <td>1</td>
                <td className="price">$29.0</td>
              </tr>
              <tr>
                <td>E0128</td>
                <td>Apollo Clinic</td>
                <td></td>
                <td></td>
                <td>1</td>
                <td className="price">$29.0</td>
              </tr>
              <tr>
                <td>E0128</td>
                <td>Apollo Clinic</td>
                <td></td>
                <td></td>
                <td>1</td>
                <td className="price">$29.0</td>
              </tr>
              <tr>
                <td>E0128</td>
                <td>E0128: CRYO CUFF</td>
                <td></td>
                <td></td>
                <td>1</td>
                <td className="price">$29.0</td>
              </tr>
              <tr>
                <td>E0128</td>
                <td>E0128: CRYO CUFF</td>
                <td></td>
                <td></td>
                <td>1</td>
                <td className="price">$29.0 </td>
              </tr>
              <tr>
                <td>E0128</td>
                <td>E0128: CRYO CUFF</td>
                <td></td>
                <td></td>
                <td>1</td>
                <td className="price">$29.0</td>
              </tr>
              <tr>
                <td>E0128</td>
                <td>E0128: CRYO CUFF</td>
                <td></td>
                <td></td>
                <td>1</td>
                <td className="price">$29.0</td>
              </tr>
              <tr>
                <td>E0128</td>
                <td>E0128: CRYO CUFF</td>
                <td></td>
                <td></td>
                <td>1</td>
                <td className="price">$29.0</td>
              </tr>
              <tr>
                <td>E0128</td>
                <td>E0128: CRYO CUFF</td>
                <td></td>
                <td></td>
                <td>1</td>
                <td className="price">$29.0</td>
              </tr>
            </tbody>
          </Table>
        )}
      </div>
    </div>
  );
}

export default DMElookUp;
