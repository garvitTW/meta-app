import "./style.scss";
import { Row, Col, InputGroup, Form, Button } from "react-bootstrap";
import DeleteIcon from "../../../../assests/images/dashborad/delete.png";
import AddIcon from "../../../../assests/images/dashborad/plus-circle.svg";
import CrossIcon from "../../../../assests/images/dashborad/cross.svg";
import SaveIcon from "../../../../assests/images/dashborad/save.svg";
function AddOrganisationProfessional() {
  return (
    <>
      <div className="Add_Organisation_Professional">
        <Row className="AddOrganisationProfile ">
          <Col md={12}>
            <h2 className="mt-0">Services offered (Select Minimum 1)</h2>
            <hr />
          </Col>

          <Col md={10}>
            <Row>
              <Col md={4}>
                <InputGroup className="mb-3">
                  <InputGroup.Checkbox aria-label="Checkbox for following text input" />
                  <span className="checkbox-label">General Practitioner</span>
                </InputGroup>
              </Col>
              <Col md={3}>
                <InputGroup className="mb-3">
                  <InputGroup.Checkbox aria-label="Checkbox for following text input" />
                  <span className="checkbox-label">Dentist</span>
                </InputGroup>
              </Col>
              <Col md={5}>
                <InputGroup className="mb-3">
                  <InputGroup.Checkbox aria-label="Checkbox for following text input" />
                  <span className="checkbox-label">Chiropractor</span>
                </InputGroup>
              </Col>
              <Col md={4}>
                <InputGroup className="mb-3">
                  <InputGroup.Checkbox aria-label="Checkbox for following text input" />
                  <span className="checkbox-label">
                    Pain Management Specialist
                  </span>
                </InputGroup>
              </Col>
              <Col md={3}>
                <InputGroup className="mb-3">
                  <InputGroup.Checkbox aria-label="Checkbox for following text input" />
                  <span className="checkbox-label">Internist</span>
                </InputGroup>
              </Col>
              <Col md={5}>
                <InputGroup className="mb-3">
                  <InputGroup.Checkbox aria-label="Checkbox for following text input" />
                  <span className="checkbox-label">
                    Orthopedic Sports Medicine Specialist
                  </span>
                </InputGroup>
              </Col>
              <Col md={4}>
                <InputGroup className="mb-3">
                  <InputGroup.Checkbox aria-label="Checkbox for following text input" />
                  <span className="checkbox-label">Physical Therapist</span>
                </InputGroup>
              </Col>
              <Col md={3}>
                <InputGroup className="mb-3">
                  <InputGroup.Checkbox aria-label="Checkbox for following text input" />
                  <span className="checkbox-label">Endocrinologist</span>
                </InputGroup>
              </Col>
              <Col md={5}>
                <InputGroup className="mb-3">
                  <InputGroup.Checkbox aria-label="Checkbox for following text input" />
                  <span className="checkbox-label">Oncologist</span>
                </InputGroup>
              </Col>
              <Col md={12}>
                <Form.Label htmlFor="" className="mt-3">
                  Other
                </Form.Label>
                <div className="others_section">
                  <Form.Control type="text" placeholder="Other reason..." />
                  <Button>Add</Button>
                </div>
              </Col>
            </Row>
          </Col>
          <Col md={12}>
            <h2 className="mt-0">Languages</h2>
            <hr />
            <Form.Label htmlFor="" className="mt-3">
              Languages<span className="mendatory-feild">*</span>
            </Form.Label>
            <Form.Select className="Languages_select">
              <option>Select Languages</option>
              <option value="1">One</option>
            </Form.Select>
            <div className="select_tags">
              <ul>
                <li>
                  English<img src={CrossIcon}/></li>
                <li>spanish<img src={CrossIcon}/></li>
              </ul>
            </div>
          </Col>
          <Col md={12}>
            <h2 className="mt-0">Documents</h2>
            <hr />
            <Form.Label htmlFor="" className="mt-3">
              Languages<span className="mendatory-feild">*</span>
            </Form.Label>
          </Col>
        </Row>
        <div className="d-flex Category_div">
          <div>
            <p>Category</p>
            <Form.Select className="">
              <option>License </option>
              <option value="1">One</option>
            </Form.Select>
          </div>
          <div>
            <p>Document Type</p>
            <Form.Control type="text" placeholder="Clinic License" />
          </div>
          <div>
            <p>Issuer Name</p>
            <Form.Control type="text" placeholder="License Issuer" />
          </div>
          <div>
            <p>License Number</p>
            <Form.Control type="text" placeholder="License Number (#)" />
          </div>
          <div>
            <p>Validity</p>
            <Form.Control type="text" placeholder="Validity" />
          </div>
          <div className="d-flex Category_div">
            <Button>
              <img src={SaveIcon} />
            </Button>
            <Button>
              <img src={DeleteIcon} />
            </Button>
          </div>
        </div>
        <button className="add_morebtn">
          <img src={AddIcon} className="me-2" />
          Add More
        </button>
        <Row className="mt-5">
          <Col md={12}>
            <button className="cancel-buttongry">
            Cancel
        </button>
        <button className="blue-button">
        Add Organization
        </button>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default AddOrganisationProfessional;
