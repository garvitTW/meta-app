export const ErrorMessage = ({ touched, errors, name }) => {
  return (
    <>
      {touched?.[name] && errors?.[name] && (
        <p
          style={{
            fontWeight: 400,
            color: "red",
            fontSize: "14px",
          }}
        >
          {errors?.[name]}
        </p>
      )}
    </>
  );
};
