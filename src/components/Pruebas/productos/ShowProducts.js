import React, { useEffect, useState } from "react";
import axios from "axios";

import './ShowProducts.css'
import { InputText } from 'primereact/inputtext';
import { DataTable } from 'primereact/datatable';
import { Column } from "primereact/column";



const ShowProducts = () => {

    const url = 'http://localhost:8080/productos/';
    // const url = 'http://localhost:8080/productos?page=0&size=2&enablePagination=true';
    const [products, setProducts] = useState([]);


    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        const response = await axios.get(url);
        const productsResponse = response.data.content;
        productsResponse.map((product) => {

            product.proIva = product.proIva ? "Si" : "No"
            product.proEstado = product.proEstado ? "Activo" : "Inactivo";
            return 0;
        });
        setProducts(productsResponse);
    }



    return (
        <div className="App">
            <div className="container-fluid">

                <InputText />

                <DataTable value={products} responsiveLayout="scroll" >
                    <Column field="proId" header="Code"></Column>
                    <Column field="proNombre" header="Name"></Column>
                    <Column field="categoria.catNombre" header="Category"></Column>
                    <Column field="quantity" header="Quantity"></Column>
                </DataTable>

            </div>
        </div>
    )
}

export default ShowProducts