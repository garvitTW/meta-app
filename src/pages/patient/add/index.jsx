import { useNavigate } from "react-router-dom";
import "./style.scss";
import { useContext, useEffect, useState } from "react";
import { doctorService } from "../../../services/doctor.service";
import { Store } from "../../../store/Store";
import { useFormik } from "formik";
import URL from "../../../constants/routesURL";
import validationSchemaPatient from "../../../validation/patientDetails";
import PatientDetailsForm from "../../../components/patient/detailsForm";
import { patientService } from "../../../services/patient.service";
import { roles } from "../../../constants/common.constants";

function AddPatient() {
  const navigate = useNavigate();
  const [doctorList, setDoctorList] = useState([]);
  const { state } = useContext(Store);
  const { userInfo } = state;
  const initialValues = {
    name: "",
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
        await patientService.checkPatientMail({
          email: values.email,
        });
        await patientService.createPatient({
          ...values,
          user_type: roles.patient,
        });

        navigate(URL.PATIENT.LISTING);
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
  );
}
export default AddPatient;
