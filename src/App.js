import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import "./App.css";

import Home from "./components/pages/home/Home";
import Item from "./components/pages/item/Item";
import Item2 from "./components/pages/item/item2";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" name="Home Page" element={<Home />} />
          <Route exact path="/item" name="Item Page" element={<Item />} />
          {/* <Route exact path="/item2" name="Item Page 2" element={<Item2/>} /> */}
          <Route exact path="/item2/:id" name="Item2 Page 2" element={<Item2/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;