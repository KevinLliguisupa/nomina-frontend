import React, { useEffect, useState } from "react";
import axios from "axios";
import { Dropdown } from 'primereact/dropdown';

const ShowNivel = () => {

    const url = 'http://localhost:4000/nominaweb/api/v1/nivel';
    const [nivel, setNivel] = useState([]);
    const [nivelseleccionado, setNivelseleccionado] = useState();

    useEffect(() => {
        getNivel();
    }, []);

    const getNivel = async () => {
        const response = await axios.get(url);
        const niveles = response.data;
        // niveles.map((key) => {
        //     key.ciu_nombre = key.ciu_nombre + " - " + key.ciu_provincia.pro_nombre;
        //     return 0;
        // });
        setNivel(niveles);
    }


    return (
        <div>
            <Dropdown value={nivelseleccionado} options={nivel} onChange={(e) => setNivelseleccionado(e.target.value)}
                optionLabel="niv_descripcion" filter placeholder="Seleccione Nivel" />
        </div>
    )
}

export default ShowNivel