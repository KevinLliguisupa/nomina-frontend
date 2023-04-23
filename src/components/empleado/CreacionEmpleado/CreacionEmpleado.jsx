import React, { useState } from 'react';
import { Steps } from 'primereact/steps';
import InfoPrincipal from './infoPrincipal/infoPrincipal';
import CreacionInformacion from './infoAdicional/infoAdicional';
import Confirmacion from './confirmacion/confirmacion';
import { show_alert } from '../../../functions';
import "./CreacionEmpleado.css";
import EmpleadoService from '../../../services/empleadoService';
import InfoAdicionalService from '../../../services/infoAdicionalService';
import { subirArchivo } from '../../../firebase/config';

const Creacion = () => {
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
      emp_imagen: "",
      emp_estado: true,
      emp_lugar_nacimiento: "",
      emp_nombres: "",
      emp_reentrenado: false,
      emp_sexo: null,
      est_id: 1,
      niv_id: 1,
      tit_id: 1,
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
    delete datosFormulario.infoEmpleado.nivel
    delete datosFormulario.infoEmpleado.estadoCivil
    delete datosFormulario.infoEmpleado.titulo
    delete datosFormulario.infoEmpleado.ciudad

    let imagen_url=null;
    try {
      if (datosFormulario.infoEmpleado.foto !== "" && datosFormulario.infoEmpleado.foto !== null){
        imagen_url= await subirArchivo(datosFormulario.infoEmpleado.foto, datosFormulario.infoEmpleado.emp_cedula)
      }
      datosFormulario.infoEmpleado.emp_imagen = imagen_url  !==null ? imagen_url : ""
        
    } catch (error) {
        console.error(error);
        imagen_url=null;
    }

    delete datosFormulario.infoEmpleado.foto

    try {
      await EmpleadoService.postEmpleado(datosFormulario.infoEmpleado).then(
        async (response) => {
        var mensage1 = response.data.message;
        console.log(response.data)
        if (mensage1 === 'Empleado creado con éxito') {

          await InfoAdicionalService.postInformacionAdi(datosFormulario.infoAdicional).then(
            function (response) {
            var mensage2 = response.data.message;
            if (mensage2 === 'Informacion creada con éxito') {
              show_alert(mensage1, "success")
              setTimeout(function() {
                window.location.href = "/empleados";
              }, 1000);
            } else {
              show_alert("Error en información adicional", "error");
              console.error("Error al crear la información adicional")
            }
          })
        } else {
          show_alert("Error en información principal", "error");
          console.error("Error al crear la información principal del empleado")
        }
      })
    } catch (error) {
      show_alert("Error al crear el empleado", "error");
      console.error("Error en la creacion del empleado");
    }
  }

  return (
    <div>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Creación de empleado</h1>
      </div>

      <div className='cardPersonalizada'>
        <Steps model={steps} activeIndex={activeIndex} />

        {activeIndex === 0 &&
          <div className="card inputs" >
            <InfoPrincipal
              datos={datos} vista={"creacion"}
              onSiguiente={handleGuardarDatos} />
          </div>
        }
        {activeIndex === 1 && (
          <div className="card inputs">
            <CreacionInformacion
              datos={datos} onSiguiente={handleGuardarDatos}
              onAnterior={handlePrev} vista={"creacion"} />
          </div>
        )}
        {activeIndex === 2 && (
          <Confirmacion
            datos={datos} onAnterior={handlePrev}
            onSubmit={handleSubmit} vista={"creacion"} />
        )}

      </div>
    </div>
  );
};

export default Creacion;

