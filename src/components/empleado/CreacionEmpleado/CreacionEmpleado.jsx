import React, { useState, useRef } from 'react';
import { Steps } from 'primereact/steps';
import axios from "axios";
import InfoPrincipal from './infoPrincipal/infoPrincipal';
import CreacionInformacion from './infoAdicional/infoAdicional';
import Confirmacion from './confirmacion/confirmacion';
import { show_alert } from '../../../functions';
import { Toast } from 'primereact/toast';
import "./CreacionEmpleado.css";
import { Card } from 'primereact/card';

const Creacion = () => {
  const url = "http://localhost:4000/nominaweb/api/v1";
  const [activeIndex, setActiveIndex] = useState(0);
  const [datos, setDatos] = useState({
    infoEmpleado: {
      ciu_nacimiento_id: "",
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
      est_id: "",
      niv_id: "",
    },
    infoAdicional: {
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
    }
  });

  const toast = useRef(null);
  const steps = [
    { label: 'Información Principal' },
    { label: 'Información Adicional' },
    { label: 'Confirmación' },
  ];

  const handleNext = () => {
    setActiveIndex(activeIndex + 1);
  };

  const handlePrev = () => {
    setActiveIndex(activeIndex - 1);
  };

  const handleGuardarDatos = (datosFormulario) => {
    setDatos({ ...datos, ...datosFormulario });
    handleNext();
  };

  const handleSubmit = async (datosFormulario) => {
    datosFormulario.infoEmpleado.ciu_nacimiento_id = datosFormulario.infoEmpleado.ciu_nacimiento_id.ciu_id
    datosFormulario.infoEmpleado.est_id = datosFormulario.infoEmpleado.est_id.est_id
    datosFormulario.infoEmpleado.niv_id = datosFormulario.infoEmpleado.niv_id.niv_id

    // console.log(datosFormulario);
    try {
      await axios({
        method: "post",
        url: url + "/empleado",
        data: datosFormulario.infoEmpleado
      }).then(async (response) => {
        var mensage1 = response.data.message;
        if (mensage1 === 'Empleado creado con éxito') {

          await axios({
            method: "post",
            url: url + "/informacion",
            data: datosFormulario.infoAdicional
          }).then(function (response) {
            var mensage2 = response.data.message;
            if (mensage2=== 'Informacion creada con éxito') {
              show_alert(mensage1, "success")
            } else {
              show_alert("Error en la información principal", "error");
              console.error("Error al crear la información adicional")
            }
          })
        } else {
          show_alert("Error en la información adicional", "error");
          console.error("Error al crear la información del empleado")
        }
      })
    } catch (error) {
      show_alert("Error al crear el empleado", "error");
      console.error("Error en la creacion del empleado");
    }
  }

  const header = <Steps model={steps} activeIndex={activeIndex} />;

  return (
    <div>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Creación de empleado</h1>
      </div>

      <div className='cardPersonalizada'>
        <Steps model={steps} activeIndex={activeIndex} />

        {activeIndex === 0 &&
          <InfoPrincipal
            datos={datos}
            onSiguiente={handleGuardarDatos} />
        }
        {activeIndex === 1 && (
          <CreacionInformacion
            datos={datos}
            onSiguiente={handleGuardarDatos}
            onAnterior={handlePrev} />
        )}
        {activeIndex === 2 && (
          <Confirmacion
            datos={datos} onAnterior={handlePrev}
            onSubmit={handleSubmit} />
        )}

      </div>
    </div>
  );
};

export default Creacion;

