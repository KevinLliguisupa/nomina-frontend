import React, { useEffect, useState } from "react";
import axios from "axios";


import { ListBox } from "primereact/listbox";
import { Button } from "primereact/button";



const ShowCiudad = () => {

    const url = 'http://localhost:3000/nominaweb/api/v1/ciudad';
    const [ciudad, setCiudad] = useState([]);


    useEffect(() => {
        getCiudad();
    }, []);

    const getCiudad = async () => {
        const response = await axios.get(url);
        const ciudades = response.data;
        ciudades.map((key) => {
            key.ciu_nombre=key.ciu_nombre+" - "+key.ciu_provincia.pro_nombre;
            return 0;
        });
        setCiudad(ciudades);
        console.log(ciudades);
    }

    const [ciudadseleccionada, setCiudadseleccionada] = useState("");


    return (
        <div className="App">
            <div className="container-fluid">

                <h5>Lista de Ciudades</h5>
                <ListBox style={{ width: '15rem' }} listStyle={{ height: '230px' }} value={ciudadseleccionada} options={ciudad} optionLabel="ciu_nombre" filter onChange={(e) => setCiudadseleccionada(e.target.value.ciu_id)}/>

            </div>
        </div>
    )
}

export default ShowCiudad