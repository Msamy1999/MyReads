import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SearchReasults from "./components/SearchReasults";

/*
I import the router above and here I'm putting <App /> 
* between <BrowserRouter> tags
*/

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/SearchReasults" element={<SearchReasults />} />
    </Routes>
    {/* <App /> */}
  </BrowserRouter>,
  document.getElementById("root")
);
