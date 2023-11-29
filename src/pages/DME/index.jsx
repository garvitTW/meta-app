import "./style.scss";
import Search from "../../assests/images/dashborad/Search.png";
import { Table, InputGroup, Row, Form, Col, Tabs, Tab } from "react-bootstrap";
import Dropdownarrow from "../../assests/images/dashborad/dropdown.png";
import Closeicon from "../../assests/images/dashborad/closeIcon.svg";
import EditIcon from "../../assests/images/dashborad/edit.png";


function DMElookUp() {

  return <>
     <div className="Patients_section Organization-section AddOrganisationProfile">
        <h1>Search using : ICD10 & Insurance Provider</h1>

        
        <div className="formBox">
            <Row>
                <Col sm={6}>
                <div className="position-relative">
                <img className="search-img" src={Search} alt="search" />
                <img className="closeicon" src={Closeicon} alt="Close" />
                <input
                className="search-input"
                placeholder="Search by Organization Name"
                 />
                 {/*<div className="searchItem Scroll">
                    <p>ICD-10 CM M01 - Direct infections of joint in <span>infectious...</span></p>
                    <p>ICD-10 CM M01 - Direct infections of joint in <span>infectious...</span></p>
                    <p>ICD-10 CM M01 - Direct infections of joint in <span>infectious...</span></p>
                    <p>ICD-10 CM M01 - Direct infections of joint in <span>infectious...</span></p>
                    <p>ICD-10 CM M01 - Direct infections of joint in <span>infectious...</span></p>
                    <p>ICD-10 CM M01 - Direct infections of joint in <span>infectious...</span></p>
                    <p>ICD-10 CM M01 - Direct infections of joint in <span>infectious...</span></p>
                    <p>ICD-10 CM M01 - Direct infections of joint in <span>infectious...</span></p>
</div>*/}
              </div>
                </Col>
                <Col sm={6}>
                <div className="position-relative">
                <img className="search-img" src={Search} alt="search" />
                <img src={Dropdownarrow} className="addIcon" alt="add" />
                <input
                className="search-input"
                placeholder="Search by Organization Name"
                 />
                 
              </div>
                </Col>

               {/* <button>Search</button>*/}
            </Row>
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
                <td>
                   E0128
                </td>
                <td>Apollo Clinic</td>
                <td></td>
                <td>
                  
                </td>
                <td>
                  1
                </td>
                <td className="price">$29.0</td>
              </tr>
              <tr>
                <td>
                 E0128
                </td>
                <td>Apollo Clinic</td>
                <td></td>
                <td></td>
                <td>1</td>
                <td className="price">$29.0</td>
              </tr>
              <tr>
                <td>
                E0128
                </td>
                <td>Apollo Clinic</td>
                <td></td>
                <td></td>
                <td>1</td>
                <td className="price">$29.0</td>
              </tr>
              <tr>
                <td>
                E0128
                </td>
                <td>E0128: CRYO CUFF</td>
                <td></td>
                <td></td>
                <td>1</td>
                <td className="price">$29.0</td>
              </tr>
              <tr>
                <td>
                E0128
                </td>
                <td>E0128: CRYO CUFF</td>
                <td></td>
                <td></td>
                <td>1</td>
                <td className="price">$29.0 </td>
              </tr>
              <tr>
                <td>
                E0128
                </td>
                <td>E0128: CRYO CUFF</td>
                <td></td>
                <td></td>
                <td>1</td>
                <td className="price">$29.0</td>
              </tr>
              <tr>
                <td>
                E0128
                </td>
                <td>E0128: CRYO CUFF</td>
                <td></td>
                <td></td>
                <td>1</td>
                <td className="price">$29.0</td>
              </tr>
              <tr>
                <td>
                E0128
                </td>
                <td>E0128: CRYO CUFF</td>
                <td></td>
                <td></td>
                <td>1</td>
                <td className="price">$29.0</td>
              </tr>
              <tr>
                <td>
                E0128
                </td>
                <td>E0128: CRYO CUFF</td>
                <td></td>
                <td></td>
                <td>1</td>
                <td className="price">$29.0</td>
              </tr>
            </tbody>
          </Table>
        </div>

        </div>
         </>;
}

export default DMElookUp;
