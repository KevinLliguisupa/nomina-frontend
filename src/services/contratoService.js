import axios from "axios";

// const url = "http://localhost:3000/nominaweb/api/v1/contrato";
const url = "https://nomina.fly.dev/nominaweb/api/v1/contrato/";

const ContratoService = {
    getContratosByPagination(consulta) {
        return axios.get(url + consulta);
    },
    postContrato(contrato) {
        return axios.post(url + "/contratos", contrato);
    },
    putContrato(id, contrato) {
        return axios.put(url + "/contratos/" + id, contrato);
    },
    putDelete(id) {
        return axios.put(url + "/contratos/" + id);
    },
};

export default ContratoService;