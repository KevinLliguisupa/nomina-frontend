import React, { useState } from 'react';
import { Steps } from 'primereact/steps';
import { Button } from 'primereact/button';
import Paso1 from './Paso1.jsx';
import Paso2 from './Paso2';
import Paso3 from './Paso3';

const ShowProducts = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [datos, setDatos] = useState({});

  const steps = [
    { label: 'Paso 1' },
    { label: 'Paso 2' },
    { label: 'Paso 3' },
  ];

  const handleNext = () => {
    setActiveIndex(activeIndex + 1);
  };

  const handlePrev = () => {
    setActiveIndex(activeIndex - 1);
  };

  const handleGuardarDatos = (datos) => {
    setDatos({ ...datos, ...datos });
    handleNext();
  };

  return (
    <div className="p-d-flex p-jc-center p-ai-center p-mt-4">
      <div className="p-mx-4" style={{ width: '50%' }}>
        <Steps model={steps} activeIndex={activeIndex} />
        {activeIndex === 0 && <Paso1 onSiguiente={handleGuardarDatos} />}
        {activeIndex === 1 && (
          <Paso2
            datos={datos}
            onSiguiente={handleGuardarDatos}
            onAnterior={handlePrev}
          />
        )}
        {activeIndex === 2 && (
          <Paso3 datos={datos} onAnterior={handlePrev} />
        )}
        <div className="p-d-flex p-jc-between p-mt-4">

          {activeIndex === 2 && (
            <Button label="Enviar" icon="pi pi-check" />
          )}
        </div>
      </div>
    </div>
  );
};

export default ShowProducts;
