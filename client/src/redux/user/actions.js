import {UserActionTypes} from "./types";
// types.js文件里面没有 export default 所以需要 destructure {}
export const setCurrentUser = (user) => ({
  type: UserActionTypes.SET_CURRENT_USER,
  payload: user
})