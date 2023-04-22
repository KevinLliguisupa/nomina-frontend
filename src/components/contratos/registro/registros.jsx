import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { DataTable } from 'primereact/datatable';
import { Toast } from 'primereact/toast';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dialog } from 'primereact/dialog';
import { RadioButton } from 'primereact/radiobutton';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { classNames } from 'primereact/utils';
import { Tag } from 'primereact/tag';

import './registro.css'
import ContratoService from "../../../services/contratoService";

const ContratRegister = () => {

    const emptyContract = {
        con_fecha_entrada: new Date().toISOString(),
        con_fecha_salida: new Date().toISOString(),
        con_liquidacion_estado: false,
        con_liquidacion_fecha: new Date().toISOString(),
        con_liquidacion_observacion: "",
        con_estado: true,
        cont_emp: {
            emp_cedula: ""
        },
        cont_puest: {
            pue_id: ""
        },
        globalFilter: null
    }

    const [contracts, setContracts] = useState({});
    const [contractsFilter, setContractsFilter] = useState([]);
    const [contractDialog, setContractDialog] = useState(false);
    const [deleteContractDialog, setdeleteContractDialog] = useState(false);
    const [contract, setContract] = useState(emptyContract);
    const [submitted, setSubmitted] = useState(false);
    const [edit, setEdit] = useState(false);
    const toast = useRef(null);
    const [totalRecords, setTotalRecords] = useState(0);
    const [loading, setLoading] = useState(false);

    //employees
    const [employees, setEmployees] = useState({});

    //workstation
    const [workstation, setWorkstation] = useState({});



    const openNew = () => {
        setContract(emptyContract);
        setSubmitted(false);
        setEdit(false);
        setContractDialog(true);
    }

    const hideDialog = () => {
        setSubmitted(false);
        setContractDialog(false);
    }

    const hideDeleteContractDialog = () => {
        setdeleteContractDialog(false);
    }



    const saveContract = async () => {
        setSubmitted(true);

        if (contract.cont_emp.emp_cedula.trim()) {
            let _contract = { ...contract };

            const datos = {
                con_fecha_entrada: _contract.con_fecha_entrada,
                con_fecha_salida: _contract.con_fecha_salida,
                con_liquidacion_estado: _contract.con_liquidacion_estado,
                con_liquidacion_fecha: _contract.con_liquidacion_fecha,
                con_liquidacion_observacion: _contract.con_liquidacion_observacion,
                con_estado: true,
                emp_cedula: _contract.cont_emp.emp_cedula,
                pue_id: _contract.cont_puest.pue_id
            };


            if (edit) {
                await ContratoService.putContrato(_contract.con_id, datos)
                    .then(response => {
                    })
                    .catch(error => {
                        console.log(error);
                    });
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Contract Updated', life: 3000 });


            } else {
                await ContratoService.postContrato(datos)
                    .then((response) => {
                    })
                    .catch((error) => {
                        console.error(error);
                    });
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Contract Updated', life: 3000 });
            }

            setContractDialog(false);
            setContract(emptyContract);
            getContracts();
        }

    }

    const editContract = (contract) => {
        setContract({ ...contract });
        setContractDialog(true);
        setEdit(true);
    }

    const confirmDeleteContract = (contract) => {
        setContract(contract);
        setdeleteContractDialog(true);
    }

    const onEmployeeChange = (e) => {
        setContract({
            ...contract, cont_emp: {
                emp_cedula: e.value
            }
        });

    }

    const onWorkstationChange = (e) => {
        setContract({
            ...contract, cont_puest: {
                pue_id: e.value
            }
        })

    }

    const onLiquidationChange = (e) => {
        const updatedContract = { ...contract, con_liquidacion_estado: e.target.value };
        setContract(updatedContract);
    };

    const deleteContract = () => {
        let _contract = { ...contract };

        ContratoService.putDelete(_contract.con_id)
            .then((response) => {
            })
            .catch((error) => {
                console.error(error);
            });
        setdeleteContractDialog(false);
        setContract(emptyContract);
    }




    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _contract = { ...contract };
        _contract[`${name}`] = val;

        setContract(_contract);
    }

    const OonInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        const fecha = new Date(val);
        let _contract = { ...contract };
        _contract[`${name}`] = fecha.toISOString();

        setContract(_contract);
    }

    const estadoLiquidacion = (contract) => {
        if (contract.con_liquidacion_estado) {
            return "Pagado"
        } else {
            return "No pagado"
        }
    }

    const statusBodyTemplate = (rowData) => {
        return <Tag value={estadoLiquidacion(rowData)} severity={getLiquidation(rowData)}></Tag>;
    };


    const getLiquidation = (contract) => {
        switch (contract.con_liquidacion_estado) {
            case true:
                return 'success';

            case false:
                return 'danger';
            default:
                return null;
        }
    };




    const [lazyParams, setLazyParams] = useState({
        first: 0,
        rows: 10,
        page: 0,
        sortField: null,
        sortOrder: null,
        filters: {
            'estado': { value: null, matchMode: 'contains' },
            'contractId': { value: '', matchMode: 'contains' },
            'fechaE': { value: '', matchMode: 'contains' },
            'fechaS': { value: '', matchMode: 'contains' },
            'liquidacionEstado': { value: '', matchMode: 'contains' },
            'fechaL': { value: '', matchMode: 'contains' },
            'liquidacionOb': { value: '', matchMode: 'contains' },
            'cedulaEmpleado': { value: '', matchMode: 'contains' },
            'puesto': { value: '', matchMode: 'contains' }
        }
    });
    useEffect(() => {
        getContracts();
    }, [lazyParams]);

    //Consumo de API
    //--------------Contract------------------------
    const getContracts = async () => {
        var consulta = "/pagination?page=" + lazyParams.page + "&size=" + lazyParams.rows;

        if (lazyParams.filters.estado.value !== '' && lazyParams.filters.estado.value !== null) {
            consulta += "&estado" + lazyParams.filters.estado.value
        }
        if (lazyParams.filters.contractId.value !== '' && lazyParams.filters.contractId.value !== null) {
            consulta += "&contractId" + lazyParams.filters.contractId.value
        }
        if (lazyParams.filters.fechaE.value !== '' && lazyParams.filters.fechaE.value !== null) {
            consulta += "&fechaE" + lazyParams.filters.fechaE.value
        }
        if (lazyParams.filters.fechaS.value !== '' && lazyParams.filters.fechaS.value !== null) {
            consulta += "&fechaS" + lazyParams.filters.fechaS.value
        }
        if (lazyParams.filters.liquidacionEstado.value !== '' && lazyParams.filters.liquidacionEstado.value !== null) {
            consulta += "&liquidacionEstado" + lazyParams.filters.liquidacionEstado.value
        }
        if (lazyParams.filters.fechaL.value !== '' && lazyParams.filters.fechaL.value !== null) {
            consulta += "&fechaL" + lazyParams.filters.fechaL.value
        }
        if (lazyParams.filters.liquidacionOb.value !== '' && lazyParams.filters.liquidacionOb.value !== null) {
            consulta += "&liquidacionOb" + lazyParams.filters.liquidacionOb.value
        }
        if (lazyParams.filters.cedulaEmpleado.value !== '' && lazyParams.filters.cedulaEmpleado.value !== null) {
            consulta += "&cedulaEmpleado" + lazyParams.filters.cedulaEmpleado.value
        }
        if (lazyParams.filters.puesto.value !== '' && lazyParams.filters.puesto.value !== null) {
            consulta += "&puesto" + lazyParams.filters.puesto.value
        }

        setLoading(true);
        const response = await ContratoService.getContratosByPagination(consulta)
        setContracts(response.data);
        setTotalRecords(response.data.pagination.totalElements);
        setContractsFilter(response.data.content);
        setLoading(false);
    }

    //--------------Employees------------------------
    const getEmployees = async () => {
        const response = await axios.get('https://nomina.fly.dev/nominaweb/api/v1/empleado');

        setEmployees(response.data);

    }

    //--------------Workstation-----------------------

    const getWorkstation = async () => {
        const response = await axios.get('https://nomina.fly.dev/nominaweb/api/v1/puesto/pue');

        setWorkstation(response.data)
    }


    useEffect(() => {
        getEmployees();
    }, []);

    useEffect(() => {
        getWorkstation();
    }, []);

    //components

    const leftToolbarTemplate = (
        <React.Fragment>
            <Button label="Nuevo" icon="pi pi-plus" className="p-button-success p-mr-2" onClick={openNew} />
        </React.Fragment>
    )

    const header = (
        <div className="table-header">
            <h5 className="p-m-0">Listado de Contratos</h5>
        </div>
    );
    const productDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={saveContract} />
        </React.Fragment>
    );
    const deleteContractDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteContractDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteContract} />
        </React.Fragment>
    );

    const actionBodyTemplate = (rowData) => {
        // Action body template logic
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success p-mr-2" onClick={() => editContract(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => confirmDeleteContract(rowData)} />
            </React.Fragment>
        );
    };

    const onPage = (event) => {
        setLazyParams(event);
    }
    const onFilter = (event) => {
        event['first'] = 0;
        event.page = 0
        setLazyParams(event);
    }


    return (
        <div className="datatable-filter-demo">

            <Toast ref={toast} />
            <div className="card">
                <Toolbar className="p-mb-4" left={leftToolbarTemplate} ></Toolbar>

                <DataTable value={contractsFilter}
                    dataKey="con_id"
                    lazy first={lazyParams.first} totalRecords={totalRecords} onPage={onPage}
                    paginator rows={lazyParams.rows} className="p-datatable-customers" loading={loading}
                    filterDisplay="row" showGridlines responsiveLayout="scroll" emptyMessage="No se encontro información."
                    rowsPerPageOptions={[5, 10, 20, 50]} filters={lazyParams.filters} onFilter={onFilter}
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
                    header={header}>
                    <Column field="con_id" header="Code"></Column>
                    <Column field={(employees) => `${employees.cont_emp.emp_cedula} - ${employees.cont_emp.emp_nombres} ${employees.cont_emp.emp_apellidos}`} header="Empleado" headerClassName="text-center" ></Column>
                    <Column field="con_fecha_entrada" header="Fecha Entrada" headerClassName="text-center"></Column>
                    <Column field="con_fecha_salida" header="Fecha Salida" dateFormat="dd/mm/yy"></Column>
                    <Column field="con_liquidacion_estado" header="Liquidacion" body={statusBodyTemplate}></Column>
                    <Column header="Opciones" body={actionBodyTemplate}></Column>
                </DataTable>
            </div>
            <Dialog visible={contractDialog} style={{
                width: '450px'
            }} header="Detalle Contrato" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                <div className="p-field">
                    <label htmlFor="employee">Seleccione Empleado</label>
                    <Dropdown name="employee" value={contract.cont_emp.emp_cedula} onChange={onEmployeeChange} options={employees} optionLabel={(employees) => `${employees.emp_cedula} - ${employees.emp_nombres} ${employees.emp_apellidos}`} placeholder="Seleccione un empleado"
                        filter className={classNames({ 'p-invalid': submitted && !contract.cont_emp.emp_cedula })} optionValue="emp_cedula" />
                    {submitted && !contract.cont_emp.emp_cedula && <small className="p-error">Cedula Requerida.</small>}
                </div>
                <div className="p-field">
                    <label htmlFor="workstation">Seleccione Empleado</label>
                    <Dropdown name="workstation" value={contract.cont_puest.pue_id} onChange={onWorkstationChange} options={workstation} optionLabel={(workstation) => `${workstation.pue_nombre} - ${workstation.puest_cargo.car_nombre}`} placeholder="Seleccione un Puesto"
                        filter className={classNames({ 'p-invalid': submitted && !contract.cont_puest.pue_id })} optionValue="pue_id" />
                    {submitted && !contract.cont_puest.pue_id && <small className="p-error">Puesto Requerido.</small>}
                </div>


                <div className="p-formgrid p-grid">
                    <div className="p-field p-col">
                        <label htmlFor="date">Fecha Inicio</label>
                        <Calendar id="date" value={new Date(contract.con_fecha_entrada)} onChange={(e) => OonInputChange(e, 'con_fecha_entrada')} className={classNames({ 'p-invalid': submitted && !contract.cont_emp.emp_cedula })} dateFormat="dd/mm/yy" />
                    </div>
                    <div className="p-field p-col">
                        <label htmlFor="date">Fecha Salida</label>
                        <Calendar id="date" value={new Date(contract.con_fecha_salida)} onChange={(e) => OonInputChange(e, 'con_fecha_salida')} dateFormat="dd/mm/yy" />
                    </div>
                </div>
                <div className="p-field">
                    <label htmlFor="liquidacion">Liquidacion</label>
                    <div className="flex flex-wrap gap-3">
                        <div className="flex align-items-center">
                            <RadioButton inputId="liquidation1" name="true" value={true} onChange={onLiquidationChange} checked={contract.con_liquidacion_estado === true} />
                            <label htmlFor="liquidation1" className="ml-2">Si</label>
                        </div>
                        <div className="flex align-items-center">
                            <RadioButton inputId="liquidation1" name="false" value={false} onChange={onLiquidationChange} checked={contract.con_liquidacion_estado === false} />
                            <label htmlFor="liquidation1" className="ml-2">No</label>
                        </div>
                        <div className="p-field p-col">
                            <label htmlFor="date">Fecha Liquidación</label>
                            <Calendar id="date" value={new Date(contract.con_liquidacion_fecha)} onChange={(e) => OonInputChange(e, 'con_liquidacion_fecha')} dateFormat="dd/mm/yy" />
                        </div>
                    </div>
                    <label htmlFor="description">Description</label>
                    <InputTextarea id="description" value={contract.con_liquidacion_observacion} onChange={(e) => onInputChange(e, 'con_liquidacion_observacion')} required rows={3} cols={20} />


                </div>


            </Dialog>

            <Dialog visible={deleteContractDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteContractDialogFooter} onHide={hideDeleteContractDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {contract && (
                        <span>
                            Are you sure you want to delete <b>{contract.cont_emp.emp_cedula}</b>?
                        </span>
                    )}
                </div>
            </Dialog>


        </div>
    );
};

export default ContratRegister;