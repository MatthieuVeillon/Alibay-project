import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./Components/jsx/App";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
