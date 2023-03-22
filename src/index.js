import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";

import App from "@/App";
import "normalize.css";
import "@/assets/css/reset.less";
import "antd/dist/reset.css";
import store from "./store";
import theme from "@/assets/theme";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
      <ThemeProvider theme={theme}>
        <HashRouter basename='/'>
          <App />
        </HashRouter>
      </ThemeProvider>
  </Provider>
);
