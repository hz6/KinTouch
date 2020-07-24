import { UserActionTypes } from "../actions/types";

const INIT_STATE = {
  currentUser: null
}

const userReducer = (state = INIT_STATE, action) => {
  switch (action.types) {
    case UserActionTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload === undefined || action.payload === "" ? false : action.payload
      };
    default:
      return state;
  }
}

export default userReducer;