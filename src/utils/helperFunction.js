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


export {  generateProfileDetailsInitialValue };
