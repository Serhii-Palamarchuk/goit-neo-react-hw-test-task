import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // <-- важливо
import { Provider } from "react-redux";
import App from "./App";
import { store } from "./app/store";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        {" "}
        {/* <-- обгорнули App */}
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
