import { useState } from 'react';
import React from "react";
import Emailimg from "../../assests/images/dashborad/email.svg"
import Phoneimg from "../../assests/images/dashborad/phone.png"
import Faximg from "../../assests/images/dashborad/fax.svg"
import Addressimg from "../../assests/images/dashborad/address.svg"
import Delete from "../../assests/images/dashborad/trash.svg"
import Edit from "../../assests/images/dashborad/pen.svg"
import {
  Table,
  InputGroup,
  Form,
  Button,
  Modal,
  Row,
  Col
} from "react-bootstrap";
import "./style.scss";
function Tablemy() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div>
      <Table responsive striped className="Patients-table" variant="dark">
        <thead>
          <tr>
            <th>
              <InputGroup className="mb-3">
                <InputGroup.Checkbox aria-label="Checkbox for following text input" />
              </InputGroup>
            </th>
            <th> MRN</th>
            <th> Patient Name</th>
            <th> Posture Score</th>
            <th> Last Doctor’s Apointment</th>
            <th> Last Self Scan</th>
            <th> Next Scan</th>
            <th> Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <InputGroup className="mb-3">
                <InputGroup.Checkbox aria-label="Checkbox for following text input" />
              </InputGroup>
            </td>
            <td>xxxxxxxx</td>
            <td className="name-text" onClick={handleShow}>Jennifer Graham</td>
            <td>xx%</td>
            <td>mm/dd/yyyy</td>
            <td>mm/dd/yyyy</td>
            <td>mm/dd/yyyy</td>
            <td>
              <div>
                <Form>
                  <Form.Check type="switch" id="custom-switch" label="" />
                </Form>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <InputGroup className="mb-3">
                <InputGroup.Checkbox aria-label="Checkbox for following text input" />
              </InputGroup>
            </td>
            <td>xxxxxxxx</td>
            <td className="name-text">Jennifer Graham</td>
            <td>xx%</td>
            <td>mm/dd/yyyy</td>
            <td>mm/dd/yyyy</td>
            <td>mm/dd/yyyy</td>
            <td>
              <div>
                <Form>
                  <Form.Check type="switch" id="custom-switch" label="" />
                </Form>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <InputGroup className="mb-3">
                <InputGroup.Checkbox aria-label="Checkbox for following text input" />
              </InputGroup>
            </td>
            <td>xxxxxxxx</td>
            <td className="name-text">Jennifer Graham</td>
            <td>xx%</td>
            <td>mm/dd/yyyy</td>
            <td>mm/dd/yyyy</td>
            <td>mm/dd/yyyy</td>
            <td>
              <div>
                <Form>
                  <Form.Check type="switch" id="custom-switch" label="" />
                </Form>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <InputGroup className="mb-3">
                <InputGroup.Checkbox aria-label="Checkbox for following text input" />
              </InputGroup>
            </td>
            <td>xxxxxxxx</td>
            <td className="name-text">Jennifer Graham</td>
            <td>xx%</td>
            <td>mm/dd/yyyy</td>
            <td>mm/dd/yyyy</td>
            <td>mm/dd/yyyy</td>
            <td>
              <div>
                <Form>
                  <Form.Check type="switch" id="custom-switch" label="" />
                </Form>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <InputGroup className="mb-3">
                <InputGroup.Checkbox aria-label="Checkbox for following text input" />
              </InputGroup>
            </td>
            <td>xxxxxxxx</td>
            <td className="name-text">Jennifer Graham</td>
            <td>xx%</td>
            <td>mm/dd/yyyy</td>
            <td>mm/dd/yyyy</td>
            <td>mm/dd/yyyy</td>
            <td>
              <div>
                <Form>
                  <Form.Check type="switch" id="custom-switch" label="" />
                </Form>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <InputGroup className="mb-3">
                <InputGroup.Checkbox aria-label="Checkbox for following text input" />
              </InputGroup>
            </td>
            <td>xxxxxxxx</td>
            <td className="name-text">Jennifer Graham</td>
            <td>xx%</td>
            <td>mm/dd/yyyy</td>
            <td>mm/dd/yyyy</td>
            <td>mm/dd/yyyy</td>
            <td>
              <div>
                <Form>
                  <Form.Check type="switch" id="custom-switch" label="" />
                </Form>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <InputGroup className="mb-3">
                <InputGroup.Checkbox aria-label="Checkbox for following text input" />
              </InputGroup>
            </td>
            <td>xxxxxxxx</td>
            <td className="name-text">Jennifer Graham</td>
            <td>xx%</td>
            <td>mm/dd/yyyy</td>
            <td>mm/dd/yyyy</td>
            <td>mm/dd/yyyy</td>
            <td>
              <div>
                <Form>
                  <Form.Check type="switch" id="custom-switch" label="" />
                </Form>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <InputGroup className="mb-3">
                <InputGroup.Checkbox aria-label="Checkbox for following text input" />
              </InputGroup>
            </td>
            <td>xxxxxxxx</td>
            <td className="name-text">Jennifer Graham</td>
            <td>xx%</td>
            <td>mm/dd/yyyy</td>
            <td>mm/dd/yyyy</td>
            <td>mm/dd/yyyy</td>
            <td>
              <div>
                <Form>
                  <Form.Check type="switch" id="custom-switch" label="" />
                </Form>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <InputGroup className="mb-3">
                <InputGroup.Checkbox aria-label="Checkbox for following text input" />
              </InputGroup>
            </td>
            <td>xxxxxxxx</td>
            <td className="name-text">Jennifer Graham</td>
            <td>xx%</td>
            <td>mm/dd/yyyy</td>
            <td>mm/dd/yyyy</td>
            <td>mm/dd/yyyy</td>
            <td>
              <div>
                <Form>
                  <Form.Check type="switch" id="custom-switch" label="" />
                </Form>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <InputGroup className="mb-3">
                <InputGroup.Checkbox aria-label="Checkbox for following text input" />
              </InputGroup>
            </td>
            <td>xxxxxxxx</td>
            <td className="name-text">Jennifer Graham</td>
            <td>xx%</td>
            <td>mm/dd/yyyy</td>
            <td>mm/dd/yyyy</td>
            <td>mm/dd/yyyy</td>
            <td>
              <div>
                <Form>
                  <Form.Check type="switch" id="custom-switch" label="" />
                </Form>
              </div>
            </td>
          </tr>
        </tbody>
      </Table>
      <div>
       

      <Modal show={show} onHide={handleClose} className="patient-info">
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={12}>
              <div className='info_section'>
                <div className='info-bg'>
                  JG
                </div>
                <p>Jennifer Graham</p>
                <p>MRN- 123456</p>
              </div>
              <div className='bottom-info'>
                  <Row>
                    <Col md={6}>
                      <img src={Emailimg}/>Email
                    </Col>
                    <Col md={6}>
                      <p>Jennifer Graham@mail.com</p>
                    </Col>
                    <Col md={6}>
                      <img src={Phoneimg}/>Phone
                    </Col>
                    <Col md={6}>
                      <p>
                      050 414 8778
                      </p>
                    </Col>
                    <Col md={6}>
                      <img src={Faximg}/>Fax
                    </Col>
                    <Col md={6}>
                      <p>050 414 8778</p>
                    </Col>
                    <Col md={6}>
                      <img src={Addressimg}/>Address
                    </Col>
                    <Col md={6}>
                      <p>1234, Main Street, New York, USA- 10001</p>
                    </Col>
                  </Row>
              </div>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" className='delete-button' onClick={handleClose}>
          <img src={Delete}/>delete  
          </Button>
          <Button variant="primary"className='edit-button' onClick={handleClose}>
          <img src={Edit}/>edit
          </Button>
        </Modal.Footer>
      </Modal>
        </div>
    </div>
  );
}

export default Tablemy;
