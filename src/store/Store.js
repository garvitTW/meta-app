import { createContext, useMemo, useReducer } from "react";
import { Type } from "../constants/storeAction.constants";
import { authService } from "../services/auth.service";

export const Store = createContext();

const initialState = {
  userInfo: authService.getUserDetails(),
  addOrganisationStep1: null,
  editOrganisationDetails: null,
  editOrganisationStep1: null,
  addClinicStep1: null,
  editClinicDetails: null,
  editClinicStep1: null,
  addDoctorStep1: {},
  editDoctorDetails: null,
  editDoctorStep1: null,
};

function reducer(state, action) {
  switch (action.type) {
    case Type.USER_LOGIN:
      return { ...state, userInfo: action.payload };

    case Type.ADD_ORGANISATION_STEP_1:
      return { ...state, addOrganisationStep1: action.payload };

    case Type.REMOVE_ORGANISATION_STEP_1:
      return { ...state, addOrganisationStep1: null };

    case Type.EDIT_ORGANISATION_DETAILS:
      return { ...state, editOrganisationDetails: action.payload };

    case Type.ADD_EDIT_ORGANISATION_STEP_1:
      return { ...state, editOrganisationStep1: action.payload };

    case Type.REMOVE_EDIT_ORGANISATION_DETAILS:
      return {
        ...state,
        editOrganisationDetails: null,
        editOrganisationStep1: null,
      };

    case Type.ADD_CLINIC_STEP_1:
      return { ...state, addClinicStep1: action.payload };

    case Type.REMOVE_CLINIC_STEP_1:
      return { ...state, addClinicStep1: null };

    case Type.EDIT_CLINIC_DETAILS:
      return { ...state, editClinicDetails: action.payload };

    case Type.ADD_EDIT_CLINIC_STEP_1:
      return { ...state, editClinicStep1: action.payload };

    case Type.REMOVE_EDIT_CLINIC_DETAILS:
      return {
        ...state,
        editClinicDetails: null,
        editClinicStep1: null,
      };

    case Type.ADD_DOCTOR_STEP_1:
      return { ...state, addDoctorStep1: action.payload };

    case Type.REMOVE_DOCTOR_STEP_1:
      return { ...state, addDoctorStep1: null };

    case Type.EDIT_DOCTOR_DETAILS:
      return { ...state, editDoctorDetails: action.payload };

    case Type.ADD_EDIT_DOCTOR_STEP_1:
      return { ...state, editDoctorStep1: action.payload };

    case Type.REMOVE_EDIT_DOCTOR_DETAILS:
      return {
        ...state,
        editDoctorDetails: null,
        editDoctorStep1: null,
      };

    default:
      return state;
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = useMemo(() => {
    return { state, dispatch };
  }, [state, dispatch]);
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
