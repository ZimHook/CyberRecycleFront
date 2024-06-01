import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { RecoilRoot } from "recoil";
import { EvmProvider } from "./provider/EvmProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <RecoilRoot>
    <EvmProvider>
      <App />
    </EvmProvider>
  </RecoilRoot>
);
