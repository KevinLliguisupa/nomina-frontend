import React, { useState, useRef } from 'react';
import { Steps } from 'primereact/steps';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import axios from "axios";



import InfoPrincipal from './infoPrincipal/infoPrincipal';
import CreacionInformacion from './infoAdicional/infoAdicional';
import Confirmacion from './confirmacion/confirmacion';

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
  {
    label: 'Información Principal',
    command: (event) => {
      toast.current.show({ severity: 'info', summary: 'Información Principal', detail: event.item.label });
    }
  },
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
  datosFormulario.infoAdicional.emp_cedula = datosFormulario.infoEmpleado.emp_cedula
  console.log(datosFormulario)

  try {
    await axios({
      method: "post",
      url: url + "/empleado",
      data: datosFormulario.infoEmpleado
    }).then(async (response) => {
      var mensage = response.data.message;
          if (mensage === 'Empleado creado con éxito') {
        console.log("Creacion Empleado correctamente")
        console.log(response)
        // show_alert("Creado/Actualizado correctamente", "success");

        await axios({
          method: "post",
          url: url + "/informacion",
          data: datosFormulario.infoAdicional
        }).then(function (response) {
          var mensage = response.data.message;
          if (mensage === 'Informacion creada con éxito') {
            console.log("Creacion Adicional correctamente")
            console.log(response)
            // show_alert("Creado/Actualizado correctamente", "success");

          } else {
            
            console.log("Error en la información adicional")
          }
        })
          // .catch(function (err) {
          //   console.log(err)
          //   // show_alert("Error en la solicitud", "error");
          // });

      }else {

        console.log("Error en la informacion del empleado ")
      }
    })
      // .catch(function (err) {
      //   // show_alert("Error en la solicitud", "error");
      // });

  } catch (error) {
    console.log("Error en la creacion del empleado");
  }

}


return (
  <div className="p-d-flex p-jc-center card p-ai-center p-mt-4">

    <Steps model={steps} activeIndex={activeIndex} />
    {activeIndex === 0 &&
      <InfoPrincipal
      datos={datos}
      onSiguiente={handleGuardarDatos}
      />
    }
    {activeIndex === 1 && (
      <CreacionInformacion
      datos={datos}
        onSiguiente={handleGuardarDatos}
        onAnterior={handlePrev}
      />
    )}
    {activeIndex === 2 && (
      <Confirmacion
        datos={datos} onAnterior={handlePrev}
        onSubmit={handleSubmit}
      />
    )}
  </div>
);
};

export default Creacion;

