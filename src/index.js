import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import NavbarTop from "./nbTop";
import "./nbTopCSS.css";
import GameSection from "./gameSection";

import store from "./store.js";
import { Provider } from "react-redux";

<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
/>;

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <NavbarTop /> */}
      <GameSection />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
