import { Dropdown } from "react-bootstrap";
import Dropdownarrow from "../../assests/images/dashborad/dropdown.png";
import { memo } from "react";

function StatusDropDown({ filterHandle, status }) {
  const getStatusLabel = () => {
    if (status === true) {
      return "Enabled";
    } else if (status === false) {
      return "Disabled";
    } else {
      return "All";
    }
  };
  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        <span>Status:</span> {getStatusLabel()}
        <img src={Dropdownarrow} alt="down arrow" />
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={() => filterHandle("Status", "")}>
          All
        </Dropdown.Item>
        <Dropdown.Item onClick={() => filterHandle("Status", true)}>
          Enable
        </Dropdown.Item>
        <Dropdown.Item onClick={() => filterHandle("Status", false)}>
          Disable
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
export default memo(StatusDropDown);
