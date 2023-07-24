import React from "react";
import "./style.scss";
import { Pagination } from "react-bootstrap";
import Arrowleft from "../../assests/images/dashborad/arrow-left.png";
import Arrowright from "../../assests/images/dashborad/arrow-right.png";
function index() {
  return (
    <div>
      <Pagination>
        <Pagination.Prev className="prev-li">
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
        <Pagination.Next className="next-li">
          Next
          <img src={Arrowright} className="ps-2" />
        </Pagination.Next>
      </Pagination>
    </div>
  );
}

export default index;
