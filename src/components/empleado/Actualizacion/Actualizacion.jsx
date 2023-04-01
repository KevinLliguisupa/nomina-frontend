import React, { useState, useRef, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { InputSwitch } from 'primereact/inputswitch';
import { SelectButton } from 'primereact/selectbutton';
import { Button } from 'primereact/button';
import { InputMask } from 'primereact/inputmask';
import { InputNumber } from 'primereact/inputnumber';
import { useParams } from 'react-router-dom';

import { Dropdown } from 'primereact/dropdown';
import { classNames } from 'primereact/utils';
import NivelService from '../../../services/nivelService';
import CiudadService from '../../../services/ciudadService';
import EstadoCivilService from '../../../services/estadoCivilService';
import EmpleadoService from '../../../services/empleadoService';
import InfoAdicionalService from '../../../services/infoAdicionalService';
import TituloService from '../../../services/tituloService';
import InfoPrincipal from '../CreacionEmpleado/infoPrincipal/infoPrincipal';
import CreacionInformacion from '../CreacionEmpleado/infoAdicional/infoAdicional';

const ActualizacionEmpleado = (props) => {



    const [infoEmpleado, setInfoEmpleado] = useState({})
    const [infoAdicional, setInfoAdicional] = useState({})

    const { cedula } = useParams();
    const sexoOpciones = ["Masculino", "Femenino"]

    const [emp_cedula, setEmp_cedula] = useState('');
    const [emp_apellidos, setEmp_apellidos] = useState('');
    const [emp_nombres, setEmp_nombres] = useState('');
    const [emp_celular, setEmp_celular] = useState('');
    const [emp_email, setEmp_email] = useState('');
    const [emp_cursos, setEmp_cursos] = useState('');
    const [emp_direccion, setEmp_direccion] = useState('');
    const [emp_lugar_nacimiento, setEmp_lugar_nacimiento] = useState('');
    const [emp_discapacidad, setEmp_discapacidad] = useState(false);
    const [emp_sexo, setEmp_sexo] = useState(null);
    const [emp_credencial120, setEmp_credencial120] = useState(false);
    const [emp_reentrenado, setEmp_reentrenado] = useState(false);
    const [emp_imagen, setEmp_imagen] = useState('');
    const [emp_estado, setEmp_estado] = useState('');
    const [niv_id, setNiv_id] = useState('');
    const [est_id, setEst_id] = useState('');
    const [ciu_nacimiento_id, setCiu_nacimiento_id] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const [inf_historial_laboral, setInf_historial_laboral] = useState();
    const [inf_experiencia, setInf_experiencia] = useState('');
    const [inf_referencias_laborales, setInf_referencias_laborales] = useState(0);
    const [inf_certantecedentes, setInf_certantecedentes] = useState();
    const [inf_certmedico_msp, setInf_certmedico_msp] = useState();
    const [inf_certpsicologico, setInf_certpsicologico] = useState();
    const [inf_cargas_familiares, setInf_cargas_familiares] = useState(0);
    const [inf_iees_salida, setInf_iees_salida] = useState();
    const [inf_poliza, setInf_poliza] = useState();
    const [inf_copia_cedula, setInf_copia_cedula] = useState(false);
    const [inf_copia_papeleta, setInf_copia_papeleta] = useState(false);
    const [inf_foto, setInf_foto] = useState(false);
    const [inf_canet_covid, setInf_canet_covid] = useState(false);
    const [inf_libreta_militar, setInf_libreta_militar] = useState(false);
    const [inf_certificados_laborales, setInf_certificados_laborales] = useState(false);
    const [inf_iess_entrada, setInf_iess_entrada] = useState(false);
    const [inf_mrl, setInf_mrl] = useState(false);
    const [inf_hoja_datos, setInf_hoja_datos] = useState(false);
    const [inf_hoja_vida, setInf_hoja_vida] = useState(false);
    const [inf_afi, setInf_afi] = useState(false);
    const [inf_sicosep, setInf_sicosep] = useState(false);
    const [inf_acta_finiquito, setInf_acta_finiquito] = useState(false);

    const [niveles, setNiveles] = useState([]);
    const [estadosCiv, setEstadosCiv] = useState([]);
    const [ciudades, setCiudades] = useState([]);
    const [titulos, setTitulos] = useState([]);

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

    const getInfoEmpleado = async () => {

        const dataEmpleado = await EmpleadoService.getEmpleadoByCedula(cedula)
        const dataAdicional = await InfoAdicionalService.getInformacionByCedula(cedula)
        const datosFormulario = { infoEmpleado: dataEmpleado.data, infoAdicional: dataAdicional.data }

        setDatos(datosFormulario);
    }

    useEffect(() => {
        getInfoEmpleado()
        getCiudades();
        getNiveles();
        getEstados();
        getTitulos();
    }, []);

    const handleGuardarDatos = (datosFormulario) => {
        setDatos({ ...datos, ...datosFormulario });
      };

    const actualizar = async () => {
        // var empleadoActualizado = {
        //     emp_cedula: emp_cedula,
        //     emp_apellidos: emp_apellidos,
        //     emp_nombres: emp_nombres,
        //     emp_celular: emp_celular,
        //     emp_email: emp_email,
        //     emp_direccion: emp_direccion,
        //     emp_lugar_nacimiento: emp_lugar_nacimiento,
        //     emp_discapacidad: emp_discapacidad,
        //     emp_sexo: emp_sexo,
        //     emp_estado: true,
        //     ciu_nacimiento_id: ciu_nacimiento_id,
        //     emp_cursos: emp_cursos,
        //     emp_credencial120: emp_credencial120,
        //     emp_reentrenado: emp_reentrenado,
        //     niv_id: niv_id,
        //     est_id: est_id,
        // }

        // console.log(empleadoActualizado)
        // console.log(infoAdicional)
        handleGuardarDatos()
        console.log(datos)

    }

    const getCiudades = async () => {
        const response = await CiudadService.getCiudades()
        const ciudadesData = response.data;
        ciudadesData.map((key) => {
            key.ciu_nombre = key.ciu_nombre + " - " + key.ciu_provincia.pro_nombre;
            return 0;
        });
        setCiudades(ciudadesData);
    }

    const getNiveles = async () => {
        const response = await NivelService.getNiveles();
        setNiveles(response.data);
    }

    const getEstados = async () => {
        const response = await EstadoCivilService.getEstados();
        setEstadosCiv(response.data);
    }

    const getTitulos = async () => {
        const response = await TituloService.getTitulos();
        setTitulos(response.data);
    }

    return (
        <div className="card inputs">
            <div>
                <InfoPrincipal datos={datos} key={datos.infoEmpleado.emp_cedula} 
                onSiguiente={handleGuardarDatos}/>
            </div>

            <div>
                <CreacionInformacion datos={datos} key={datos.infoAdicional.emp_cedula}>
                </CreacionInformacion>
            </div>

            <div className="d-flex justify-content-end">
                <Button label="Siguiente" icon="pi pi-check" onClick={actualizar} />
            </div>
        </div>
    );
};

export default ActualizacionEmpleado;