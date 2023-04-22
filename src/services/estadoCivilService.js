import axios from "axios";

// const url = "http://localhost:4000/nominaweb/api/v1/estado-civil";
const url = "https://nomina.fly.dev/nominaweb/api/v1/estado-civil";

const EstadoCivilService = {
  getEstados() {
    return axios.get(url);
  }
};

export default EstadoCivilService;