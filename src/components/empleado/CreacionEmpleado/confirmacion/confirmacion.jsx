import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

const Confirmacion = ({ datos, onAnterior, onSubmit }) => {
    const handleAnterior = () => {
        onAnterior();
    };

    const handleSubmit = () => {
        onSubmit(datos);
    };

    return (
        <div className="p-d-flex p-flex-column p-jc-center card">
            <h1>Confirmacion</h1>

            <p>{datos.infoEmpleado.emp_cedula}</p>


            {/* <p>{datos.datos.inf_experiencia}</p> */}
            <Button label="Anterior" icon="pi pi-angle-left" onClick={onAnterior} />

            <Button label="Enviar" icon="pi pi-angle-right" onClick={handleSubmit} />

        </div>
    );
};

export default Confirmacion;
