import { PostsActionTypes } from "../actions/types";

const INIT_STATE = {
  allPosts: [],
  userPosts: [],
  currentPost: null
}

const postReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case PostsActionTypes.SET_ALL_POST:
      return {
        ...state,
        allPosts: action.payload
      }
    case PostsActionTypes.SET_USER_POST:
      return {
        ...state,
        userPosts: action.payload
      }
    case PostsActionTypes.SET_CURRENT_POST:
      return {
        ...state,
        currentPost: action.payload
      }
    default:
      return state;
  }
}

export default postReducer;