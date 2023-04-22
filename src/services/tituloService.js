import axios from "axios";

// const url = "http://localhost:4000/nominaweb/api/v1/titulo";
const url = "https://nomina.fly.dev/nominaweb/api/v1/titulo";

const TituloService = {
  getTitulos() {
    return axios.get(url);
  },
  postTitulo(data){
    return axios.post(url, data);
  }
};

export default TituloService;