import { CommentsActionTypes } from "../actions/types";

const INIT_STATE = {
  currentComments: []
}

const commentsReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case CommentsActionTypes.SET_CURRENT_COMMENTS:
      return {
        ...state,
        currentComments: action.payload
      };
    default:
      return state;
  }
}

export default commentsReducer;