import axios from "axios";

const url = "http://localhost:4000/nominaweb/api/v1/ciudad";

const CiudadService = {
  getCiudades() {
    return axios.get(url);
  }
};

export default CiudadService;