import "./style.scss";
import { Row, Col, Form, Container } from "react-bootstrap";




function addPatient() {
  return <>
     <div className="AddPatient">
        
              <Row>
                <Col md={8}>
                <Form>
                   <h1>Add Patient</h1>
                    <Row>
                        <Col md={6} className="mb-4">
                        <label>First Name</label>
                        <input
                          name="name"
                          type="text"
                          placeholder="Enter First Name"
                        />
                      </Col>
                        <Col md={6} className="mb-4">
                        <label>Last Name</label>
                        <input
                          name="name"
                          type="text"
                          placeholder="Enter Last Name"
                        />
                      </Col>
                      <Col md={6} className="mb-4">
                      <label>Email</label>
                      <input
                        name="name"
                        type="text"
                        placeholder="Enter Email"
                      />
                    </Col>
                    <Col md={6} className="mb-4">
                    <label>Patient Phone Number</label>
                    <input
                      name=""
                      type="number"
                      placeholder="Enter Phone Number"
                    />
                  </Col>
                    </Row>

                    <div className="PatientAddress">
                        <h2>Patient Address</h2>
                        <Row>
                           <Col md={6} className="mb-4">
                           <label>Street</label>
                           <input
                           name="street"
                           type="text"
                           placeholder="Enter Street"
                          />
                           </Col>
                           <Col md={6} className="mb-4">
                           <label>Suite/Unit #</label>
                           <input
                           name=""
                           type="text"
                           placeholder="Enter Suite/Unit #"
                          /></Col>
                          <Col md={6} className="mb-4">
                          <label>City</label>
                          <input
                          name=""
                          type="text"
                          placeholder="Enter City"
                         /></Col>
                         <Col md={6} className="mb-4">
                         <label>State</label>
                         <input
                         name=""
                         type="text"
                         placeholder="Enter State"
                        /></Col>
                        </Row>
                    </div>
                    <button className="btn">Next</button>
                    </Form>
                </Col>
              </Row>
         
     </div>
  </>;
}
export default addPatient;
