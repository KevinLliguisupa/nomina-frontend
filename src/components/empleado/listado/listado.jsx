import React, { useEffect, useState } from "react";

import { DataTable } from 'primereact/datatable';
import { Column } from "primereact/column";
import { classNames } from 'primereact/utils';
import { TriStateCheckbox } from 'primereact/tristatecheckbox';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { ProgressBar } from 'primereact/progressbar';
import { BrowserRouter, Route, Link } from 'react-router-dom';

import "./listado.css"

import axios from "axios";

const ListadoEmpleados = () => {

    const url = "http://localhost:4000/nominaweb/api/v1/empleado";

    const [empleados, setEmpleados] = useState([]);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [totalRecords, setTotalRecords] = useState(0);
    const [loading, setLoading] = useState(false);

    const [filters2, setFilters2] = useState({
        'global': { value: null },
        'name': { value: null },
        'country.name': { value: null },
        'representative': { value: null },
        'status': { value: null },
        'verified': { value: null }
    });
    const statuses = [
        {
            label: 'Activo',
            value: true
        },
        {
            label: 'Inactivo',
            value: false
        }
    ];

    function click(cedula) {
        console.log(cedula);
      }

    const niveles = [
        {
            niv_id: 1,
            niv_descripcion: "Primaria"
        },
        {
            niv_id: 2,
            niv_descripcion: "SECUNDARIA"
        },
        {
            niv_id: 3,
            niv_descripcion: "BACHILLERATO"
        },
        {
            niv_id: 4,
            niv_descripcion: "SUPERIOR"
        }

    ]

    let loadLazyTimeout = null;


    const [lazyParams, setLazyParams] = useState({
        first: 0,
        rows: 10,
        page: 0,
        sortField: null,
        sortOrder: null,
        filters: {
            'cedula': { value: '', matchMode: 'contains' },
            'nombre': { value: '', matchMode: 'contains' },
            'estado': { value: null, matchMode: 'contains' },
            'direccion': { value: '', matchMode: 'contains' },
            'celular': { value: '', matchMode: 'contains' },
            'nivel': { value: null, matchMode: 'contains' },
        }
    });



    useEffect(() => {
        getEmpleados();
    }, [lazyParams]);


    const getEmpleados = async () => {
        var consulta = "/pagination?page=" + lazyParams.page + "&size=" + lazyParams.rows;

        if (lazyParams.filters.cedula.value !== '' && lazyParams.filters.cedula.value !== null) {
            consulta += "&cedula=" + lazyParams.filters.cedula.value
        }
        if (lazyParams.filters.nombre.value !== '' && lazyParams.filters.nombre.value !== null) {
            consulta += "&nombre=" + lazyParams.filters.nombre.value
        }
        if (lazyParams.filters.estado.value !== '' && lazyParams.filters.estado.value !== null) {
            consulta += "&estado=" + lazyParams.filters.estado.value
        }
        if (lazyParams.filters.direccion.value !== '' && lazyParams.filters.direccion.value !== null) {
            consulta += "&direccion=" + lazyParams.filters.direccion.value
        }
        if (lazyParams.filters.nivel.value !== '' && lazyParams.filters.nivel.value !== null) {
            consulta += "&nivel=" + lazyParams.filters.nivel.value
        }
        if (lazyParams.filters.celular.value !== '' && lazyParams.filters.celular.value !== null) {
            consulta += "&celular=" + lazyParams.filters.celular.value
        }

        setLoading(true);
        const response = await axios.get(url + consulta);
        const empleadosInfo = response.data.content;
        empleadosInfo.map((empleado) => {
            if (empleado.emp_estado) {
                empleado.emp_estado_nombre = "Activo";
            } else {
                empleado.emp_estado_nombre = "Inactivo";
            }
            empleado.emp_nombre_completo = empleado.emp_apellidos + " " + empleado.emp_nombres;
            return 0;
        });
        //console.log(response.data.pagination)
        //console.log(response.data.content)
        setTotalRecords(response.data.pagination.totalElements);

        setEmpleados(empleadosInfo)
        setLoading(false);
    }

    const verifiedBodyTemplate = (rowData) => {
        // className={`customer-badge status-${option}`}

        return <i className={classNames(`pi customer-badge status-${rowData.emp_estado_nombre}`, { 'true-icon pi-check-circle': rowData.emp_estado, 'false-icon pi-times-circle': !rowData.emp_estado })
        }></i>;
    };


    const actionBodyTemplate = (rowData) => {
        // console.log(rowData)
        var ruta = "/empleados/actualizacion/" + rowData.emp_cedula
        // Action body template logic
        return (
            <React.Fragment>
                {/* onClick={() => editContract(rowData)}  */}

                <Link to={ruta}>
                    <Button icon="pi pi-pencil" className="botones p-button-rounded p-button-success p-mr-2" 
                    />
                </Link>

                {/* onClick={() => confirmDeleteContract(rowData)}  */}
                <Button icon="pi pi-trash" className="botones p-button-rounded p-button-warning"
                />
            </React.Fragment>
        );
    };

    const renderHeader2 = () => {
        return (
            <div className="flex justify-content-end">
                {/* onClick={clearFilter1} */}
                <Button type="button" icon="pi pi-filter-slash" label="Clear" className="p-button-outlined" />
            </div>
        )
    }

    const verifiedRowFilterTemplate = (options) => {
        return <TriStateCheckbox value={options.value} onChange={(e) => options.filterApplyCallback(e.value)} />;
    };


    const nivelRowFilterTemplate = (options) => {
        return <Dropdown value={options.value} optionValue="niv_id" options={niveles} onChange={(e) => options.filterApplyCallback(e.value)}
            optionLabel="niv_descripcion"
            placeholder="Nivel" />
    }

    const header1 = renderHeader2();

    const onPage = (event) => {
        console.log(event)
        setLazyParams(event);
    }

    const onFilter = (event) => {
        event['first'] = 0;
        event.page = 0
        console.log(event)
        setLazyParams(event);

    }

    return (
        <div className="datatable-filter-demo">

            <div class="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 class="h3 mb-0 text-gray-800">Listado de empleados</h1>
            </div>

            <div className="card">

                <DataTable value={empleados} lazy first={lazyParams.first} totalRecords={totalRecords} onPage={onPage}
                    paginator rows={lazyParams.rows} dataKey="emp_cedula" className="p-datatable-customers" loading={loading}
                    filterDisplay="row" showGridlines responsiveLayout="scroll" emptyMessage="No se encontro información."
                    rowsPerPageOptions={[5, 10, 20, 50]} filters={lazyParams.filters} onFilter={onFilter}
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" >



                    <Column field="emp_cedula" header="Cédula" filter filterPlaceholder="1234...." filterField="cedula" showFilterMenu={false}
                    // style={{ minWidth: '8rem' }} 

                    />

                    <Column field="emp_nombre_completo" header="Nombre" filter filterPlaceholder="Jorge..." showFilterMenu={false}
                        filterField="nombre" filterMenuClassName="filters"
                    // style={{ minWidth: '12rem' }} 

                    />
                    <Column field="emp_celular" header="Celular" filter filterPlaceholder="0985..." showFilterMenu={false} filterField="celular"
                    // style={{ minWidth: '8rem' }} 

                    />
                    <Column field="emp_direccion" header="Dirección" filter filterPlaceholder="Lugar..." showFilterMenu={false}
                        filterField="direccion"
                    // style={{ minWidth: '12rem' }} 

                    />

                    <Column field="emp_nivel.niv_descripcion" header="Nivel" filter filterElement={nivelRowFilterTemplate} showFilterMenu={false}
                        filterField="nivel"
                    // style={{ minWidth: '8rem' }} 

                    />

                    {/* <Column field="emp_estado_nombre" header="Estado" filter filterElement={statusRowFilterTemplate} showFilterMenu={false}
                     filterField="estado" body={stausBodyTemplate}
                     style={{ minWidth: '8rem' }} 
                     /> */}

                    <Column field="emp_estado" header="Estado" dataType="boolean" style={{ minWidth: '6rem' }} filterField="estado"
                        body={verifiedBodyTemplate} filter filterElement={verifiedRowFilterTemplate} />

                    <Column header="Opciones" filter filterElement={header1} showFilterMenu={false} body={actionBodyTemplate} style={{ minWidth: '8rem' }} />
                </DataTable>
            </div>
        </div>
    );
}
export default ListadoEmpleados;