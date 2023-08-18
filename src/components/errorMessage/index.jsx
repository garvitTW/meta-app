export const ErrorMessage = ({ touched, errors, name }) => {
  return (
    <>
      {touched?.[name] && errors?.[name] && (
        <p
          style={{
            fontWeight: 400,
            color: "red",
            fontSize: "12px",
            marginBottom: "0px",
          }}
        >
          {errors?.[name]}
        </p>
      )}
    </>
  );
};
