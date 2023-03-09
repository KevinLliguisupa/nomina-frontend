import React, { useEffect, useState } from "react";

import { DataTable } from 'primereact/datatable';
import { Column } from "primereact/column";
import { classNames } from 'primereact/utils';
import { TriStateCheckbox } from 'primereact/tristatecheckbox';
import axios from "axios";

const ListadoEmpleados = () => {

    const url = "http://localhost:4000/nominaweb/api/v1/empleado";

    const [empleados, setEmpleados] = useState([]);

    useEffect(() => {
        getEmpleados();
    }, []);

    const getEmpleados = async () => {
        const response = await axios.get(url);
        const empleadosInfo = response.data;
        empleadosInfo.map((empleado) => {
            empleado.emp_nombre_completo= empleado.emp_apellidos + " " + empleado.emp_nombres;
            return 0;
        });
        setEmpleados(empleadosInfo)
    }

    const verifiedBodyTemplate = (rowData) => {
        return <i className={classNames('pi', { 'true-icon pi-check-circle': rowData.emp_estado, 'false-icon pi-times-circle': !rowData.emp_estado })}></i>;
    };

    const verifiedRowFilterTemplate = (options) => {
        return <TriStateCheckbox value={options.value} onChange={(e) => options.filterApplyCallback(e.value)} />;
    };

    return (
        <div>
            {/* filters={filters} loading={loading} header={header}*/}
            <DataTable value={empleados} paginator rows={10} dataKey="id" filterDisplay="row"
                globalFilterFields={['name', 'country.name', 'representative.name', 'status']} emptyMessage="No se encontro información.">
                <Column field="emp_cedula" header="Cédula" filter filterPlaceholder="1234...." style={{ minWidth: '12rem' }} />
                <Column field="emp_nombre_completo" header="Nombre" filter filterPlaceholder="Jorge..." style={{ minWidth: '12rem' }} />
                <Column field="emp_celular" header="Celular" filter filterPlaceholder="0985..." style={{ minWidth: '12rem' }} />
                <Column field="emp_email" header="Email" filter filterPlaceholder="some@any.com" style={{ minWidth: '12rem' }} />
                <Column field="emp_direccion" header="Dirección" filter filterPlaceholder="Lugar..." style={{ minWidth: '12rem' }} />
                <Column field="emp_nivel.niv_descripcion" header="Nivel" filter filterPlaceholder="Busqueda por cedula" style={{ minWidth: '12rem' }} />

                <Column field="emp_estado" header="Activo" dataType="boolean" style={{ minWidth: '6rem' }} 
                body={verifiedBodyTemplate} filter filterElement={verifiedRowFilterTemplate} />
            </DataTable>
        </div>
    );
}
export default ListadoEmpleados;