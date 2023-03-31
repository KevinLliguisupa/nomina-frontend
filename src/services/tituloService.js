import axios from "axios";

const url = "http://localhost:4000/nominaweb/api/v1/titulo";

const TituloService = {
  getTitulos() {
    return axios.get(url);
  }
};

export default TituloService;