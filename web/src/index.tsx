import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

declare global {
    interface Window {
        MyNameSpace: any;
    }
}

window.MyNameSpace = window.MyNameSpace || {};

ReactDOM.render(<App />, document.getElementById("root"));
