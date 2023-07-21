import React from "react";
import "./style.scss";
import TableSection from "../../components/TableSection";
import { Row, Col, Dropdown, Pagination } from "react-bootstrap";
import Search from "../../assests/images/dashborad/Search.png";
import Arrowleft from "../../assests/images/dashborad/arrow-left.png";
import Arrowright from "../../assests/images/dashborad/arrow-right.png";
import Dropdownarrow from "../../assests/images/dashborad/dropdown.png";

function index() {
  return (
    <>
      <div className="Patients_section">
        <Row>
          <Col md={4}>
            <h1>Patients</h1>
          </Col>
          <Col md={6}>
            <div className="position-relative">
              <img className="search-img" src={Search} />
              <input
                className="w-100 search-input"
                placeholder="Search patients"
              />
            </div>
          </Col>
          <Col md={2}>
            <button className="btn export-button">Export</button>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col md={3} className="status_dropdown">
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
            <Dropdown>
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
            <Pagination>
              <Pagination.Prev>
                <img src={Arrowleft} className="pe-2" />
                Previous
              </Pagination.Prev>

              <Pagination.Item active>{1}</Pagination.Item>
              <Pagination.Item>{2}</Pagination.Item>
              <Pagination.Item>{3}</Pagination.Item>

              <Pagination.Ellipsis />
              <Pagination.Item>{8}</Pagination.Item>
              <Pagination.Item>{9}</Pagination.Item>
              <Pagination.Item>{10}</Pagination.Item>
              <Pagination.Next>
                Next
                <img src={Arrowright} className="ps-2" />
              </Pagination.Next>
            </Pagination>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default index;
