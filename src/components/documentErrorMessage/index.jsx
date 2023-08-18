function DocumentErrorMessage({ name, index, touched, errors }) {
  return (
    <>
      {touched.documents?.[index]?.[name] &&
        errors.documents?.[index]?.[name] && (
          <p
            style={{
              fontWeight: 400,
              color: "red",
              fontSize: "12px",
              marginBottom: "0px",
              
            }}
          >
            {errors.documents[index]?.[name]}
          </p>
        )}
    </>
  );
}
export default DocumentErrorMessage;
