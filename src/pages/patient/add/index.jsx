import { useNavigate } from "react-router-dom";
import "./style.scss";
import { useContext, useEffect, useState } from "react";
import { doctorService } from "../../../services/doctor.service";
import { Store } from "../../../store/Store";
import { useFormik } from "formik";
import URL from "../../../constants/routesURL";
import validationSchemaPatient from "../../../validation/patientDetails";
import PatientDetailsForm from "../../../components/patient/detailsForm";

function AddPatient() {
  const navigate = useNavigate();
  const [doctorList, setDoctorList] = useState([]);
  const { state } = useContext(Store);
  const { userInfo } = state;
  const initialValues = {
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    street: "",
    suite_unit: "",
    city: "",
    state: "",
    doctors: [],
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await doctorService.getDoctorNameId({
          clinic_id: userInfo.id,
        });

        setDoctorList(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [userInfo.id]);

  const {
    errors,
    touched,
    handleSubmit,
    getFieldProps,
    isSubmitting,
    values,
    setFieldValue,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchemaPatient,
    onSubmit: async (values, action) => {
      try {
        console.log("Patient  details", values);
        // await OrganisationService.checkOrganisationMail({
        //   email: values.email,
        // });

        // navigate(URL.PATIENT.LISTING);
      } catch (err) {
        console.log(err);
      }
    },
  });
  const handleDoctorSelection = (event) => {
    const selectedDoctorId = Number(event.target.value);
    if (!values.doctors.includes(selectedDoctorId) && selectedDoctorId) {
      setFieldValue("doctors", [...values.doctors, selectedDoctorId]);
    }
  };

  const removeDoctor = (selectedDoctorId) => {
    const updatedDoctor = values.doctors?.filter(
      (DoctorId) => DoctorId !== selectedDoctorId
    );
    setFieldValue("doctors", updatedDoctor);
  };

  const handleCancel = () => {
    navigate(URL.PATIENT.LISTING);
  };

  const formikProps = {
    touched: touched,
    errors: errors,
    getFieldProps: getFieldProps,
  };

  return (
    <>
      <div className="AddPatient   AddOrganisationProfile Add_Organisation_Professional">
        <PatientDetailsForm
          handleSubmit={handleSubmit}
          formikProps={formikProps}
          handleDoctorSelection={handleDoctorSelection}
          doctorList={doctorList}
          values={values}
          removeDoctor={removeDoctor}
          errors={errors}
          touched={touched}
          handleCancel={handleCancel}
          isSubmitting={isSubmitting}
          btnLabel="Add Patient"
        />
      </div>
    </>
  );
}
export default AddPatient;
