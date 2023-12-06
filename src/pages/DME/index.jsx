import "./style.scss";
import LoaderSpinner from "../../components/spinner";
import Search from "../../assests/images/dashborad/Search.png";
import { Table, Row, Col } from "react-bootstrap";
import Dropdownarrow from "../../assests/images/dashborad/dropdown.png";
import Closeicon from "../../assests/images/dashborad/closeIcon.svg";
import { useEffect, useMemo, useState } from "react";
import { dmeService } from "../../services/dme.service";

function DMElookUp() {
  const [result, setResult] = useState([]);
  const [diagnosisList, setDiagnosisList] = useState([]);
  const [diagnosisSearchValue, setDiagnosisSearchValue] = useState("");
  const [selectedDiagnosisValue, setSelectedDiagnosisValue] = useState("");
  const [isDiagnosisActive, setIsDiagnosisActive] = useState(false);
  const [insuranceSearchValue, setInsuranceSearchValue] = useState("");
  const [insuranceSelectedValue, setInsuranceSelectedValue] = useState("");
  const [isInsuranceActive, setIsInsuranceActive] = useState(false);
  const [insuranceList, setInsuranceList] = useState([]);
  const [error, setError] = useState("");
  const [loadingInsurance, setLoadingInsurance] = useState(false);
  const [loadingResult, setLoadingResult] = useState(false);

  const insuranceCompanyListToShow = useMemo(() => {
    return insuranceList.filter((insurance) =>
      insurance.primary_payer
        .toLowerCase()
        .includes(insuranceSearchValue.toLowerCase())
    );
  }, [insuranceList, insuranceSearchValue]);

  const diagnosisListToShow = useMemo(() => {
    return diagnosisList.filter((diagnosis) =>
      diagnosis.diagnosis_name
        .toLowerCase()
        .includes(diagnosisSearchValue.toLowerCase())
    );
  }, [diagnosisList, diagnosisSearchValue]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingInsurance(true);
        const resultCompany = await dmeService.getCompanyName();
        const resultDiagnosis = await dmeService.getDiagnosisName();
        setInsuranceList(resultCompany);
        setDiagnosisList(resultDiagnosis);
        setLoadingInsurance(false);
      } catch (err) {
        setLoadingInsurance(false);
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const handleDiagnosisSearch = (e) => {
    const { value } = e.target;
    setIsDiagnosisActive(true);
    setDiagnosisSearchValue(value);
    setSelectedDiagnosisValue("");
  };

  const handleSelectDiagnosisValue = (data) => {
    setIsDiagnosisActive(false);
    setDiagnosisSearchValue(data);
    setSelectedDiagnosisValue(data);
    setError("");
  };

  const handleSelectInsuranceValue = (data) => {
    setIsInsuranceActive(false);
    setInsuranceSearchValue(data);
    setInsuranceSelectedValue(data);
    setError("");
  };

  const handleInsuranceSearch = (e) => {
    const { value } = e.target;
    setIsInsuranceActive(true);
    setInsuranceSearchValue(value);
    setInsuranceSelectedValue("");
  };

  const searchHandler = async () => {
    if (selectedDiagnosisValue || insuranceSelectedValue) {
      try {
        setLoadingResult(true);
        const result = await dmeService.getDMELookUp({
          company_name: insuranceSelectedValue,
          diagnosis_name: selectedDiagnosisValue,
        });
        setResult(result);
        setLoadingResult(false);
      } catch (err) {
        setLoadingResult(false);
        console.log(err);
      }
    } else {
      setError("Select At least ICD10 or Insurance Provider");
    }
  };

  const handleDiagnosisClear = () => {
    setDiagnosisSearchValue("");
    setSelectedDiagnosisValue("");
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
          <Col sm={5}>
            <h5>ICD10 :</h5>
            <div className="position-relative">
              {!result && (
                <>
                  <img className="search-img" src={Search} alt="search" />
                  <img
                    className="closeicon"
                    src={Closeicon}
                    alt="Close"
                    onClick={handleDiagnosisClear}
                  />
                </>
              )}
              <input
                onClick={() => setIsDiagnosisActive(true)}
                value={diagnosisSearchValue}
                onChange={handleDiagnosisSearch}
                className="search-input"
                placeholder="Search for ICD-10 Code or diagnosis"
                readOnly={result}
              />
              {!result && isDiagnosisActive && (
                <div className="searchItem Scroll">
                  {diagnosisListToShow.length > 0 ? (
                    diagnosisListToShow.map((data) => (
                      <p
                        key={data?.diagnosis_name}
                        className="curserPointer"
                        onClick={() =>
                          handleSelectDiagnosisValue(data?.diagnosis_name)
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
          <Col sm={5}>
         
            <h5>Insurance Provider:</h5>

            <div className="position-relative">
              {!result && (
                <>
                  <img className="search-img" src={Search} alt="search" />
                  <img
                    className="closeicon"
                    src={Dropdownarrow}
                    alt="Close"
                    onClick={() => setIsInsuranceActive(!isInsuranceActive)}
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
                  {insuranceCompanyListToShow.length > 0 ? (
                    insuranceCompanyListToShow.map((data) => (
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
          <Col sm={2}>
          {!result && (
            <>
              <button onClick={searchHandler}>Search</button>
              {error && <p className="errorMessage">{error}</p>}
            </>
          )}</Col>
          <Col sm={12}>
            <LoaderSpinner
              className="customloader"
              loading={loadingInsurance || loadingResult}
            />
          </Col>

         
        </Row>

        {result &&
          (result.length===0? (
            <div className="tableArea">
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
                    <td className="price">$ {res?.total_charge}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            </div>
          ) : (
            <p>No data</p>
          ))}
      </div>
    </div>
  );
}

export default DMElookUp;
