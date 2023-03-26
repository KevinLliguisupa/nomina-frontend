import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

const Paso1 = ({ onSiguiente }) => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');

  const handleSiguiente = () => {
    const datos = { nombre, apellido, email };
    onSiguiente(datos);
  };

  return (
    <div className="p-d-flex p-flex-column p-jc-center">
      <div className="p-field">
        <label htmlFor="nombre">Nombre</label>
        <InputText
          id="nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </div>
      <div className="p-field">
        <label htmlFor="apellido">Apellido</label>
        <InputText
          id="apellido"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
        />
      </div>
      <div className="p-field">
        <label htmlFor="email">Email</label>
        <InputText
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <Button label="Siguiente" icon="pi pi-angle-right" onClick={handleSiguiente} />
    </div>
  );
};

export default Paso1;
