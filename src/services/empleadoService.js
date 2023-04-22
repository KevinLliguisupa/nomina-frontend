import axios from "axios";

// const url = "http://localhost:4000/nominaweb/api/v1/empleado";
const url = "https://nomina.fly.dev/nominaweb/api/v1/empleado";

const EmpleadoService = {
  getEmpleadosByPagination(consulta) {
    return axios.get(url + consulta);
  },
  getEmpleadoByCedula(cedula) {
    return axios.get(url + "/cedula/" + cedula);
  },
  postEmpleado(data){
    return axios({
      method: "post",
      url: url,
      data: data
    })
  },
  putEmpleado(emp_cedula, empleado){
    return axios({
      method: "put",
      url: url + "/" + emp_cedula,
      data: empleado
  })
  },
  putCambiarEstado(data){
    return axios({
      method: "put",
      url: url + "/estado/" + data.emp_cedula + "/?estado=" + !data.emp_estado
  })
  }
};

export default EmpleadoService;