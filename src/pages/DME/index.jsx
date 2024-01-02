import "./style.scss";
import LoaderSpinner from "../../components/spinner";
import Search from "../../assests/images/dashborad/Search.png";
import { Table, Row, Col, InputGroup } from "react-bootstrap";
import Closeicon from "../../assests/images/dashborad/closeIcon.svg";
import { useEffect, useMemo, useState } from "react";
import { dmeService } from "../../services/dme.service";
import ModalComponent from "../../components/modal";
import DmePopUp from "../../components/dmePopup";
import Dropdown from 'react-bootstrap/Dropdown';
import tableDropdown from "../../assests/images/table/table_dropdown.svg"

function DMElookUp() {
  const [result, setResult] = useState(false);
  const [show, setShow] = useState("");
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
      (insurance?.company_name || "")
        .toLowerCase()
        .includes(insuranceSearchValue.toLowerCase())
    );
  }, [insuranceList, insuranceSearchValue]);

  const diagnosisListToShow = useMemo(() => {
    return diagnosisList.filter((diagnosis) =>
      diagnosis?.diagnosis_name
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
        setIsInsuranceActive(false);
        setIsDiagnosisActive(false);
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
    setIsDiagnosisActive(false);
    setDiagnosisSearchValue("");
    setSelectedDiagnosisValue("");
  };

  const handleInsuranceClear = () => {
    setIsInsuranceActive(false);
    setInsuranceSelectedValue("");
    setInsuranceSearchValue("");
  };

  const handleSupportedDMEPopup = (diagnosisName) => {
    if (diagnosisName.toLowerCase().includes("m170")) {
      setShow(true);
    }
  };
  return (
    <>
      <div className="Patients_section  dme_outer">
        <div className="formBox">
          <Row className="bottomSpace">
            <Col sm={5}>
              <div className="position-relative">
                <img className="search-img" src={Search} alt="search" />
                <img
                  className="closeicon"
                  src={Closeicon}
                  alt="Close"
                  onClick={handleDiagnosisClear}
                />

                <input
                  onClick={() => setIsDiagnosisActive(true)}
                  value={diagnosisSearchValue}
                  onChange={handleDiagnosisSearch}
                  className="search-input"
                  placeholder="Search for ICD-10 Code or diagnosis"
                />
                {isDiagnosisActive && (
                  <div className="searchItem Scroll">
                    {diagnosisListToShow.length > 0 ? (
                      diagnosisListToShow.map((data, index) => (
                        <p
                          key={index}
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
              <div className="position-relative">
                <img className="search-img" src={Search} alt="search" />
                <img
                  className="closeicon"
                  src={Closeicon}
                  alt="Close"
                  onClick={handleInsuranceClear}
                />

                <input
                  className="search-input"
                  placeholder="Insurance Provider"
                  value={insuranceSearchValue}
                  onChange={handleInsuranceSearch}
                  onClick={() => setIsInsuranceActive(true)}
                />
                {isInsuranceActive && (
                  <div className="searchItem Scroll">
                    {insuranceCompanyListToShow.length > 0 ? (
                      insuranceCompanyListToShow.map((data, index) => (
                        <p
                          key={index}
                          className="curserPointer"
                          onClick={() =>
                            handleSelectInsuranceValue(data?.company_name)
                          }
                        >
                          {data?.company_name}
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
              <button onClick={searchHandler}>Search</button>
              {error && <p className="errorMessage">{error}</p>}
            </Col>
            <Col sm={12}>
              <LoaderSpinner
                className="customloader"
                loading={loadingInsurance || loadingResult}
              />
            </Col>
            <Col sm={12}>
                <div className="dropdownarea">
                   <div className="innerbox">
                   <Dropdown>
                   <Dropdown.Toggle id="dropdown-basic">
                      <img src={tableDropdown} alt="tabledropdown"/>
                   </Dropdown.Toggle>
             
                   <Dropdown.Menu>
                     <Dropdown.Item > <InputGroup >
                     <InputGroup.Checkbox
                      
                     />
                     <span >ABC</span>
                   </InputGroup></Dropdown.Item>
                   <Dropdown.Item > <InputGroup >
                   <InputGroup.Checkbox
                    
                   />
                   <span >ABC</span>
                 </InputGroup></Dropdown.Item>
                 <Dropdown.Item > <InputGroup >
                 <InputGroup.Checkbox
                  
                 />
                 <span >ABC</span>
               </InputGroup></Dropdown.Item>
                   </Dropdown.Menu>
                 </Dropdown>
                   </div>  
                </div>
            </Col>
          </Row>

          {result &&
            (result.length > 0 ? (
              <div className="tableArea Scroll">
                <Table
                  responsive
                  className="table-stripednew Patients-table Decliend_table"
                  variant="dark"
                >
                  <thead>
                    <tr>
                      <th>HCPCS & Modifiers</th>
                      <th className="athena">Athena Description</th>
                      <th>SKU</th>
                      <th>Primary Diagnosis</th>
                      <th>Year of Service</th>
                      <th>Primary Payor</th>
                      <th>Primary Outstanding</th>
                      <th>Total Charges</th>
                      <th>Primary Payments</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result?.map((res, index) => (
                      <tr key={index}>
                        <td className="support">{res?.hcpcs_code}</td>
                        <td className="athena">{res?.dme_description}</td>
                        <td>{res?.sku}</td>
                        <td
                          className="support curserPointer"
                          onClick={() =>
                            handleSupportedDMEPopup(res?.diagnosis_name)
                          }
                        >
                          {res?.diagnosis_name}
                        </td>
                        <td>{res?.year_of_service}</td>
                        <td>{res?.primary_payer}</td>
                        <td className="price">${res?.primary_outstanding}</td>
                        <td className="price">${res?.total_charge}</td>
                        <td className="price">${res?.primary_payments}</td>
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
      <ModalComponent
        modelTitle="Supported DMEs for ICDM17.0 by Humana insurance"
        setShow={setShow}
        show={show}
        className="maxWidth"
      >
        <DmePopUp />
      </ModalComponent>
    </>
  );
}

export default DMElookUp;
