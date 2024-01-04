const popUpComponents = {
  doctor: () => import("../pages/doctor/listing"),
  patient: () => import("../pages/patient/listing"),
  clinic: () => import("../pages/clinic/listing"),
};
export default popUpComponents;
