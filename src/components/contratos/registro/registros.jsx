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

import './registro.css'

const ContratRegister = () => {

    const url = 'http://localhost:4000/nominaweb/api/v1/contrato/contratos';


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
    const [contractDialog, setContractDialog] = useState(false);
    const [deleteContractDialog, setdeleteContractDialog] = useState(false);
    const [deleteContractsDialog, setDeleteContractsDialog] = useState(false);
    const [contract, setContract] = useState(emptyContract);
    const [selectedContracts, setSelectedContracts] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [edit, setEdit] = useState(false);
    const toast = useRef(null);

    //employees
    const [employees, setEmployees] = useState({});

    //workstation
    const [workstation, setWorkstation] = useState({});

    function formatCurrency(value) {
        return value.toLocaleString("en-US", { style: "currency", currency: "USD" });
    }

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

    const hideDelectedContractsDialog = () => {
        setDeleteContractsDialog(false);
    }

    const saveContract = () => {
        setSubmitted(true);

        if (contract.cont_emp.emp_cedula.trim()&&contract.cont_puest.pue_id.trim()) {
            let _contracts = [...contracts];
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
                console.log('editar')
                console.log(_contract)

                axios.put(`http://localhost:4000/nominaweb/api/v1/contrato/contratos/${_contract.con_id}`, datos)
                    .then(response => {
                        console.log(response.data);
                    })
                    .catch(error => {
                        console.log(error);
                    });
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Contract Updated', life: 3000 });


            } else {
                console.log('nuevo')
                console.log(_contract)
                axios.post('http://localhost:4000/nominaweb/api/v1/contrato/contratos', datos)
                    .then((response) => {
                        console.log(response.data);
                    })
                    .catch((error) => {
                        console.error(error);
                    });
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Contract Updated', life: 3000 });
            }

            setContractDialog(false);
            setContract(emptyContract);
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
        console.log('d', e.value)
        setContract({
            ...contract, cont_emp: {
                emp_cedula: e.value
            }
        });

    }

    const onWorkstationChange = (e) => {
        console.log('w', e.value)
        setContract({
            ...contract, cont_puest: {
                pue_id: e.value
            }
        })

    }

    const onLiquidationChange = (e) => {
        console.log('l', e.value)
        const updatedContract = { ...contract, con_liquidacion_estado: e.target.value };
        setContract(updatedContract);
    };

    const deleteContract = () => {
        let _contract = { ...contract };

        axios.put(`http://localhost:4000/nominaweb/api/v1/contrato/contrato/${_contract.con_id}`)
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
        setdeleteContractDialog(false);
        setContract(emptyContract);
        // showToast('success', 'Product Deleted', 'Product has been deleted successfully.');
    }

    const deleteSelectedContracts = () => {
        let _contracts = contracts.filter(val => !selectedContracts.includes(val));
        console.log('el', _contracts);
        setContracts(_contracts);
        setDeleteContractsDialog(false);
        setSelectedContracts(null);

        // showToast('success', 'Products Deleted', 'Selected products have been deleted successfully.');
    }


    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _contract = { ...contract };
        _contract[`${name}`] = val;

        setContract(_contract);
    }

    const OonInputChange = (e, name) => {
        console.log(e)

        const val = (e.target && e.target.value) || '';
        console.log('v', val)
        const fecha = new Date(val);
        let _contract = { ...contract };
        _contract[`${name}`] = fecha.toISOString();

        setContract(_contract);
    }





    //Consumo de API
    //--------------Contract------------------------
    const getContracts = async () => {
        const response = await axios.get(url);

        console.log('c', response.data)
        setContracts(response.data);
    }

    //--------------Employees------------------------
    const getEmployees = async () => {
        const response = await axios.get('http://localhost:4000/nominaweb/api/v1/empleado/empleados');

        console.log('e', response.data)
        setEmployees(response.data);
    }

    //--------------Workstation-----------------------

    const getWorkstation = async () => {
        const response = await axios.get('http://localhost:4000/nominaweb/api/v1/puesto/pue');

        console.log('w', response.data)
        setWorkstation(response.data)
    }


    useEffect(() => {
        getContracts();
    }, []);

    useEffect(() => {
        getEmployees();
    }, []);

    useEffect(() => {
        getWorkstation();
    }, []);




    //components


    const leftToolbarTemplate = (
        <React.Fragment>
            <Button label="New" icon="pi pi-plus" className="p-button-success p-mr-2" onClick={openNew} />
            <Button label="Delete" icon="pi pi-trash" className="p-button-danger" />
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
   

    return (
        <div className="datatable-crud-demo">

            <Toast ref={toast} />
            <div className="card">
                <Toolbar className="p-mb-4" left={leftToolbarTemplate} ></Toolbar>

                <DataTable value={contracts}  selection={selectedContracts}  onSelectionChange={(e) => setSelectedContracts(e.value)}
                    dataKey="con_id"
                    header={header}>
                    <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                    <Column field="con_id" header="Code" sortable></Column>
                    <Column field={(employees) => `${employees.cont_emp.emp_cedula} - ${employees.cont_emp.emp_nombres} ${employees.cont_emp.emp_apellidos}`} header="Empleado" sortable></Column>
                    <Column field="con_fecha_entrada" header="Fecha Entrada" sortable></Column>
                    <Column field="con_fecha_salida" header="Fecha Salida" dateFormat="dd/mm/yy" sortable></Column>
                    <Column field="con_liquidacion_estado" header="Category" sortable></Column>
                    <Column body={actionBodyTemplate}></Column>
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
                        <Calendar id="date" value={new Date(contract.con_fecha_entrada)} onChange={(e) => OonInputChange(e, 'con_fecha_entrada')}  className={classNames({ 'p-invalid': submitted && !contract.cont_emp.emp_cedula })}dateFormat="dd/mm/yy" />
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
                            <label htmlFor="date">Fecha Inicio</label>
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