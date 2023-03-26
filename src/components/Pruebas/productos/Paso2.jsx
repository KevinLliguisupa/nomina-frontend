import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

const Paso2 = ({ datos, onSiguiente, onAnterior }) => {
  const [telefono, setTelefono] = useState(datos.telefono || '');
  const [direccion, setDireccion] = useState(datos.direccion || '');
  const [ciudad, setCiudad] = useState(datos.ciudad || '');

  const handleSiguiente = () => {
    const nuevosDatos = { telefono, direccion, ciudad };
    onSiguiente(nuevosDatos);
  };

  return (
    <div className="p-d-flex p-flex-column p-jc-center">
      <div className="p-field">
        <label htmlFor="telefono">Teléfono</label>
        <InputText
          id="telefono"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
        />
      </div>
      <div className="p-field">
        <label htmlFor="direccion">Dirección</label>
        <InputText
          id="direccion"
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
        />
      </div>
      <div className="p-field">
        <label htmlFor="ciudad">Ciudad</label>
        <InputText
          id="ciudad"
          value={ciudad}
          onChange={(e) => setCiudad(e.target.value)}
        />
      </div>
      <div className="p-d-flex p-jc-between">
        <Button label="Anterior" icon="pi pi-angle-left" onClick={onAnterior} />
        <Button label="Siguiente" icon="pi pi-angle-right" onClick={handleSiguiente} />
      </div>

    </div>
  );
};

export default Paso2;
