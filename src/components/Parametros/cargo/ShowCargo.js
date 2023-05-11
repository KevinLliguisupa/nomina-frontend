import React, { useEffect, useState } from "react";
import axios from "axios";

import './ShowCargo.css'
import { DataTable } from 'primereact/datatable';
import { Column } from "primereact/column";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from "primereact/inputtext";

import CargoService from "../../../services/cargoService";

const ShowCargo = () => {

    // const url = 'http://localhost:4000/nominaweb/api/v1/cargo';
    const [cargo, setCargo] = useState([]);


    useEffect(() => {
        getCargo();
    }, []);

    const getCargo = async () => {
        const response = await CargoService.getCargos();
        const cargos = response.data;
        setCargo(cargos);
    }


    //Datos adquiridos
    const [cargonuevo, setCargonuevo] = useState('');

    //Post Cargos
    const PostCargo = async () => {
        const formData = {
            car_nombre: cargonuevo
        };
        await CargoService.postCargo(formData).then(response => {
            handleClosecrear();
            getCargo();
        }).catch(error => {
            console.log(error.message);
        });

    };

    //Modal Crear
    const [dialogcrear, setDialogcrear] = useState(false);

    //Cerrar Modal Crear
    const handleClosecrear = () => setDialogcrear(false);

    //Abrir Modal Crear
    const handleShowcrear = () => setDialogcrear(true);

    return (
        <div className="App">
            <div className="container-fluid">

                <h5>Lista de Cargos</h5>
                <Button icon="pi pi-plus" className="p-button-rounded p-button-success" onClick={handleShowcrear} />

                <Dialog header="Nuevo Cargo" visible={dialogcrear} style={{ width: '25vw' }} onHide={handleClosecrear}>
                    <label htmlFor="car_nombre">Cargo</label><br></br>
                    <InputText pattern="[a-zA-Z]+" required id="car_nombre" aria-describedby="car_nombre-help" value={cargonuevo} onChange={(e) => setCargonuevo(e.target.value)} /><br></br>
                    <small id="car_nombre-help">
                        Ingresa un nuevo Cargo
                    </small>
                    <div>

                        <Button label="Cancelar" icon="pi pi-times" className="p-button-rounded p-button-danger p-button-text" onClick={handleClosecrear} />
                        <Button label="Crear" icon="pi pi-check" className="p-button-rounded p-button-text" onClick={PostCargo} />
                    </div>
                </Dialog>

                <DataTable value={cargo} responsiveLayout="stack" >
                    <Column field="car_id" header="ID"></Column>
                    <Column field="car_nombre" header="CARGO"></Column>
                </DataTable>

            </div>
        </div>
    )
}

export default ShowCargo