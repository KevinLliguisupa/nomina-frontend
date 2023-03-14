import React, { useEffect, useState } from "react";
import axios from "axios";

import './ShowCargo.css'
import { DataTable } from 'primereact/datatable';
import { Column } from "primereact/column";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from "primereact/inputtext";



const ShowCargo = () => {

    const url = 'http://localhost:3000/nominaweb/api/v1/cargo';
    const [cargo, setCargo] = useState([]);


    useEffect(() => {
        getCargo();
    }, []);

    const getCargo = async () => {
        const response = await axios.get(url);
        const cargos = response.data;
        setCargo(cargos);
        console.log(cargos);
    }


    //Datos adquiridos
    const [cargonuevo, setCargonuevo] = useState('');

    //Post Cargos
    const PostCargo = async () => {
        const formData = {
            car_nombre: cargonuevo
        };
        await axios.post("http://localhost:3000/nominaweb/api/v1/cargo", formData).then(response => {
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

    //Guardar o Salir Modal Crear
    const footerContentCrear = (
        <div>
            <Button label="Cancelar" icon="pi pi-times" className="p-button-rounded p-button-danger p-button-text" onClick={handleClosecrear} />
            <Button label="Crear" icon="pi pi-check" className="p-button-rounded p-button-text" onClick={() => { handleClosecrear(); PostCargo() }} autoFocus />
        </div>
    );




    return (
        <div className="App">
            <div className="container-fluid">

                <h5>Lista de Cargos</h5>
                <Button icon="pi pi-plus" className="p-button-rounded p-button-success" onClick={handleShowcrear} />


                <Dialog header="Nuevo Cargo" visible={dialogcrear} style={{width: '25vw'}}onHide={handleClosecrear} footer={footerContentCrear}>
                    <label htmlFor="car_nombre">Cargo</label><br></br>
                    <InputText  id="car_nombre" aria-describedby="car_nombre-help" value={cargonuevo} onChange={(e) => setCargonuevo(e.target.value)} /><br></br>
                    <small id="car_nombre-help">
                        Ingresa un nuevo Cargo
                    </small>
                </Dialog>


                <DataTable value={cargo} responsiveLayout="scroll" >
                    <Column field="car_id" header="ID"></Column>
                    <Column field="car_nombre" header="CARGO"></Column>
                </DataTable>

            </div>
        </div>
    )
}

export default ShowCargo