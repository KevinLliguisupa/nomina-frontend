import React, { useEffect, useState } from "react";
import axios from "axios";

import { DataTable } from 'primereact/datatable';
import { Column } from "primereact/column";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from "primereact/inputtext";
import { Dropdown } from 'primereact/dropdown';
import { classNames } from 'primereact/utils';

import CiudadService from "../../../services/ciudadService";
import PuestoService from "../../../services/puestoService";
import CargoService from "../../../services/cargoService";



const Puesto = () => {

    const [ciu_nacimiento_id, setCiu_nacimiento_id] = useState('');
    const [cargo_id, setCargo_id] = useState('');
    const [ciudades, setCiudades] = useState([]);
    const [cargos, setCargos] = useState([]);
    const [submitted, setSubmitted] = useState(false);

    // const url = 'http://localhost:3000/nominaweb/api/v1/titulo';
    const [titulo, setTitulo] = useState([]);
    const [nivel, setNivel] = useState([]);

    //Datos adquiridos
    const [nombrePuesto, setNombrePuesto] = useState('');


    useEffect(() => {
        getCiudades();
        getPuestos();
        getCargos();
    }, []);

    const getPuestos = async () => {
        const response = await PuestoService.getPuestos();
        const titulos = response.data;
        setTitulo(titulos);
        console.log(titulos);
    }

    const getCiudades = async () => {
        const response = await CiudadService.getCiudades()
        const ciudadesData = response.data;
        ciudadesData.map((key) => {
            key.ciu_nombre = key.ciu_nombre + " - " + key.ciu_provincia.pro_nombre;
            return 0;
        });
        setCiudades(ciudadesData);
    }

    const getCargos = async () => {
        const response = await CargoService.getCargos()
        const cargosData = response.data;
        setCargos(cargosData);
    }

    //Post Cargos
    const PostTitulo = async () => {
        setSubmitted(true);
        if (nombrePuesto !== '' && cargo_id !== '' && ciu_nacimiento_id !== '') {
            await PuestoService.postPuesto({
                "pue_nombre": nombrePuesto,
                "car_id": cargo_id,
                "ciu_id": ciu_nacimiento_id
            }).then(() => {

                getPuestos();
            }).catch(error => {
                console.log(error.message);
            })
        }
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

                <h5>Lista de Puestos</h5>

                <Button icon="pi pi-plus" className="p-button-rounded p-button-success" onClick={handleShowcrear} />

                <Dialog header="Nuevo Puesto" visible={dialogcrear} style={{ width: '30rem' }} onHide={handleClosecrear} >
                    <label htmlFor="tit_nombre">Nombre del puesto</label><br></br>
                    <InputText pattern="[a-zA-Z]+" required id="tit_nombre" aria-describedby="tit_nombre-help"
                        value={nombrePuesto} onChange={(e) => setNombrePuesto(e.target.value)} /><br></br>
                    <div>
                        {submitted && !nombrePuesto && <small className="p-error">Campo obligatorio.</small>}
                    </div>
                    <br />

                    <div>
                        <label htmlFor="ciu_nacimiento_id">Ciudad</label>
                    </div>
                    <div>
                        <Dropdown value={ciu_nacimiento_id} options={ciudades} onChange={(e) => setCiu_nacimiento_id(e.target.value)}
                            optionLabel="ciu_nombre" filter placeholder="Ciudad puesto" required
                            optionValue="ciu_id"
                            className={classNames("input-text", { 'p-invalid': submitted && !ciu_nacimiento_id })} />
                        <div>
                            {submitted && !ciu_nacimiento_id && <small className="p-error">Campo obligatorio.</small>}
                        </div>
                    </div>
                    <br />
                    <div>
                        <label htmlFor="ciu_nacimiento_id">Cargo</label>
                    </div>
                    <div>
                        <Dropdown value={cargo_id} options={cargos} onChange={(e) => setCargo_id(e.target.value)}
                            optionLabel="car_nombre" filter placeholder="Cargo" required
                            optionValue="car_id"
                            className={classNames("input-text", { 'p-invalid': submitted && !cargo_id })} />
                        <div>
                            {submitted && !cargo_id && <small className="p-error">Campo obligatorio.</small>}
                        </div>
                    </div>
                    <br />

                    <Button label="Cancelar" icon="pi pi-times" className="p-button-rounded p-button-danger p-button-text" onClick={handleClosecrear} />
                    <Button label="Crear" icon="pi pi-check" className="p-button-rounded p-button-text"
                        onClick={PostTitulo} />

                </Dialog>


                <DataTable value={titulo} responsiveLayout="scroll" >
                    <Column field="pue_id" header="ID"></Column>
                    <Column field="pue_nombre" header="Puesto"></Column>
                    <Column field="puest_cargo.car_nombre" header="Cargo"></Column>
                    <Column field="puest_ciudad.ciu_nombre" header="Ciudad"></Column>
                </DataTable>

            </div>
        </div>
    )
}

export default Puesto