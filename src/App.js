import React from "react";
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import ShowProducts from './components/Pruebas/productos/ShowProducts'

import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";
   

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path = '/pruebas' element = {<ShowProducts></ShowProducts>}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App;
