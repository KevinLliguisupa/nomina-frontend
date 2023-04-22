import React, { useEffect, useState } from "react";

import './ShowTitulo.css'
import { DataTable } from 'primereact/datatable';
import { Column } from "primereact/column";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from "primereact/inputtext";
import TituloService from "../../../services/tituloService";

const ShowTitulo = () => {

    const [titulo, setTitulo] = useState([]);


    useEffect(() => {
        getTitulos();
    }, []);

    const getTitulos = async () => {
        const response = await TituloService.getTitulos();
        const titulos = response.data;
        setTitulo(titulos);

    }

    //Datos adquiridos
    const [titulonuevo, setTitulonuevo] = useState({
        tit_nombre: "",
        niv_id: "",
    });

    //Post Cargos
    const PostTitulo = async () => {
        const formData = {
            tit_nombre: titulonuevo.tit_nombre
        };
        await TituloService.postTitulo(formData).then(response => {
            getTitulos();
        }).catch(error => {
            console.log(error.message);
        });
        handleClosecrear();
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

                <h5>Lista de Titulos</h5>

                <Button icon="pi pi-plus" className="p-button-rounded p-button-success" onClick={handleShowcrear} />

                <Dialog header="Nuevo Titulo" visible={dialogcrear} style={{ width: '30vw' }} onHide={handleClosecrear} >
                    <label htmlFor="tit_nombre">Titulo</label><br></br>
                    <InputText required id="tit_nombre" aria-describedby="tit_nombre-help"
                        value={titulonuevo.tit_nombre} onChange={(e) => setTitulonuevo({
                            tit_nombre: e.target.value,
                            niv_id: titulonuevo.niv_id,
                        })} /><br></br>
                    <small id="tit_nombre-help">
                        Ingresa un nuevo Titulo
                    </small><br></br><br></br>

                    <Button label="Cancelar" icon="pi pi-times" onClick={handleClosecrear}
                        className="p-button-rounded p-button-danger p-button-text" />
                    <Button label="Crear" icon="pi pi-check" className="p-button-rounded p-button-text"
                        onClick={PostTitulo} />
                </Dialog>


                <DataTable value={titulo} responsiveLayout="scroll" >
                    <Column field="tit_id" header="ID"></Column>
                    <Column field="tit_nombre" header="TITULO"></Column>
                </DataTable>

            </div>
        </div>
    )
}

export default ShowTitulo