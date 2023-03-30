import React, { useEffect, useState } from "react";
import axios from "axios";

import './ShowTitulo.css'
import { DataTable } from 'primereact/datatable';
import { Column } from "primereact/column";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from "primereact/inputtext";
import { ListBox } from 'primereact/listbox';



const ShowTitulo = () => {

    const url = 'http://localhost:4000/nominaweb/api/v1/titulo';
    const [titulo, setTitulo] = useState([]);
    const [nivel, setNivel] = useState([]);


    useEffect(() => {
        getTitulo();
        getNivel();
    }, []);

    const getTitulo = async () => {
        const response = await axios.get(url);
        const titulos = response.data;
        setTitulo(titulos);
        console.log(titulos);
    }

    const getNivel = async () => {
        const response = await axios.get('http://localhost:4000/nominaweb/api/v1/nivel');
        const Niveles = response.data;
        setNivel(Niveles);
        console.log(Niveles);
    }

    //Datos adquiridos
    const [titulonuevo, setTitulonuevo] = useState({
        tit_nombre: "",
        niv_id: "",
    });

    //Post Cargos
    const PostTitulo = async () => {
        const formData = {
            tit_nombre: titulonuevo.tit_nombre,
            niv_id: titulonuevo.niv_id,
        };
        await axios.post("http://localhost:4000/nominaweb/api/v1/titulo", formData).then(response => {
            getTitulo();
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

                <h5>Lista de Titulos</h5>

                <Button icon="pi pi-plus" className="p-button-rounded p-button-success" onClick={handleShowcrear} />



                <Dialog header="Nuevo Titulo" visible={dialogcrear} style={{ width: '60vw' }} onHide={handleClosecrear} >
                    <form onSubmit={() => { handleClosecrear(); PostTitulo() }}>
                        <label htmlFor="tit_nombre">Titulo</label><br></br>
                        <InputText pattern="[a-zA-Z]+" required="true" id="tit_nombre" aria-describedby="tit_nombre-help" value={titulonuevo.tit_nombre} onChange={(e) => setTitulonuevo({
                            tit_nombre: e.target.value,
                            niv_id: titulonuevo.niv_id,
                        })} /><br></br>
                        <small id="tit_nombre-help">
                            Ingresa un nuevo Titulo
                        </small><br></br><br></br>

                        <label htmlFor="tit_nombre">Niveles</label><br></br>
                        <ListBox required="true" options={nivel} optionLabel="niv_descripcion" className="w-full md:w-14rem" 
                        value={titulonuevo.niv_id} onChange={(e) => setTitulonuevo({
                            tit_nombre: titulonuevo.tit_nombre,
                            niv_id: e.target.value.niv_id,
                        })} />

                        <Button label="Cancelar" icon="pi pi-times" className="p-button-rounded p-button-danger p-button-text" onClick={handleClosecrear} />
                        <Button label="Crear" icon="pi pi-check" className="p-button-rounded p-button-text" />
                    </form>
                </Dialog>


                <DataTable value={titulo} responsiveLayout="scroll" >
                    <Column field="tit_id" header="ID"></Column>
                    <Column field="tit_nombre" header="TITULO"></Column>
                    <Column field="nivel.niv_descripcion" header="NIVEL"></Column>
                </DataTable>

            </div>
        </div>
    )
}

export default ShowTitulo