const dmeTableHeaderName = {
  HCPCS_AND_Modifiers: "HCPCS & Modifiers",
  Athena_Description: "Athena Description",
  SKU: "SKU",
  Primary_Diagnosis: "Primary Diagnosis",
  Year_of_Service: "Year of Service",
  Primary_Payor: "Primary Payor",
  Primary_Outstanding: "Primary Outstanding",
  Total_Charges: "Total Charges",
  Primary_Payments: "Primary Payments",
};

const dmeTableColumns = [
  {
    headerName: dmeTableHeaderName.HCPCS_AND_Modifiers,
    headerClass: "",
    DataKey: "hcpcs_code",
    DataClass: "support",
    DataPreFix: "",
  },
  {
    headerName: dmeTableHeaderName.Athena_Description,
    headerClass: "athena",
    DataKey: "dme_description",
    DataClass: "athena",
    DataPreFix: "",
  },
  {
    headerName: dmeTableHeaderName.SKU,
    headerClass: "",
    DataKey: "sku",
    DataClass: "",
    DataPreFix: "",
  },
  {
    headerName: dmeTableHeaderName.Primary_Diagnosis,
    headerClass: "",
    DataKey: "diagnosis_name",
    DataClass: "support curserPointer",
    DataPreFix: "",
  },
  {
    headerName: dmeTableHeaderName.Year_of_Service,
    headerClass: "",
    DataKey: "year_of_service",
    DataClass: "",
    DataPreFix: "",
  },
  {
    headerName: dmeTableHeaderName.Primary_Payor,
    headerClass: "",
    DataKey: "primary_payer",
    DataClass: "",
    DataPreFix: "",
  },
  {
    headerName: dmeTableHeaderName.Primary_Outstanding,
    headerClass: "",
    DataKey: "primary_outstanding",
    DataClass: "price",
    DataPreFix: "$",
  },
  {
    headerName: dmeTableHeaderName.Total_Charges,
    headerClass: "",
    DataKey: "total_charge",
    DataClass: "price",
    DataPreFix: "$",
  },
  {
    headerName: dmeTableHeaderName.Primary_Payments,
    headerClass: "",
    DataKey: "primary_payments",
    DataClass: "price",
    DataPreFix: "$",
  },
];

const defaultSelectedColumns = [
  dmeTableHeaderName.HCPCS_AND_Modifiers,
  dmeTableHeaderName.Athena_Description,
  dmeTableHeaderName.SKU,
  dmeTableHeaderName.Primary_Diagnosis,
  dmeTableHeaderName.Year_of_Service,
  dmeTableHeaderName.Primary_Payor,
  dmeTableHeaderName.Primary_Outstanding,
  dmeTableHeaderName.Total_Charges,
  dmeTableHeaderName.Primary_Payments,
];

export { dmeTableHeaderName, dmeTableColumns, defaultSelectedColumns };
