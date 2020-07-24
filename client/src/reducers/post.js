import { PostsActionTypes } from "../actions/types";

const INIT_STATE = {
  allPost: [],
  userPost: [],
};

const postReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case PostsActionTypes.SET_ALL_POSTS:
      return {
        ...state,
        allPost: action.payload
      };
    case PostsActionTypes.SET_USER_POSTS:
      return {
        ...state,
        userPost: action.payload
      };
    default:
      return state;
  }
}

export default postReducer;