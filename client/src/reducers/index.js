import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import userReducer from "./user";
import postReducer from "./post";
import commentReducer from "./comment";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"],
};

const rootReducer = combineReducers({
  user: userReducer,
  post: postReducer,
  comment: commentReducer,
});

export default persistReducer(persistConfig, rootReducer);