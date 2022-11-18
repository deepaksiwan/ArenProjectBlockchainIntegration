import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import "./App.css";

import Marketplace from "./components/pages/home/Marketplace";
import Item from "./components/pages/item/Item";
import Nftdetails from "./components/pages/item/Nftdetails";
import Mynft from "./components/pages/home/mynft"
import Listitems from "./components/pages/item/Nftdetails"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" name="Home Page" element={<Marketplace />} />
          <Route exact path="/Mynft"  element={<Mynft />} />
          <Route exact path="/item" name="Item Page" element={<Item />} />
          {/* <Route exact path="/item2" name="Item Page 2" element={<Item2/>} /> */}
          <Route exact path="/Nftdetails/:id" name="Nft details page" element={<Nftdetails/>} />
          <Route exact path="/Listitems/:id" name="Item2 Page 2" element={<Listitems/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;