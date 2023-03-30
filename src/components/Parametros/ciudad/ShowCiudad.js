import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';

const ShowCiudad = () => {

    const url = 'http://localhost:4000/nominaweb/api/v1/ciudad';
    const [ciudadseleccionada, setCiudadseleccionada] = useState("");
    const [ciudades, setCiudades] = useState([]);

    useEffect(() => {
        getCiudades();
    }, []);

    const getCiudades = async () => {
        const response = await axios.get(url);
        const ciudades = response.data;
        ciudades.map((key) => {
            key.ciu_nombre = key.ciu_nombre + " - " + key.ciu_provincia.pro_nombre;
            return 0;
        });
        setCiudades(ciudades);
    }


    return (
        <div>
            <Dropdown value={ciudadseleccionada} options={ciudades} onChange={(e) => setCiudadseleccionada(e.target.value)}
                optionLabel="ciu_nombre" filter placeholder="Seleccione Ciudad" />

            {/* <Button label="Submit" icon="pi pi-check" onClick={console.log(ciudadseleccionada.ciu_id)} /> */}
        </div>
    )
}

export default ShowCiudad