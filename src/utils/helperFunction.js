const generateProfileDetailsInitialValue = (value) => {
  return {
    name: value?.name || "",
    email: value?.email || "",
    phone_number: formatPhoneNumber(value?.phone_number || ""),
    organization_fax: formatPhoneNumber(value?.organization_fax || ""),
    organization_rep_first_name: value?.organization_rep_first_name || "",
    organization_rep_last_name: value?.organization_rep_last_name || "",
    organization_rep_phone: formatPhoneNumber(
      value?.organization_rep_phone || ""
    ),
    organization_rep_email: value?.organization_rep_email || "",
    street: value?.street || "",
    suite_unit: value?.suite_unit || "",
    zip: value?.zip || "",
    city: value?.city || "",
    state: value?.state || "",
  };
};

const generateClinicProfileDetailsInitialValue = (value) => {
  return {
    name: value?.name || "",
    email: value?.email || "",
    phone_number: formatPhoneNumber(value?.phone_number || ""),
    clinic_extension: value?.clinic_extension || "",
    clinic_fax: formatPhoneNumber(value?.clinic_fax || ""),
    clinic_rep_name: value?.clinic_rep_name || "",
    clinic_rep_phone: formatPhoneNumber(value?.clinic_rep_phone || ""),
    clinic_rep_email: value?.clinic_rep_email || "",
    street: value?.street || "",
    suite_unit: value?.suite_unit || "",
    zip: value?.zip || "",
    city: value?.city || "",
    state: value?.state || "",
  };
};

const generateDoctorProfileDetailsInitialValue = (value) => {
  return {
    name: value?.name || "",
    email: value?.email || "",
    phone_number: formatPhoneNumber(value?.phone_number || ""),
    doctor_fax: formatPhoneNumber(value?.doctor_fax || ""),
    street: value?.street || "",
    suite_unit: value?.suite_unit || "",
    zip: value?.zip || "",
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

function formatPhoneNumber(phoneNumber) {
  // Remove non-digit characters
  const cleaned = phoneNumber.replace(/\D/g, "");

  // Apply the phone number format dynamically
  let formatted = "";
  for (let i = 0; i < cleaned.length; i++) {
    if (i === 0) {
      formatted += "(" + cleaned[i];
    } else if (i === 2) {
      formatted += cleaned[i] + ")";
    } else if (i === 5) {
      formatted += cleaned[i] + "-";
    } else {
      formatted += cleaned[i];
    }
  }

  return formatted;
}

function profileDetailsHandleChange(e) {
  const input = e.target.value;
  if (e.target.name === "zip") {
    //Limit to a maximum of 9 digits
    let limitedInput = input.replace(/\D/g, "").slice(0, 9);

    // Add hyphen after the sixth digit
    if (limitedInput.length > 5) {
      limitedInput = `${limitedInput.slice(0, 5)}-${limitedInput.slice(5, 9)}`;
    }
    return limitedInput;
  } else {
    // Limit to a maximum of 10 digits, excluding hyphens
    const limitedInput = input.replace(/[^\d]/g, "").slice(0, 10);
    return formatPhoneNumber(limitedInput);
  }
}

export {
  generateProfileDetailsInitialValue,
  generateClinicProfileDetailsInitialValue,
  generateDoctorProfileDetailsInitialValue,
  downloadCSV,
  handleDataSelectionForExport,
  formatPhoneNumber,
  profileDetailsHandleChange,
};
