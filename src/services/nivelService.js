import axios from "axios";

const url = "http://localhost:4000/nominaweb/api/v1/nivel";

const NivelService = {
  getNiveles() {
    return axios.get(url);
  }
};

export default NivelService;