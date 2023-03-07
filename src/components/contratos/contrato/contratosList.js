import axios from 'axios';

export default class contratosList{
    getContratos(){
        return axios.get('http://localhost:4000/nominaweb/api/v1/contrato/contratos').then(res=> res.data.data);
    }
}