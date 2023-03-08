<<<<<<< Updated upstream
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
=======
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Routes, Route } from 'react-router-dom';
import ShowProducts from './components/Pruebas/productos/ShowProducts'
import ContratRegister from './components/contratos/registro/registro.jsx';
import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";
import "./css/sb-admin-2.min.css";
import "./vendor/fontawesome-free/css/all.min.css";
import { Helmet } from "react-helmet";


function App() {
  return (
    <>
      <Helmet>
        <link href="vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css" />
        <link
          href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i"
          rel="stylesheet" />

        {/* <!-- Custom styles for this template--> */}
        <link href="css/sb-admin-2.min.css" rel="stylesheet" />
      </Helmet>
      <body id="page-top">
        <div id="wrapper">
          <Sidebar />
          {/* <!-- Content Wrapper --> */}
          <div id="content-wrapper" className="d-flex flex-column">

            {/* <!-- Main Content --> */}
            <Navbar />
            <div id="content">
              <div className="container">
                <Routes>
                  <Route path="/" element={<ShowProducts />} />
                  <Route path="/contract" element={<ContratRegister />} />
                </Routes>
              </div>
            </div>
            {/* <!-- End of Main Content --> */}

            {/* <!-- Footer --> */}
            <footer className="sticky-footer bg-white">
              <div className="container my-auto">
                <div className="copyright text-center my-auto">
                  <span>Copyright &copy; Your Website 2021</span>
                </div>
              </div>
            </footer>
            {/* <!-- End of Footer --> */}

          </div>
        </div>
        {/* <!-- Bootstrap core JavaScript--> */}
        <script src="vendor/jquery/jquery.min.js"></script>
        <script src="vendor/bootstrap/js/bootstrap.bundle.min.js"></script>

        {/* <!-- Core plugin JavaScript--> */}
        <script src="vendor/jquery-easing/jquery.easing.min.js"></script>

        {/* <!-- Custom scripts for all pages--> */}
        <script src="js/sb-admin-2.min.js"></script>

        {/* <!-- Page level plugins --> */}
        <script src="vendor/chart.js/Chart.min.js"></script>

        {/* <!-- Page level custom scripts --> */}
        <script src="js/demo/chart-area-demo.js"></script>
        <script src="js/demo/chart-pie-demo.js"></script>
      </body>
    </>
>>>>>>> Stashed changes
  )
}

export default App;
