import {createStore, applyMiddleware} from "redux";
import rootReducer from "./root-reducer";
import logger from "redux-logger"

const middlewares = [logger]; // there will be more items like [logger, thunk, sage];

const store = createStore(rootReducer,applyMiddleware(...middlewares));

export default store