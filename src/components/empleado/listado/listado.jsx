import { TriStateCheckbox } from 'primereact/tristatecheckbox';
import Confirmacion from '../CreacionEmpleado/confirmacion/confirmacion';
import React, { useEffect, useState } from "react";
import { DataTable } from 'primereact/datatable';
import { Dropdown } from 'primereact/dropdown';
import { classNames } from 'primereact/utils';
import { Dialog } from 'primereact/dialog';
import { Column } from "primereact/column";
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';

import EmpleadoService from '../../../services/empleadoService';
import NivelService from '../../../services/nivelService';
import InfoAdicionalService from '../../../services/infoAdicionalService';

import "./listado.css";

const ListadoEmpleados = () => {
    const [empleados, setEmpleados] = useState([]);
    const [totalRecords, setTotalRecords] = useState(0);
    const [loading, setLoading] = useState(false);
    const [displayBasic, setDisplayBasic] = useState(false);
    const [niveles, setNiveles] = useState();
    const [datos, setDatos] = useState({
        infoEmpleado: {
            ciu_nacimiento_id: "",
            emp_apellidos: "",
            emp_cedula: "",
            emp_celular: "",
            emp_credencial120: false,
            emp_cursos: "",
            emp_direccion: "",
            emp_discapacidad: false,
            emp_email: "",
            emp_estado: true,
            emp_lugar_nacimiento: "",
            emp_nombres: "",
            emp_reentrenado: false,
            emp_sexo: null,
            est_id: "",
            niv_id: "",
            tit_id: ""
        },
        infoAdicional: {
            emp_cedula: "",
            inf_acta_finiquito: false,
            inf_afi: false,
            inf_canet_covid: false,
            inf_cargas_familiares: 0,
            inf_certantecedentes: "",
            inf_certificados_laborales: false,
            inf_certmedico_msp: null,
            inf_certpsicologico: "",
            inf_copia_cedula: false,
            inf_copia_papeleta: false,
            inf_experiencia: "",
            inf_foto: false,
            inf_historial_laboral: "",
            inf_hoja_datos: false,
            inf_hoja_vida: false,
            inf_iees_salida: "",
            inf_iess_entrada: false,
            inf_libreta_militar: false,
            inf_mrl: false,
            inf_poliza: "",
            inf_referencias_laborales: 0,
            inf_sicosep: false
        }
    });

    const dialogFuncMap = {
        'displayBasic': setDisplayBasic
    }

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
        getNiveles();
    }, [lazyParams]);

    const getNiveles = async () => {
        const response = await NivelService.getNiveles();
        setNiveles(response.data);
    }

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
        const response = await EmpleadoService.getEmpleadosByPagination(consulta)

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
        setTotalRecords(response.data.pagination.totalElements);
        setEmpleados(empleadosInfo)
        setLoading(false);
    }

    function cambiarRuta(ruta) {
        window.location.href = ruta;
    }

    const verifiedBodyTemplate = (rowData) => {
        return <div className='centrar'>
            <i className={classNames(`pi customer-badge status-${rowData.emp_estado_nombre}`,
                { 'true-icon pi-check-circle': rowData.emp_estado, 'false-icon pi-times-circle': !rowData.emp_estado })} style={{ fontSize: "1.3rem" }}/>
        </div>
    };

    const verEmpleado = async (infoEmpleado) => {
        const opciones = { year: 'numeric', month: 'numeric', day: 'numeric' };
        infoEmpleado.ciudad = infoEmpleado.emp_ciudadNacimiento
        infoEmpleado.estadoCivil = infoEmpleado.emp_estadoCivil
        infoEmpleado.nivel = infoEmpleado.emp_nivel
        infoEmpleado.titulo = infoEmpleado.emp_titulo
        setDisplayBasic(true);
        const dataAdicional = await InfoAdicionalService.getInformacionByCedula(infoEmpleado.emp_cedula)

        dataAdicional.data.inf_certantecedentes = dataAdicional.data.inf_certantecedentes? 
        (new Date(dataAdicional.data.inf_certantecedentes)).toLocaleDateString('es-ES', opciones):''
        dataAdicional.data.inf_certmedico_msp = dataAdicional.data.inf_certmedico_msp? 
        (new Date(dataAdicional.data.inf_certmedico_msp)).toLocaleDateString('es-ES', opciones) : ''
        dataAdicional.data.inf_certpsicologico = dataAdicional.data.inf_certpsicologico? 
        (new Date(dataAdicional.data.inf_certpsicologico)).toLocaleDateString('es-ES', opciones) : ''
        dataAdicional.data.inf_historial_laboral = dataAdicional.data.inf_historial_laboral?
        (new Date(dataAdicional.data.inf_historial_laboral)).toLocaleDateString('es-ES', opciones) : ''
        dataAdicional.data.inf_iees_salida = dataAdicional.data.inf_iees_salida?
        (new Date(dataAdicional.data.inf_iees_salida)).toLocaleDateString('es-ES', opciones) : ''
        dataAdicional.data.inf_poliza = dataAdicional.data.inf_poliza?
        (new Date(dataAdicional.data.inf_poliza)).toLocaleDateString('es-ES', opciones) : ''

        const datosFormulario = { infoEmpleado: infoEmpleado, infoAdicional: dataAdicional.data }
        setDatos({ ...datos, ...datosFormulario });
    }

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-eye" className="botones p-button-rounded p-button-primary p-mr-2"
                    onClick={() => verEmpleado(rowData)} />
                <Button icon="pi pi-pencil" className="botones p-button-rounded p-button-success p-mr-2"
                    onClick={() => cambiarRuta('empleados/actualizacion/' + rowData.emp_cedula)} />
                <Button icon="pi pi-trash" className="botones p-button-rounded p-button-warning" />
            </React.Fragment>
        );
    };

    const renderHeader = () => {
        return (
            <div className="flex justify-content-end">
                <Button type="button" icon="pi pi-filter-slash" label="Clear" className="p-button-outlined"
                    onClick={() => clearFilters()} />
            </div>
        )
    }

    const verifiedRowFilterTemplate = (options) => {
        return <TriStateCheckbox value={options.value} onChange={(e) => options.filterApplyCallback(e.value)} />

    };

    const nivelRowFilterTemplate = (options) => {
        
        return <Dropdown value={options.value} optionValue="niv_id" options={niveles} 
            onChange={ (e) => options.filterApplyCallback(e.value)} optionLabel="niv_descripcion" placeholder="Nivel" />
    }

    const onPage = (event) => {
        setLazyParams(event);
    }

    const onFilter = (event) => {
        event['first'] = 0;
        event.page = 0
        setLazyParams(event);

    }

    const renderFooter = (name) => {
        return (
            <div>
                <Button label="Cerrar" icon="pi pi-times" onClick={() => onHide(name)} className="p-button-text" />
            </div>
        );
    }

    const onHide = (name) => {
        dialogFuncMap[`${name}`](false);
    }

    const leftToolbarTemplate = (
        <React.Fragment>
            <Button label="Nuevo empleado" icon="pi pi-plus" className="p-button-success p-mr-2"
                onClick={() => cambiarRuta('empleados/creacion')} />
        </React.Fragment>
    )

    const clearFilters = () => {
        setLazyParams({
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
    }

    return (
        <div className="datatable-filter-demo">
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Listado de empleados</h1>
            </div>
            <Toolbar className="p-mb-4" left={leftToolbarTemplate} ></Toolbar>
            <div className="card">
                <DataTable value={empleados} lazy first={lazyParams.first} totalRecords={totalRecords} onPage={onPage}
                    paginator rows={lazyParams.rows} dataKey="emp_cedula" className="p-datatable-customers" loading={loading}
                    filterDisplay="row" showGridlines responsiveLayout="scroll" emptyMessage="No se encontro información."
                    rowsPerPageOptions={[5, 10, 20, 50]} filters={lazyParams.filters} onFilter={onFilter}
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" >
                    <Column field="emp_cedula" header="Cédula" filter filterPlaceholder="1234...."
                        filterField="cedula" showFilterMenu={false} style={{ maxWidth: '15rem' }} />
                    <Column field="emp_nombre_completo" header="Nombre" filter filterPlaceholder="Jorge..."
                        showFilterMenu={false} filterField="nombre" filterMenuClassName="filters" style={{ minWidth: '10rem' }} />
                    <Column field="emp_celular" header="Celular" filter filterPlaceholder="0985..."
                        showFilterMenu={false} filterField="celular" style={{ maxWidth: '15rem' }} />
                    <Column field="emp_direccion" header="Dirección" filter filterPlaceholder="Lugar..."
                        showFilterMenu={false} filterField="direccion" style={{ minWidth: '8rem' }} />
                    <Column field="emp_nivel.niv_descripcion" header="Nivel" filter
                        filterElement={nivelRowFilterTemplate} showFilterMenu={false} filterField="nivel" style={{ maxWidth: '13rem' }} />
                    <Column field="emp_estado" header="Estado" dataType="boolean" style={{ minWidth: '6rem', maxWidth: '13rem' }} 
                        filterField="estado" body={verifiedBodyTemplate} filter filterElement={verifiedRowFilterTemplate} />
                    <Column header="Opciones" filter filterElement={renderHeader} showFilterMenu={false}
                        body={actionBodyTemplate} style={{ minWidth: '8rem' }} />
                </DataTable>
            </div>
            <Dialog header="Información del empleado" visible={displayBasic} style={{ width: '75rem' }} maximizable
                footer={renderFooter('displayBasic')} onHide={() => onHide('displayBasic')}>
                <Confirmacion datos={datos} />
            </Dialog>
        </div>
    );
}
export default ListadoEmpleados;