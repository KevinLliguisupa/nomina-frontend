import axios from "axios";

const url = "http://localhost:4000/nominaweb/api/v1/empleado";

const EmpleadoService = {
  getEmpleadosByPagination(consulta) {
    return axios.get(url + consulta);
  },
  getEmpleadoByCedula(cedula) {
    return axios.get(url + "/cedula/" + cedula);
  }
};

export default EmpleadoService;