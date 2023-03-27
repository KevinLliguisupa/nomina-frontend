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
import ListadoEmpleados from "./components/empleado/listado/listado";
import Creacion from "./components/empleado/CreacionEmpleado/CreacionEmpleado";
import ActualizacionEmpleado from "./components/empleado/Actualizacion/Actualizacion";


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
            {/* <div id="content">
              <div className="container"> */}
            <div class="content-body">
              <div class="row page-titles mx-4">
                <div class="container-fluid">
                  <Routes>
                    <Route path="/" element={<ShowProducts />} />
                    <Route path="/contract" element={<ContratRegister />} />
                    <Route path='/empleados' element={<ListadoEmpleados></ListadoEmpleados>}></Route>
                    {/* <Route path='/empleados/nuevo' element={<CreacionEmpleado />}></Route> */}
                    <Route path='/empleados/creacion' element={<Creacion />}></Route>
                    <Route path='/empleados/actualizacion/:cedula' component={ActualizacionEmpleado} element={<ActualizacionEmpleado />}></Route>
                    {/* <Route path='/informacion/nuevo' element={<CreacionInformacion />}></Route> */}
                  </Routes>
                </div>
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
  )
}

export default App;
