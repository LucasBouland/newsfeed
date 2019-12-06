import { combineReducers } from "redux";
import readFilter from "./readFilter";
import news from "./news";
export default combineReducers({ news, readFilter });
