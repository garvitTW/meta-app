import { Button, Form } from "react-bootstrap";
import { numArray } from "../../constants/common.constants";
import Asterisk from "../asterisk";
import DeleteIcon from "../../assests/images/dashborad/delete.png";
import DocumentErrorMessage from "../documentErrorMessage";
import SaveIcon from "../../assests/images/dashborad/save.svg";
import UploadIcon from "../../assests/images/dashborad/upload.png";

function DocumentField({
  values,
  getFieldProps,
  touched,
  errors,
  removeDocument,
  setFieldValue,
}) {
  const generateFileUrl = (file) => {
    const type = typeof file;
    return type === "string"
      ? process.env.REACT_APP_API_URL + file
      : URL.createObjectURL(file);
  };

  console.log(errors);

  return (
    <>
      {" "}
      {values.documents.map((document, index) => (
        <div className="d-flex Category_div" key={numArray[index]}>
          <div className="mb-2">
            {index === 0 && (
              <p>
                Category
                <Asterisk />
              </p>
            )}
            <Form.Select
              className=""
              defaultValue=""
              {...getFieldProps(`documents[${index}].category`)}
            >
              <option disabled value="">
                Select{" "}
              </option>
              {index === 0 && <option value="LICENSE">License </option>}
            </Form.Select>
            <DocumentErrorMessage
              touched={touched}
              errors={errors}
              index={index}
              name="category"
            />
          </div>
          <div className="mb-2">
            {index === 0 && (
              <p>
                {" "}
                License Number
                <Asterisk />
              </p>
            )}
            <Form.Control
              {...getFieldProps(`documents[${index}].license_number`)}
              type="text"
              placeholder="License Number (#)"
            />
            <DocumentErrorMessage
              touched={touched}
              errors={errors}
              index={index}
              name="license_number"
            />
          </div>
          <div className="mb-2">
            {index === 0 && (
              <p>
                State
                <Asterisk />
              </p>
            )}
            <Form.Control
              {...getFieldProps(`documents[${index}].state`)}
              type="text"
              placeholder="State"
            />
            <DocumentErrorMessage
              touched={touched}
              errors={errors}
              index={index}
              name="state"
            />
          </div>

          <div className="mb-2">
            {index === 0 && (
              <p>
                Expiration
                <Asterisk />
              </p>
            )}
            <Form.Control
              {...getFieldProps(`documents[${index}].validity`)}
              type="date"
              placeholder="Expiration"
              min={
                !document?.id
                  ? new Date().toISOString().split("T")[0]
                  : undefined
              }
            />
            <DocumentErrorMessage
              touched={touched}
              errors={errors}
              index={index}
              name="validity"
            />
          </div>
          <div className="Category_div">
            

            <input
              style={{ display: "none" }}
              type="file"
              id={`file-${index}`}
              accept="application/pdf"
              onChange={(event) => {
                const file = event.target.files[0];
                setFieldValue(`documents[${index}].file`, file);
              }}
            />
            <label
              htmlFor={`file-${index}`}
              className={index === 0 ? "toppad" : "botmbox2"}
            >
            {values.documents[index].file && (
              <a
                href={generateFileUrl(values.documents[index].file)}
                target="_blank"
                rel="noopener noreferrer"
               
              >
                <img src={SaveIcon} alt="View" />
              </a>
            )}
              <span>
                <img className="uploadIcon" src={UploadIcon} alt="Upload" />
              </span>
              {values.documents.length > 1 && (
                <Button onClick={() => removeDocument(index)}>
                  <img src={DeleteIcon} alt="delete" />
                </Button>
              )}
            </label>
            <DocumentErrorMessage
              touched={touched}
              errors={errors}
              index={index}
              name="file"
            />
          </div>
        </div>
      ))}
    </>
  );
}

export default DocumentField;
