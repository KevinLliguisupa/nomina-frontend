import axios from "axios";

const url = "http://localhost:4000/nominaweb/api/v1/informacion";

const InfoAdicionalService = {
  getInformacionByCedula(numCedula) {
    return axios.get(url + "/cedula/" + numCedula);
  }
};

export default InfoAdicionalService;