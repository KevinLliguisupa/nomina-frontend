import axios from "axios";

// const url = "http://localhost:4000/nominaweb/api/v1/informacion";
const url = "https://nomina.fly.dev/nominaweb/api/v1/informacion";

const InfoAdicionalService = {
  getInformacionByCedula(numCedula) {
    return axios.get(url + "/cedula/" + numCedula);
  },
  postInformacionAdi(data) {
    return axios({
      method: "post",
      url: url,
      data: data
    })
  },
  putInformacionAdi(emp_cedula, informacion){
    return axios({
      method: "put",
      url: url + "/cedula/" + emp_cedula,
      data: informacion
  })
  }
};

export default InfoAdicionalService;