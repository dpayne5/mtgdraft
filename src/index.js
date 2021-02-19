import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import GameSection from "./view/gameSection";
import { Amplify } from "aws-amplify";
import config from "./config";

import store from "./store.js";
import { Provider } from "react-redux";

<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
/>;

Amplify.configure({
  API: {
    endpoints: [
      {
        name: "mtgAPI",
        endpoint: config.apiGateway.URL,
        region: config.apiGateway.REGION,
      },
    ],
  },
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <GameSection />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
