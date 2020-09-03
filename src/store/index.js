import {createStore, applyMiddleware, combineReducers} from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from "../reducers/reducer";

const store = createStore(combineReducers({reducer}), composeWithDevTools(applyMiddleware(thunk)));

export default store;