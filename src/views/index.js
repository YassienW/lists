import ReactDOM from "react-dom";
import React from "react";
import {hot} from "react-hot-loader";
import App from "./App";
import "rsuite/dist/styles/rsuite-default.css"
import "../../res/styles.less";

const HotApp = hot(module)(App);
ReactDOM.render(<HotApp/>, document.getElementById("app"));