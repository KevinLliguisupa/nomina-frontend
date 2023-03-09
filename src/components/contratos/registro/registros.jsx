import React, { useEffect, useState } from "react";
import axios from "axios";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';

import './registro.css'

const ContratRegister = () => {

    const url = 'http://localhost:4000/nominaweb/api/v1/contrato/contratos';
    const [contracts, setContracts] = useState({});

    


    useEffect(() => {
        getContracts();
    }, []);

    const getContracts = async () => {
        const response = await axios.get(url);

        console.log('c', response.data)
        setContracts(response.data);
    }

    //actions 
    const openNew =()=>{

    }
    //components

    const header = (
        <div className="flex flex-wrap align-items-center justify-content-between gap-2">
            <span className="text-xl text-900 font-bold">Contratos</span>
        </div>
    );

    const leftToolbarTemplate = (
        <React.Fragment>
            <Button label="New" icon="pi pi-plus" className="p-button-success p-mr-2"  />
            <Button label="Delete" icon="pi pi-trash" className="p-button-danger"  />
        </React.Fragment>
    )

    return (
        <div className="card">
            <Toolbar className="p-mb-4" left={leftToolbarTemplate} ></Toolbar>
            <DataTable value={contracts} header={header} tableStyle={{ minWidth: '60rem' }}>
                <Column field="con_id" header="Code"></Column>
                <Column field="cont_emp.emp_cedula" header=" Cedula Empleado"></Column>
                <Column field="cont_emp.emp_nombres" header=" Nombres Empleado"></Column>
                <Column field="cont_emp.emp_apellidos" header=" Apellidos Empleado"></Column>
                <Column field="con_liquidacion_estado" header="Category"></Column>
                <Column field="con_liquidacion_fecha" header="Quantity"></Column>
            </DataTable>
        </div>
    );
};

export default ContratRegister;