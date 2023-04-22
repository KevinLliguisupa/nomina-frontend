import axios from "axios";

// const url = "http://localhost:4000/nominaweb/api/v1/puesto";
const url = "https://nomina.fly.dev/nominaweb/api/v1/puesto/";

const PuestoService = {
    getPuestos() {
        return axios.get(url + "pue");
    },
    postPuesto(puesto) {
        return axios.post(url, puesto);
    },


};

export default PuestoService;