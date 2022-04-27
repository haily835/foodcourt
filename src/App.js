// This is a React Router v6 app

import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

import Button from "@material-ui/core";
import CookUI from "./components/Cook/CookUI";
import CustomerUI from "./components/CustomerUI.component";
import ItUI from "./components/IT/ItUI";
import ManagerUI from "./components/ManagerUI.component";
import React from "react";
import RegisterForm from "./components/RegisterForm.component";
import SignInForm from "./components/SignInForm.component";
import VendorUI from "./components/Vendor/VendorUI";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SignInForm />} />
      <Route path="/foodcourt" element={<SignInForm />} />
      <Route path="/user/add" element={<RegisterForm />} />
      <Route path="/user/manager/:id" element={<ManagerUI />} />
      <Route path="/user/customer/:id" element={<CustomerUI />} />
      <Route path="/user/cook/:id" element={<CookUI />} />
      <Route path="/user/it/:id" element={<ItUI />} />
      <Route path="/user/vendor/:id" element={<VendorUI />} />
    </Routes>
  );
}

export default App;
