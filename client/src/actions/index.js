import { UserActionTypes, PostsActionTypes, CommentsActionTypes } from "./types";
import Axios from "axios";

// USER ACTIONS
export const SetCurrentUser = () => async (dispatch) => {
  console.log("Google sign in");
  const user = await Axios.get("/auth/current_user");
  dispatch({ type: UserActionTypes.SET_CURRENT_USER, payload: user.data });
};

export const UserLogOut = () => async (dispatch) => {
  console.log("User log out");
  await Axios.get("/auth/logout");
  dispatch({ type: UserActionTypes.SET_CURRENT_USER, payload: null });
};

// POSTS ACTIONS
export const GetAllPosts = () => async (dispatch) => {
  const doc = await Axios.get("/api/post/all/get");
  dispatch({ type: PostsActionTypes.SET_ALL_POST, payload: doc.data });
};

export const GetUserPosts = () => async (dispatch) => {
  const doc = await Axios.get("/api/post/user/get");
  dispatch({ type: PostsActionTypes.SET_USER_POST, payload: doc.data });
};

export const DeleteUserPost = (id, imageKey) => async (dispatch) => {
  await Axios.post("/api/post/delete/" + id, { imageKey });
};

export const SetCurrentPost = (id) => async (dispatch) => {
  const doc = await Axios.get("/api/post/getone/" + id);
  dispatch({ type: PostsActionTypes.SET_CURRENT_POST, payload: doc.data });
}

// COMMENTS ACTIONS
export const GetCurrentComments = (id) => async (dispatch) => {
  const doc = await Axios.get("/api/comment/get/" + id);
  dispatch({ type: CommentsActionTypes.SET_CURRENT_COMMENTS, payload: doc.data });
}

export const DeleteComment = (id) => async (dispatch) => {
  await Axios.delete("/api/comment/" + id);
}