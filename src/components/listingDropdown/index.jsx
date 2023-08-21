import { Dropdown } from "react-bootstrap";
import Dropdownarrow from "../../assests/images/dashborad/dropdown.png";
import { memo } from "react";
function ListingDropDown({
  getFilterLabel,
  filterHandle,
  values,
  id,
  filterName,
  className = "",
}) {
  return (
    <Dropdown className={className}>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        <span>{filterName}:</span> {getFilterLabel()}
        <img src={Dropdownarrow} alt="down arrow" />
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={() => filterHandle(filterName, "")}>
          All
        </Dropdown.Item>
        {values?.map((value) => (
          <Dropdown.Item
            onClick={() => filterHandle(filterName, value?.[id])}
            key={value?.[id]}
          >
            {value?.name}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}
export default memo(ListingDropDown);
