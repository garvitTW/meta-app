import { Form } from "react-bootstrap";
import CrossIcon from "../../assests/images/dashborad/cross.svg";

function FormSelectWithChip({
  handleItemSelection,
  name,
  ItemList,
  idKey,
  selectedItems,
  removeItem,
}) {
  console.log(ItemList, "ItemList>>>>>>>>>>");

  return (
    <>
      {" "}
      <Form.Label htmlFor="" className="mt-3">
        {name}
        <span className="mendatory-feild">*</span>
      </Form.Label>
      <Form.Select
        value=""
        className="Languages_select"
        onChange={(event) => handleItemSelection(event)}
      >
        <option value="">Select {name}</option>
        {ItemList?.map((item) => (
          <option key={item?.[idKey]} value={item?.[idKey]}>
            {item?.name}
          </option>
        ))}
      </Form.Select>
      <div className="select_tags">
        <ul>
          {selectedItems?.map((selectedItemId) => {
            const name = ItemList.find(
              (item) => item?.[idKey] === selectedItemId
            )?.name;

            return name ? (
              <li key={selectedItemId}>
                {name}

                <img
                  className="ms-1"
                  src={CrossIcon}
                  alt="Remove"
                  onClick={() => removeItem(selectedItemId)}
                />
              </li>
            ) : null;
          })}
        </ul>
      </div>
    </>
  );
}
export default FormSelectWithChip;
