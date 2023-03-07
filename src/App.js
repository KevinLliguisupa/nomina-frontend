import React from "react";
import Navbar from "./Navbar";
import { Routes, Route} from 'react-router-dom';
import ShowProducts from './components/Pruebas/productos/ShowProducts'
import ContratRegister from './components/contratos/registro/registro.jsx';

import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";


function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<ShowProducts />} />
          <Route path="/contract" element={<ContratRegister />} />
        </Routes>
      </div>
    </>
  )
}

export default App;
