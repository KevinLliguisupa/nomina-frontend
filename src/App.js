import React from "react";
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import ShowCargo from "./components/cargo/ShowCargo";

import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";
import ShowTitulo from "./components/titulo/ShowTitulo";
import ShowCiudad from "./components/ciudad/ShowCiudad";

   

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path = '/cargos' element = {<ShowCargo></ShowCargo>}></Route>
      <Route path = '/titulos' element = {<ShowTitulo></ShowTitulo>}></Route>
      <Route path = '/ciudades' element = {<ShowCiudad></ShowCiudad>}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App;
