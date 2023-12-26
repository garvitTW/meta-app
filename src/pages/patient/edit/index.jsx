import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Store } from "../../../store/Store";
import { doctorService } from "../../../services/doctor.service";
import { useFormik } from "formik";
import validationSchemaPatient from "../../../validation/patientDetails";
import URL from "../../../constants/routesURL";
import PatientDetailsForm from "../../../components/patient/detailsForm";
import { patientService } from "../../../services/patient.service";
import { roles } from "../../../constants/common.constants";
import {
  formatPhoneNumber,
  profileDetailsHandleChange,
} from "../../../utils/helperFunction";

function EditPatient() {
  const navigate = useNavigate();
  const [doctorList, setDoctorList] = useState([]);
  const { state } = useContext(Store);
  const { editPatient, userInfo } = state;
  const nameArray = editPatient?.name?.split(/\s+/).filter(Boolean);
  const firstName = nameArray?.length >= 0 ? nameArray[0] : "";
  const restName = nameArray?.length > 0 ? nameArray.slice(1).join(" ") : "";
  const initialValues = {
    name: firstName,
    surname: restName,
    email: editPatient?.email || "",
    phone_number: formatPhoneNumber(editPatient?.phone_number || ""),
    street: editPatient?.street || "",
    suite_unit: editPatient?.suite_unit || "",
    zip: editPatient?.zip || "",
    city: editPatient?.city || "",
    state: editPatient?.state || "",
    doctors: editPatient?.doctors || [],
  };

  useEffect(() => {
    if (!editPatient?.email) {
      navigate(URL.PATIENT.LISTING);
    } else {
      const fetchData = async () => {
        try {
          const isClinic = userInfo.user_type === roles.clinic;
          const { data } = await doctorService.getDoctorNameId({
            clinic_id: isClinic ? userInfo.id : "",
            organization_id: isClinic ? "" : editPatient?.organization_id[0],
          });

          setDoctorList(data);
        } catch (err) {
          console.log(err);
        }
      };
      fetchData();
    }
  }, [
    editPatient?.clinic_id,
    editPatient?.email,
    editPatient?.organization_id,
    navigate,
    userInfo.id,
    userInfo.user_type,
  ]);

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
        await patientService.updatePatient(editPatient?.id, {
          ...editPatient,
          ...values,
          name: values.name + " " + values.surname,
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

  const handleCustomChange = (e) => {
    const value = profileDetailsHandleChange(e);
    setFieldValue(e.target.name, value);
  };

  return (
    <div className="AddPatient   AddOrganisationProfile Add_Organisation_Professional">
      <PatientDetailsForm
        handleSubmit={handleSubmit}
        mrnNumber={editPatient?.mrn}
        formikProps={formikProps}
        handleDoctorSelection={handleDoctorSelection}
        doctorList={doctorList}
        values={values}
        removeDoctor={removeDoctor}
        errors={errors}
        touched={touched}
        handleCancel={handleCancel}
        isSubmitting={isSubmitting}
        btnLabel="Edit Patient"
        handleCustomChange={handleCustomChange}
      />
    </div>
  );
}
export default EditPatient;
