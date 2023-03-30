import { TriStateCheckbox } from 'primereact/tristatecheckbox';
import React, { useEffect, useState } from "react";
import { DataTable } from 'primereact/datatable';
import { Dropdown } from 'primereact/dropdown';
import { classNames } from 'primereact/utils';
import { Dialog } from 'primereact/dialog';
import { Column } from "primereact/column";
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import axios from "axios";
import "./listado.css";


const ListadoEmpleados = () => {

    const url = "http://localhost:4000/nominaweb/api/v1/empleado";

    const [empleados, setEmpleados] = useState([]);
    const [totalRecords, setTotalRecords] = useState(0);
    const [loading, setLoading] = useState(false);
    const [displayBasic, setDisplayBasic] = useState(false);
    const [infoAdicional, setinfoAdicional] = useState({
        emp_cedula: "",
        inf_acta_finiquito: false,
        inf_afi: false,
        inf_canet_covid: false,
        inf_cargas_familiares: 0,
        inf_certantecedentes: "",
        inf_certificados_laborales: false,
        inf_certmedico_msp: "",
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
    })
    const [empleado, setEmpleado] = useState({
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
        emp_estadoCivil: { est_id: 1, est_descipcion: "" },
        emp_nivel: { niv_id: 0, niv_descripcion: "" },
        emp_ciudadNacimiento: { ciu_id: "", ciu_nombre: "", }
    });

    const dialogFuncMap = {
        'displayBasic': setDisplayBasic
    }
    const niveles = [
        { niv_id: 1, niv_descripcion: "PRIMARIA" },
        { niv_id: 2, niv_descripcion: "SECUNDARIA" },
        { niv_id: 3, niv_descripcion: "BACHILLERATO" },
        { niv_id: 4, niv_descripcion: "SUPERIOR" }
    ]

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
        setTotalRecords(response.data.pagination.totalElements);
        setEmpleados(empleadosInfo)
        setLoading(false);
    }

    function cambiarRuta(ruta) {
        window.location.href = ruta;
    }

    const verifiedBodyTemplate = (rowData) => {
        return <i className={classNames(`pi customer-badge status-${rowData.emp_estado_nombre}`,
            { 'true-icon pi-check-circle': rowData.emp_estado, 'false-icon pi-times-circle': !rowData.emp_estado })} />;
    };

    const verEmpleado = async (empleadoSelect) => {
        setEmpleado(empleadoSelect);
        setDisplayBasic(true);
        const dataAdicional = await axios.get("http://localhost:4000/nominaweb/api/v1/informacion/cedula/" + empleadoSelect.emp_cedula)
        setinfoAdicional(dataAdicional.data)
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

    const renderHeader2 = () => {
        return (
            <div className="flex justify-content-end">
                <Button type="button" icon="pi pi-filter-slash" label="Clear" className="p-button-outlined"
                    onClick={() => clearFilters()} />
            </div>
        )
    }

    const verifiedRowFilterTemplate = (options) => {
        return <TriStateCheckbox value={options.value} onChange={(e) => options.filterApplyCallback(e.value)} />;
    };

    const nivelRowFilterTemplate = (options) => {
        return <Dropdown value={options.value} optionValue="niv_id" options={niveles}
            onChange={(e) => options.filterApplyCallback(e.value)} optionLabel="niv_descripcion" placeholder="Nivel" />
    }

    const header1 = renderHeader2();

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
                <Button label="No" icon="pi pi-times" onClick={() => onHide(name)} className="p-button-text" />
            </div>
        );
    }

    const onHide = (name) => {
        dialogFuncMap[`${name}`](false);
    }

    const cambiarBoolean = (datoBoolean) => {
        return (datoBoolean ? "Si" : "No");
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
                        filterField="cedula" showFilterMenu={false} />
                    <Column field="emp_nombre_completo" header="Nombre" filter filterPlaceholder="Jorge..."
                        showFilterMenu={false} filterField="nombre" filterMenuClassName="filters" />
                    <Column field="emp_celular" header="Celular" filter filterPlaceholder="0985..."
                        showFilterMenu={false} filterField="celular" />
                    <Column field="emp_direccion" header="Dirección" filter filterPlaceholder="Lugar..."
                        showFilterMenu={false} filterField="direccion" />
                    <Column field="emp_nivel.niv_descripcion" header="Nivel" filter
                        filterElement={nivelRowFilterTemplate} showFilterMenu={false} filterField="nivel" />
                    <Column field="emp_estado" header="Estado" dataType="boolean" style={{ minWidth: '6rem' }}
                        filterField="estado" body={verifiedBodyTemplate} filter filterElement={verifiedRowFilterTemplate} />
                    <Column header="Opciones" filter filterElement={header1} showFilterMenu={false}
                        body={actionBodyTemplate} style={{ minWidth: '8rem' }} />
                </DataTable>
            </div>

            <Dialog header="Header" visible={displayBasic} style={{ width: '50vw' }} footer={renderFooter('displayBasic')} onHide={() => onHide('displayBasic')}>
                <p>{empleado.emp_cedula}</p>
                <p>{empleado.emp_apellidos}</p>
                <p>{empleado.emp_nombres}</p>
                <p>{empleado.emp_estado_nombre}</p>

                <p>{empleado.emp_celular}</p>
                <p>{empleado.emp_email}</p>
                <p>{empleado.emp_direccion}</p>
                <p>{empleado.emp_sexo}</p>

                <p>{empleado.emp_ciudadNacimiento.ciu_nombre}</p>
                <p>{empleado.emp_lugar_nacimiento}</p>
                <p>{empleado.emp_estadoCivil.est_descipcion}</p>
                <p>{infoAdicional.inf_cargas_familiares}</p>


                <p>{empleado.emp_nivel.niv_descripcion}</p>
                <p>Titulo</p>
                <p>{infoAdicional.inf_experiencia}</p>
                <p>{infoAdicional.inf_referencias_laborales}</p>

                <p>{empleado.emp_cursos}</p>



                <h3>fechas</h3>

                <p>{infoAdicional.inf_certmedico_msp}</p>
                <p>{infoAdicional.inf_certpsicologico}</p>

                <p>{infoAdicional.inf_historial_laboral}</p>

                <p>{infoAdicional.inf_certantecedentes}</p>
                <p>{infoAdicional.inf_poliza}</p>
                <p>{infoAdicional.inf_iees_salida}</p>





                <h3>Informacion Adicional</h3>


                <p>{cambiarBoolean(empleado.emp_discapacidad)}</p>
                <p>{cambiarBoolean(empleado.emp_credencial120)}</p>
                <p>{cambiarBoolean(empleado.emp_reentrenado)}</p>


                <p>{cambiarBoolean(infoAdicional.inf_acta_finiquito)}</p>
                <p>{cambiarBoolean(infoAdicional.inf_afi)}</p>
                <p>{cambiarBoolean(infoAdicional.inf_canet_covid)}</p>

                <p>{cambiarBoolean(infoAdicional.inf_certificados_laborales)}</p>
                <p>{cambiarBoolean(infoAdicional.inf_copia_cedula)}</p>
                <p>{cambiarBoolean(infoAdicional.inf_copia_papeleta)}</p>

                <p>{cambiarBoolean(infoAdicional.inf_foto)}</p>
                <p>{cambiarBoolean(infoAdicional.inf_hoja_datos)}</p>
                <p>{cambiarBoolean(infoAdicional.inf_hoja_vida)}</p>

                <p>{cambiarBoolean(infoAdicional.inf_iess_entrada)}</p>
                <p>{cambiarBoolean(infoAdicional.inf_libreta_militar)}</p>
                <p>{cambiarBoolean(infoAdicional.inf_mrl)}</p>
                <p>{cambiarBoolean(infoAdicional.inf_sicosep)}</p>

            </Dialog>
        </div>
    );
}
export default ListadoEmpleados;