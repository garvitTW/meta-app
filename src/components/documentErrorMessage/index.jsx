function DocumentErrorMessage({ name, index, touched, errors }) {
  return (
    <>
      {touched.documents?.[index][name] && errors.documents?.[index][name] && (
        <p
          style={{
            fontWeight: 400,
            color: "red",
            fontSize: "14px",
          }}
        >
          {errors.documents[index][name]}
        </p>
      )}
    </>
  );
}
export default DocumentErrorMessage;
