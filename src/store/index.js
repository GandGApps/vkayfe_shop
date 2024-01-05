import { combineReducers, legacy_createStore as createStore } from "redux";
import userReducer from "./customerReducer";
import filterReducer from "./filterReducer";


const store = createStore(
  combineReducers({
    customer: userReducer,
    filter: filterReducer,
  }));

export default store;
