import "./style.scss";
import LoaderSpinner from "../../components/spinner";
import Search from "../../assests/images/dashborad/Search.png";
import { Table, Row, Col } from "react-bootstrap";
import Dropdownarrow from "../../assests/images/dashborad/dropdown.png";
import Closeicon from "../../assests/images/dashborad/closeIcon.svg";
import { useEffect, useState } from "react";
import { dmeService } from "../../services/dme.service";

function DMElookUp() {
  const [result, setResult] = useState(false);
  const [ICDList, setICDList] = useState([]);
  const [ICDSearchValue, setICDSearchValue] = useState("");
  const [selectedICDValue, setSelectedICDValue] = useState("");
  const [insuranceSearchValue, setInsuranceSearchValue] = useState("");
  const [insuranceSelectedValue, setInsuranceSelectedValue] = useState("");
  const [isInsuranceActive, setInsuranceActive] = useState(false);
  const [insuranceList, setInsuranceList] = useState([]);
  const [error, setError] = useState("");
  const [loadingICD, setLoadingICD] = useState(false);
  const [loadingInsurance, setLoadingInsurance] = useState(false);
  const [loadingResult, setLoadingResult] = useState(false);
  const [icdTimmer, setIcdTimmer] = useState(false);
  const [insuranceTimer, setInsuranceTimer] = useState(false);

  const fetchDiagnosisList = async (searchTerm) => {
    try {
      setLoadingICD(true);
      const result = await dmeService.getDiagnosisName({
        diagnosis_name: searchTerm,
      });
      setICDList(result);
      setLoadingICD(false);
    } catch (err) {
      setLoadingICD(false);
      console.log(err);
    }
  };

  const fetchInsuranceList = async (searchTerm) => {
    try {
      setLoadingInsurance(true);
      const result = await dmeService.getCompanyName({
        company_name: searchTerm,
      });
      setInsuranceList(result);
      setLoadingInsurance(false);
    } catch (err) {
      setLoadingInsurance(false);
      console.log(err);
    }
  };

  useEffect(() => {
    fetchInsuranceList(insuranceSearchValue);
  }, []);

  const handleICDSearch = (e) => {
    const { value } = e.target;
    setICDSearchValue(value);
    setSelectedICDValue("");
    const timer = setTimeout(() => {
      fetchDiagnosisList(value);
    }, 600);
    setIcdTimmer(timer);
    if (icdTimmer) {
      clearTimeout(icdTimmer);
    }
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
    const { value } = e.target;
    setInsuranceActive(true);
    setInsuranceSearchValue(value);
    setInsuranceSelectedValue("");
    const timer = setTimeout(() => {
      fetchInsuranceList(value);
    }, 600);
    setInsuranceTimer(timer);
    if (insuranceTimer) {
      clearTimeout(insuranceTimer);
    }
  };

  const searchHandler = async () => {
    if (selectedICDValue && insuranceSelectedValue) {
      try {
        setLoadingResult(true);
        const result = await dmeService.getDMELookUp({
          company_name: insuranceSelectedValue,
          diagnosis_name: selectedICDValue,
        });
        setResult(result);
        setLoadingResult(false);
      } catch (err) {
        setLoadingResult(false);
        console.log(err);
      }
    } else {
      setError("Select Both ICD10 & Insurance Provider");
    }
  };

  const handleICDClear = () => {
    setICDSearchValue("");
    setSelectedICDValue("");
  };
  return (
    <div className="Patients_section Organization-section AddOrganisationProfile dme_outer">
      <h1>Search using : ICD10 & Insurance Provider </h1>

      <div className="formBox">
        {result && (
          <p className="text-left">
            <button onClick={() => setResult(false)}>Search again</button>
          </p>
        )}

        <Row className="bottomSpace">
          <Col sm={6}>
            <h5>ICD10 :</h5>
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
                        key={data?.diagnosis_name}
                        className="curserPointer"
                        onClick={() =>
                          handleSelectICDValue(data?.diagnosis_name)
                        }
                      >
                        {data?.diagnosis_name}
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
            <h5>Insurance Provider:</h5>

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
                        onClick={() =>
                          handleSelectInsuranceValue(data?.primary_payer)
                        }
                      >
                        {data?.primary_payer}
                      </p>
                    ))
                  ) : (
                    <p>No data</p>
                  )}
                </div>
              )}
            </div>
          </Col>
          <Col sm={12}>
            <LoaderSpinner
              className="customloader"
              loading={loadingICD || loadingInsurance || loadingResult}
            />
          </Col>

          {!result && (
            <>
              <button onClick={searchHandler}>Search</button>
              {error && <p className="errorMessage">{error}</p>}
            </>
          )}
        </Row>

        {result &&
          (result.length > 0 ? (
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
                {result?.map((res, index) => (
                  <tr key={index}>
                    <td className="support">{res?.hcpcs_code}</td>
                    <td>{res?.hcpcs_description}</td>
                    <td>{res?.sku}</td>
                    <td>{res?.year_of_service}</td>
                    <td>{res?.total_payments}</td>
                    <td className="price">{res?.total_charge}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <p>No data</p>
          ))}
      </div>
    </div>
  );
}

export default DMElookUp;
