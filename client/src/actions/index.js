import { UserActionTypes, PostsActionTypes } from "./types";
import axios from "axios";

// USER ACTION
export const SetCurrentUser = (user, dispatch) => {
  dispatch({ type: UserActionTypes, payload: user });
}

// POST ACTION
export const SetAllPosts = async (dispatch) => {
  const doc = await axios.get("/api/post/all/get");
  dispatch({ type: PostsActionTypes.SET_ALL_POSTS, payload: doc.data });
}

export const SetUserPosts = async (dispatch) => {
  const doc = await axios.get("/api/post/user/get");
  dispatch({ type: PostsActionTypes.SET_USER_POSTS, payload: doc.data });
}