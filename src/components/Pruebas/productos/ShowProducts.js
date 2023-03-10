import React, { useEffect, useState } from "react";
import axios from "axios";

import './ShowProducts.css'
import { InputText } from 'primereact/inputtext';
import { DataTable } from 'primereact/datatable';
import { Column } from "primereact/column";



const ShowProducts = () => {

    const [data, setData] = useState([
        { id: 1, name: 'Producto 1', category: 'Categoría 1' },
        { id: 2, name: 'Producto 2', category: 'Categoría 2' },
        { id: 3, name: 'Producto 3', category: 'Categoría 3' },
    ]);
    const [editing, setEditing] = useState(false);
    const [editProduct, setEditProduct] = useState({ id: null, name: '', category: '' });
    const [categories, setCategories] = useState(['Categoría 1', 'Categoría 2', 'Categoría 3']);

    function addProduct(product) {
        setData([...data, product]);
    }

    function deleteProduct(id) {
        setData(data.filter((product) => product.id !== id));
    }

    function updateProduct(id, updatedProduct) {
        setData(data.map((product) => (product.id === id ? updatedProduct : product)));
        setEditing(false);
    }

    function editRow(product) {
        setEditing(true);
        setEditProduct({ id: product.id, name: product.name, category: product.category });
    }

    function handleInputChange(event) {
        const { name, value } = event.target;
        setEditProduct({ ...editProduct, [name]: value });
    }

    function handleSelectChange(event) {
        const { value } = event.target;
        setEditProduct({ ...editProduct, category: value });
    }

    function handleSubmit(event) {
        event.preventDefault();

        if (editing) {
            updateProduct(editProduct.id, editProduct);
        } else {
            addProduct({ ...editProduct, id: data.length + 1 });
        }
        setEditProduct({ id: null, name: '', category: '' });
        setEditing(false);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Nombre:
                    <input type="text" name="name" value={editProduct.name} onChange={handleInputChange} />
                </label>
                <label>
                    Categoría:
                    <select value={editProduct.category} onChange={handleSelectChange}>
                        {categories.map((category) => (
                            <option value={category} key={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </label>
                <button>{editing ? 'Actualizar' : 'Agregar'}</button>
                {editing && <button onClick={() => setEditing(false)}>Cancelar</button>}
            </form>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Categoría</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((product) => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>{product.category}</td>
                            <td>
                                <button onClick={() => editRow(product)}>Editar</button>
                                <button onClick={() => deleteProduct(product.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ShowProducts