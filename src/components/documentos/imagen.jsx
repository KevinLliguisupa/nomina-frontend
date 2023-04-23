import React, { useState } from 'react';
import { subirArchivo } from '../../firebase/config';


const Imagen = () => {
  const [archivo, setArchivo] = useState(null);
  const [mensaje, setMensaje] = useState('');

  const handleChange = (event) => {
    setArchivo(event.target.files[0]);
  };

  const handleSubmit = async () => {
    const result = await subirArchivo(archivo, "hola")
    console.log(result);
  };
   
  return (
    <div>
        <label>
          Seleccione un archivo:
          <input type="file"  accept="image/*" onChange={handleChange} />
        </label>
        <button type="submit" onClick={handleSubmit}>Subir archivo</button>
    </div>
  );
}
export default Imagen;