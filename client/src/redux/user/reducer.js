import {UserActionTypes} from "./types"; 

// const [state, dispatch] = useReducer(reducer, initialState, init)
const INITIAL_STATE = {
  currentUser:null,
  coupleName:null,
  age:0,
}

const userReducer = (state=INITIAL_STATE, action) => {
  switch (action.type){
    case UserActionTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser:action.payload===undefined||action.payload===""? false: action.payload
      };
    default:
      return state;
  }
}

export default userReducer;