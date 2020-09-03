import React from 'react';
import ReactDOM from 'react-dom';
import "bootstrap/dist/css/bootstrap.css";
import {Provider, useSelector} from "react-redux";
import store from "./store/index";
import Routes from "./Routes";
import { Modal } from './components/List';
ReactDOM.render(
  <Provider store={store}>
    <div className={["container"]}>      
      <Routes />
    </div>
  </Provider>, document.getElementById("root")
)