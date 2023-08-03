import React from "react";
import "./style.scss";
import TableSection from "../../components/TableSection";
import PaginationSection from "../../components/PaginationSection";
import { Row, Col, Dropdown } from "react-bootstrap";
import Search from "../../assests/images/dashborad/Search.png";
import Dropdownarrow from "../../assests/images/dashborad/dropdown.png";

function Patients() {
  return (
    <>
      <div className="Patients_section">
        <div>
          <div className="d-inline-block">
            <h1>Patients</h1>
          </div>
          <div className="right-header">
            <div className="position-relative">
              <img className="search-img" src={Search} alt="search" />
              <input className=" search-input" placeholder="Search patients" />
            </div>
            <div>
              <button className="btn export-button w-export">Export</button>
            </div>
          </div>
        </div>
        <Row className="mt-4">
          <Col md={3} className="status_dropdown enable-status">
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                <span>Status:</span> Enabled
                <img src={Dropdownarrow} />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
          <Col md={4} className="status_dropdown">
            <Dropdown className="posture-status">
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                <span>Posture Score:</span> 50% to 70%
                <img src={Dropdownarrow} />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
        <Row className="table-margin">
          <Col md={12}>
            <TableSection />
          </Col>
          <Col md={12}>
            <PaginationSection />
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Patients;
