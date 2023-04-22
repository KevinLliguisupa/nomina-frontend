import axios from "axios";


// const url = "http://localhost:4000/nominaweb/api/v1/cargo";
const url = "https://nomina.fly.dev/nominaweb/api/v1/cargo";

const CargoService = {
  getCargos() {
    return axios.get(url);
  },
  postCargo(data) {
    return axios.post(url, data);
  }

};

export default CargoService;