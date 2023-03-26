import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

const Paso3 = ({ datos, onAnterior, onSubmit }) => {
  const handleAnterior = () => {
    onAnterior();
  };

  const handleSubmit = () => {
    onSubmit(datos);
  };

  return (
    <div className="p-d-flex p-flex-column p-jc-center">
      <DataTable value={datos}>
        <Column field="nombre" header="Nombre" />
        <Column field="apellido" header="Apellido" />
        <Column field="email" header="Email" />
        <Column field="telefono" header="Teléfono" />
        <Column field="direccion" header="Dirección" />
        <Column field="ciudad" header="Ciudad" />
      </DataTable>
      <div className="p-d-flex p-jc-between">
        <Button label="Anterior" icon="pi pi-angle-left" onClick={handleAnterior} />
        <Button label="Enviar" icon="pi pi-check" onClick={handleSubmit} />
      </div>
    </div>
  );
};

export default Paso3;
