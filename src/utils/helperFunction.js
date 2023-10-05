const generateProfileDetailsInitialValue = (value) => {
  return {
    name: value?.name || "",
    email: value?.email || "",
    phone_number: value?.phone_number || "",
    organization_fax: value?.organization_fax || "",
    organization_rep_first_name: value?.organization_rep_first_name || "",
    organization_rep_last_name: value?.organization_rep_last_name || "",
    organization_rep_phone: value?.organization_rep_phone || "",
    organization_rep_email: value?.organization_rep_email || "",
    street: value?.street || "",
    suite_unit: value?.suite_unit || "",
    city: value?.city || "",
    state: value?.state || "",
  };
};

const generateClinicProfileDetailsInitialValue = (value) => {
  return {
    name: value?.name || "",
    email: value?.email || "",
    phone_number: value?.phone_number || "",
    clinic_extension: value?.clinic_extension || "",
    clinic_fax: value?.clinic_fax || "",
    clinic_rep_name: value?.clinic_rep_name || "",
    clinic_rep_phone: value?.clinic_rep_phone || "",
    clinic_rep_email: value?.clinic_rep_email || "",
    street: value?.street || "",
    suite_unit: value?.suite_unit || "",
    city: value?.city || "",
    state: value?.state || "",
  };
};

const generateDoctorProfileDetailsInitialValue = (value) => {
  return {
    name: value?.name || "",
    email: value?.email || "",
    phone_number: value?.phone_number || "",
    doctor_fax: value?.doctor_fax || "",
    street: value?.street || "",
    suite_unit: value?.suite_unit || "",
    city: value?.city || "",
    state: value?.state || "",
    clinics: value?.clinics || [],
  };
};

const downloadCSV = (fileName, data) => {
  const blob = new Blob([data], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.style.display = "none";
  a.href = url;
  a.download = `${fileName}.csv`;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
};

const handleDataSelectionForExport = (type, dataToExport, data, selectedId) => {
  if (type === "All") {
    if (dataToExport.length === data.length) {
      return [];
    } else {
      const allDataId = data.map((d) => d.id);
      return allDataId;
    }
  } else {
    if (dataToExport.includes(selectedId)) {
      return dataToExport.filter((id) => id !== selectedId);
    } else {
      return [...dataToExport, selectedId];
    }
  }
};

export {
  generateProfileDetailsInitialValue,
  generateClinicProfileDetailsInitialValue,
  generateDoctorProfileDetailsInitialValue,
  downloadCSV,
  handleDataSelectionForExport,
};
