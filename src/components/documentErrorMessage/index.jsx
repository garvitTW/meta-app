function DocumentErrorMessage({ name, index, touched, errors }) {
  return (
    <>
      {touched.documents?.[index]?.[name] &&
        errors.documents?.[index]?.[name] && (
          <span
            style={{
              fontWeight: 400,
              color: "red",
              fontSize: "12px",
              marginBottom: "0px",
              position: "relative"
              
            }}
          >
            {errors.documents[index]?.[name]}
          </span>
        )}
    </>
  );
}
export default DocumentErrorMessage;
