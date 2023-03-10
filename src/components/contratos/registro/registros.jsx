import React, { useEffect, useState } from "react";
import axios from "axios";
import { DataTable } from 'primereact/datatable';
import { Toast } from 'primereact/toast';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dialog } from 'primereact/dialog';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import './registro.css'

const ContratRegister = () => {

    const url = 'http://localhost:4000/nominaweb/api/v1/contrato/contratos';


    const emptyContract = {
        con_id: "",
        con_fecha_entrada: null,
        con_fecha_salida: null,
        con_liquidacion_estado: true,
        con_liquidacion_fecha: null,
        con_liquidacion_observacion: "",
        con_estado: true,
        cont_emp: {
            emp_cedula: ""
        },
        pue_id: "",
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

    //employees
    const [employees, setEmployees] = useState({});
    const [selectedEmployees, setSelectedEmployees] = useState(null);

    function formatCurrency(value) {
        return value.toLocaleString("en-US", { style: "currency", currency: "USD" });
    }

    const openNew = () => {
        setContract(emptyContract);
        setSubmitted(false);
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
        if (contract.con_id.trim()) {
            let _contracts = [...contracts];
            let _contract = { ...contract };
            if (contract.con_id) {
                const index = findIndexById(contract.con_id);
                _contracts[index] = _contract;
                // showToast('success', 'Product Updated', 'Product has been updated successfully.');
            }
            else {
                _contract.con_id = createId();
                _contracts.push(_contract);
                // showToast('success', 'Product Created', 'Product has been created successfully.');
            }

            setContracts(_contracts);
            setContractDialog(false);
            setContract(emptyContract);
        }
    }

    const editContract = (contract) => {
        setContract({ ...contract });
        setContractDialog(true);
        console.log(contract)
    }

    const confirmDeleteContract = (contract) => {
        setContract(contract);
        setdeleteContractDialog(true);
    }

    const onEmployeeChange = (e) => {
        console.log('d',e.value)
        setContract({
            ...contract, cont_emp: {
                emp_cedula: e.value
            }
        });

    }

    const deleteContract = () => {
        let _contracts = contracts.filter(val => val.id !== contract.id);
        setContracts(_contracts);
        setdeleteContractDialog(false);
        setContract(emptyContract);
        // showToast('success', 'Product Deleted', 'Product has been deleted successfully.');
    }

    const deleteSelectedContracts = () => {
        let _contracts = contracts.filter(val => !selectedContracts.includes(val));
        setContracts(_contracts);
        setDeleteContractsDialog(false);
        setSelectedContracts(null);
        // showToast('success', 'Products Deleted', 'Selected products have been deleted successfully.');
    }

    const findIndexById = (id) => {
        let index = -1;
        for (let i = 0; i < contracts.length; i++) {
            if (contracts[i].id === id) {
                index = i;
                break;
            }
        }
        return index;
    }

    const createId = () => {
        let id = '';
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _contract = { ...contract };
        _contract[`${name}`] = val;

        setContract(_contract);
    }


    //Consumo de API
    const getContracts = async () => {
        const response = await axios.get(url);

        console.log('c', response.data)
        setContracts(response.data);
    }

    const getEmployees = async () => {
        const response = await axios.get('http://localhost:4000/nominaweb/api/v1/empleado/empleados');

        console.log('e', response.data)
        setEmployees(response.data);
    }


    useEffect(() => {
        getContracts();
    }, []);

    useEffect(() => {
        getEmployees();
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
    const deleteProductDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteContractDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteContract} />
        </React.Fragment>
    );
    const deleteProductsDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDelectedContractsDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteSelectedContracts} />
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


            <div className="card">
                <Toolbar className="p-mb-4" left={leftToolbarTemplate} ></Toolbar>

                <DataTable value={contracts} selection={selectedContracts} onSelectionChange={(e) => setSelectedContracts(e.value)}
                    dataKey="con_id"
                    header={header}>
                    <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                    <Column field="con_id" header="Code" sortable></Column>
                    <Column field= {(employees) => `${employees.cont_emp.emp_cedula} - ${employees.cont_emp.emp_nombres} ${employees.cont_emp.emp_apellidos}`} header="Empleado" sortable></Column>
                    <Column field="con_fecha_entrada" header="Fecha Entrada" sortable></Column>
                    <Column field="con_fecha_salida" header="Fecha Salida" sortable></Column>
                    <Column field="con_liquidacion_estado" header="Category" sortable></Column>
                    <Column body={actionBodyTemplate}></Column>
                </DataTable>
            </div>
            <Dialog visible={contractDialog} style={{ width: '450px' }} header="Product Details" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                <div className="p-field">
                    <label htmlFor="name">Codigo Prueba</label>
                    <InputText id="name" value={contract.con_id} onChange={(e) => onInputChange(e, 'con_id')} required autoFocus />
                </div>
                <div className="p-field">
                    <label htmlFor="description">Seleccione Empleado</label>
                    <Dropdown name="emp_cedula" value={contract.cont_emp.emp_cedula} onChange={onEmployeeChange} options={employees} optionLabel={(employees) => `${employees.emp_cedula} - ${employees.emp_nombres} ${employees.emp_apellidos}`} placeholder="Seleccione un empleado"
                        filter className="w-full md:w-14rem" optionValue="emp_cedula" />
                </div>
            </Dialog>


        </div>
    );
};

export default ContratRegister;