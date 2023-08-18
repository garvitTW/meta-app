import { createContext, useReducer } from "react";
import { Type } from "../constants/storeAction.constants";

export const Store = createContext();

const initialState = {
  userInfo: null,
  addOrganisationStep1: null,
  editOrganisationDetails: null,
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

    default:
      return state;
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
