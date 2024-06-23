import Header from "./components/Header";
// import Home from "./components/Home";
import Singup from "./components/Singup";
import React from "react";
import Footer from "./components/Footer";
import Privtecomponent from "./components/privtecomponents.js";
import Login from "./components/Login.js";
import AddProduct from "./components/Addproduct.js";
import ProductList from "./components/Productlist.js";
import UpdateProduct from "./components/Updatecomponent.js";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route element={<Privtecomponent />}>
          <Route path="/" element={<ProductList />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/update/:id" element={<UpdateProduct />} />
          <Route path="/profile" element={<h1>Addproduct</h1>} />
          <Route path="/logout" element={<h1>Addproduct</h1>} />
        </Route>
        <Route path="/singup" element={<Singup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
