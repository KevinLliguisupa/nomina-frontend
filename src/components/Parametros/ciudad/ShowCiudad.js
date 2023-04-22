import React, { useEffect, useState } from "react";
import { Dropdown } from 'primereact/dropdown';
import CiudadService from "../../../services/ciudadService";

const ShowCiudad = () => {

    const [ciudadseleccionada, setCiudadseleccionada] = useState("");
    const [ciudades, setCiudades] = useState([]);

    useEffect(() => {
        getCiudades();
    }, []);

    const getCiudades = async () => {
        const response = await CiudadService.getCiudades()
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
        </div>
    )
}

export default ShowCiudad