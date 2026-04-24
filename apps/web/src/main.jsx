import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";

import App from "@/App";
import "normalize.css";
import "@/assets/css/reset.less";
import "antd/dist/reset.css";
import "@/assets/css/tailwind.css";
import "@/assets/css/fullstack.scss";
import store from "./store";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <HashRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <App />
    </HashRouter>
  </Provider>
);
