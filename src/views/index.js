import ReactDOM from "react-dom";
import React from "react";
import {hot} from "react-hot-loader";
import App from "./App";
import "@atlaskit/css-reset/dist/bundle.css";
import "../../res/styles.scss";

/*if (process.env.NODE_ENV !== "production"){
    require("../mock/Mirage").startMirage();
}*/

const HotApp = hot(module)(App);
ReactDOM.render(<HotApp/>, document.getElementById("app"));