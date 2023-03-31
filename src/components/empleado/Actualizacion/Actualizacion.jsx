import React, { useState, useRef, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { InputSwitch } from 'primereact/inputswitch';
import { SelectButton } from 'primereact/selectbutton';
import { Button } from 'primereact/button';
import { InputMask } from 'primereact/inputmask';
import { InputNumber } from 'primereact/inputnumber';
import { useParams } from 'react-router-dom';
import axios from "axios";
import { Calendar } from 'primereact/calendar';

import { Dropdown } from 'primereact/dropdown';
import { classNames } from 'primereact/utils';
import NivelService from '../../../services/nivelService';
import CiudadService from '../../../services/ciudadService';
import EstadoCivilService from '../../../services/estadoCivilService';
import EmpleadoService from '../../../services/empleadoService';
import InfoAdicionalService from '../../../services/infoAdicionalService';
import TituloService from '../../../services/tituloService';

const ActualizacionEmpleado = (props) => {

    useEffect(() => {
        getInfoEmpleado();
        getCiudades();
        getNiveles();
        getEstados();
        getTitulos();
    }, []);

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

    const getInfoEmpleado = async () => {

        const dataEmpleado = await EmpleadoService.getEmpleadoByCedula(cedula)
        const dataAdicional = await InfoAdicionalService.getInformacionByCedula(cedula)

        setEmp_cedula(dataEmpleado.data.emp_cedula)
        setEmp_apellidos(dataEmpleado.data.emp_apellidos)
        setEmp_nombres(dataEmpleado.data.emp_nombres)
        setEmp_celular(dataEmpleado.data.emp_celular)
        setEmp_email(dataEmpleado.data.emp_email)
        setEmp_cursos(dataEmpleado.data.emp_cursos)
        setEmp_direccion(dataEmpleado.data.emp_direccion)
        setEmp_lugar_nacimiento(dataEmpleado.data.emp_lugar_nacimiento)
        setEmp_discapacidad(dataEmpleado.data.emp_discapacidad)
        setEmp_sexo(dataEmpleado.data.emp_sexo)
        setEmp_credencial120(dataEmpleado.data.emp_credencial120)
        setEmp_reentrenado(dataEmpleado.data.emp_reentrenado)
        // setEmp_imagen(dataEmpleado.data.emp_imagen)
        // setEmp_estado(dataEmpleado.data.emp_estado)
        setNiv_id(dataEmpleado.data.emp_nivel.niv_id)
        setEst_id(dataEmpleado.data.emp_estadoCivil.est_id)
        setCiu_nacimiento_id(dataEmpleado.data.emp_ciudadNacimiento.ciu_id)

        setInf_historial_laboral(dataAdicional.data.inf_historial_laboral)
        setInf_experiencia(dataAdicional.data.inf_experiencia)
        setInf_referencias_laborales(dataAdicional.data.inf_referencias_laborales)
        setInf_certantecedentes(dataAdicional.data.inf_certantecedentes)
        setInf_certmedico_msp(dataAdicional.data.inf_certmedico_msp)
        setInf_certpsicologico(dataAdicional.data.inf_certpsicologico)
        setInf_cargas_familiares(dataAdicional.data.inf_cargas_familiares)
        setInf_iees_salida(dataAdicional.data.inf_iees_salida)
        setInf_poliza(dataAdicional.data.inf_poliza)
        setInf_copia_cedula(dataAdicional.data.inf_copia_cedula)
        setInf_copia_papeleta(dataAdicional.data.inf_copia_papeleta)
        setInf_foto(dataAdicional.data.inf_foto)
        setInf_canet_covid(dataAdicional.data.inf_canet_covid)
        setInf_libreta_militar(dataAdicional.data.inf_libreta_militar)
        setInf_certificados_laborales(dataAdicional.data.inf_certificados_laborales)
        setInf_iess_entrada(dataAdicional.data.inf_iess_entrada)
        setInf_mrl(dataAdicional.data.inf_mrl)
        setInf_hoja_datos(dataAdicional.data.inf_hoja_datos)
        setInf_hoja_vida(dataAdicional.data.inf_hoja_vida)
        setInf_afi(dataAdicional.data.inf_afi)
        setInf_sicosep(dataAdicional.data.inf_sicosep)
        setInf_acta_finiquito(dataAdicional.data.inf_acta_finiquito)

        setInfoEmpleado(dataEmpleado.data)
        setInfoAdicional(dataAdicional.data)
        console.log(dataEmpleado.data)
        console.log(dataAdicional.data)
    }

    const actualizar = async () => {
        var empleadoActualizado = {
            emp_cedula: emp_cedula,
            emp_apellidos: emp_apellidos,
            emp_nombres: emp_nombres,
            emp_celular: emp_celular,
            emp_email: emp_email,
            emp_direccion: emp_direccion,
            emp_lugar_nacimiento: emp_lugar_nacimiento,
            emp_discapacidad: emp_discapacidad,
            emp_sexo: emp_sexo,
            emp_estado: true,
            ciu_nacimiento_id: ciu_nacimiento_id,
            emp_cursos: emp_cursos,
            emp_credencial120: emp_credencial120,
            emp_reentrenado: emp_reentrenado,
            niv_id: niv_id,
            est_id: est_id,
        }

        console.log(empleadoActualizado)
        console.log(infoAdicional)
        
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
            <div className="row fila">
                <div className="col">
                    <div>
                        <label htmlFor="cedula">Número de cédula</label>
                    </div>
                    <InputText id="cedula" keyfilter="pnum" minLength="10" maxLength="10" required
                        value={emp_cedula} onChange={(e) => setEmp_cedula(e.target.value)} autoFocus
                        className={classNames("input-text", { 'p-invalid': submitted && !emp_cedula })} />
                    <div>
                        {submitted && !emp_cedula && <small className="p-error">Campo obligatorio.</small>}
                    </div>
                </div>
                <div className="col">
                    <div>
                        <label htmlFor="apellidos">Apellidos</label>
                    </div>
                    <InputText id="apellidos" value={emp_apellidos}
                        onChange={(e) => setEmp_apellidos(e.target.value)} autoFocus required
                        className={classNames("input-text", { 'p-invalid': submitted && !emp_apellidos })} />
                    <div>
                        {submitted && !emp_apellidos && <small className="p-error">Campo obligatorio.</small>}
                    </div>
                </div>
                <div className="col">
                    <div>
                        <label htmlFor="nombres">Nombres</label>
                    </div>
                    <InputText id="nombres" value={emp_nombres}
                        onChange={(e) => setEmp_nombres(e.target.value)} autoFocus required
                        className={classNames("input-text", { 'p-invalid': submitted && !emp_nombres })} />
                    <div>
                        {submitted && !emp_nombres && <small className="p-error">Campo obligatorio.</small>}
                    </div>
                </div>
            </div>

            <div className="row fila">
                <div className="col">
                    <div>
                        <label htmlFor="celular">Celular</label>
                    </div>
                    <InputText className="input-text" id="celular" keyfilter="pnum" minLength="10" maxLength="10"
                        value={emp_celular} onChange={(e) => setEmp_celular(e.target.value)} />
                </div>
                <div className="col">
                    <div>
                        <label htmlFor="email">Correo electrónico</label>
                    </div>
                    <InputText className="input-text" id="email" value={emp_email}
                        onChange={(e) => setEmp_email(e.target.value)} />
                </div>
                <div className="col">
                    <div>
                        <label htmlFor="direccion">Dirección</label>
                    </div>
                    <InputText className="input-text" id="direccion" value={emp_direccion}
                        onChange={(e) => setEmp_direccion(e.target.value)} />
                </div>
            </div>

            <div className="row fila">
                <div className="col">
                    <div>
                        <label htmlFor="ciu_nacimiento_id">Ciudad de nacimiento</label>
                    </div>
                    <Dropdown value={ciu_nacimiento_id} options={ciudades} onChange={(e) => setCiu_nacimiento_id(e.target.value)}
                        optionLabel="ciu_nombre" filter placeholder="Ciudad de nacimiento" required optionValue="ciu_id"
                        className={classNames("input-text", { 'p-invalid': submitted && !ciu_nacimiento_id })} />
                    <div>
                        {submitted && !ciu_nacimiento_id && <small className="p-error">Campo obligatorio.</small>}
                    </div>
                </div>
                <div className="col">
                    <div>
                        <label htmlFor="lugarNacimiento">Lugar de nacimiento</label>
                    </div>
                    <InputText className="input-text" id="lugarNacimiento" aria-describedby="lugarNacimiento-help"
                        value={emp_lugar_nacimiento} onChange={(e) => setEmp_lugar_nacimiento(e.target.value)} />
                </div>
                <div className="col">
                    <div>
                        <label htmlFor="sexo">Sexo</label>
                    </div>
                    <SelectButton value={emp_sexo} options={sexoOpciones}
                        onChange={(e) => setEmp_sexo(e.value)} />
                </div>
            </div>

            <div className="row fila">
                <div className="col">
                    <div>
                        <label htmlFor="estado">Estado civil</label>
                    </div>
                    <Dropdown value={est_id} options={estadosCiv} onChange={(e) => setEst_id(e.target.value)}
                        optionLabel="est_descipcion" filter placeholder="Estado civil" required optionValue="est_id"
                        className={classNames("input-text", { 'p-invalid': submitted && !est_id })} />
                    <div>
                        {submitted && !est_id && <small className="p-error">Campo obligatorio.</small>}
                    </div>
                </div>
                <div className="col">
                    <div>
                        <label htmlFor="nivel">Nivel de instrucción</label>
                    </div>
                    <Dropdown value={niv_id} options={niveles} onChange={(e) => setNiv_id(e.target.value)}
                        optionLabel="niv_descripcion" filter placeholder="Nivel de estudios" required optionValue="niv_id"
                        className={classNames("input-text", { 'p-invalid': submitted && !niv_id })} />
                    <div>
                        {submitted && !niv_id && <small className="p-error">Campo obligatorio.</small>}
                    </div>
                </div>
                <div className="col">
                </div>
            </div>

            <div className="row">
                <div className="col">
                    <div>
                        <label htmlFor="discapacidad">Discapacidad</label>
                    </div>
                    <InputSwitch checked={emp_discapacidad} onChange={(e) => setEmp_discapacidad(e.value)} />
                </div>
                <div className="col">
                    <div>
                        <label htmlFor="credencial120">Credencial 120 horas</label>
                    </div>
                    <InputSwitch checked={emp_credencial120} onChange={(e) => setEmp_credencial120(e.value)} />
                </div>
                <div className="col">
                    <div>
                        <label htmlFor="reentrenado">Reentrenado</label>
                    </div>
                    <InputSwitch checked={emp_reentrenado} onChange={(e) => setEmp_reentrenado(e.value)} />
                </div>
            </div>
            <br />

            <div>
                <label htmlFor="cursos">Cursos</label>
            </div>
            <InputTextarea id="cursos" aria-describedby="cursos-help" rows={3}
                value={emp_cursos} onChange={(e) => setEmp_cursos(e.target.value)} />
            <br />

            <div className="row fila">
                <div className="col">
                    <div>
                        <label htmlFor="historialLaboral">Historial laboral</label>
                    </div>
                    <InputMask className="input-text" id="historialLaboral" mask="9999/99/99" value={inf_historial_laboral}
                        placeholder="yyyy/mm/dd" slotChar="yyyy/mm/dd" onChange={(e) => setInf_historial_laboral(e.value)} />
                </div>
                <div className="col">
                    <div>
                        <label htmlFor="ieesSalida">Salida IESS</label>
                    </div>
                    <InputMask className="input-text" id="ieesSalida" mask="9999/99/99" value={inf_iees_salida}
                        placeholder="yyyy/mm/dd" slotChar="yyyy/mm/dd" onChange={(e) => setInf_iees_salida(e.value)} />
                </div>
                <div className="col">
                    <div>
                        <label htmlFor="poliza">Póliza</label>
                    </div>
                    <InputMask className="input-text" id="poliza" mask="9999/99/99" value={inf_poliza}
                        placeholder="yyyy/mm/dd" slotChar="yyyy/mm/dd" onChange={(e) => setInf_poliza(e.value)} />
                </div>
            </div>

            <div className="row fila">
                <div className="col">
                    <div>
                        <label htmlFor="certantecedentes">Certificado de antecedentes penales</label>
                    </div>
                    <InputMask className="input-text" id="certantecedentes" mask="9999/99/99" value={inf_certantecedentes}
                        placeholder="yyyy/mm/dd" slotChar="yyyy/mm/dd" onChange={(e) => setInf_certantecedentes(e.value)} />
                </div>
                <div className="col">
                    <div>
                        <label htmlFor="certmedico">Certificado médico (MSP)</label>
                    </div>
                    <InputMask className="input-text" id="certmedico" mask="9999/99/99" value={inf_certmedico_msp}
                        placeholder="yyyy/mm/dd" slotChar="yyyy/mm/dd" onChange={(e) => setInf_certmedico_msp(e.value)} />
                </div>
                <div className="col">
                    <div>
                        <label htmlFor="certpsicologico">Certificado psicológico</label>
                    </div>
                    <InputMask className="input-text" id="certpsicologico" mask="9999/99/99" value={inf_certpsicologico}
                        placeholder="yyyy/mm/dd" slotChar="yyyy/mm/dd" onChange={(e) => setInf_certpsicologico(e.value)} />
                </div>
            </div>

            <div className="row fila">
                <div className="col">
                    <div>
                        <label htmlFor="experiencia">Experiencia laboral </label>
                    </div>
                    <InputText className="input-text" id="experiencia" value={inf_experiencia}
                        onChange={(e) => setInf_experiencia(e.target.value)} />
                </div>
                <div className="col" >
                    <div>
                        <label htmlFor="referenciasLaborales">Referencias laborales</label>
                    </div>
                    <InputNumber inputId="minmax-buttons" value={inf_referencias_laborales}
                        onValueChange={(e) => setInf_referencias_laborales(e.value)} showButtons min={0} max={100} />
                </div>
                <div className="col">
                    <div>
                        <label htmlFor="cargasFamiliares">Número de cargas familiares</label>
                    </div>
                    <InputNumber inputId="minmax-buttons" value={inf_cargas_familiares}
                        onValueChange={(e) => setInf_cargas_familiares(e.value)} showButtons min={0} max={100} />
                </div>
            </div>
            <br />

            <div className="row fila">
                <div className="col">
                    <div>
                        <label htmlFor="copiaCedula">Copia de cédula</label>
                    </div>
                    <InputSwitch id="copiaCedula" checked={inf_copia_cedula} onChange={(e) => setInf_copia_cedula(e.value)} />
                </div>
                <div className="col">
                    <div>
                        <label htmlFor="copiaPapeleta">Copia de papeleta votación</label>
                    </div>
                    <InputSwitch id="copiaPapeleta" checked={inf_copia_papeleta} onChange={(e) => setInf_copia_papeleta(e.value)} />
                </div>
                <div className="col">
                    <div>
                        <label htmlFor="canetCovid">Carnet Covid</label>
                    </div>
                    <InputSwitch id="canetCovid" checked={inf_canet_covid} onChange={(e) => setInf_canet_covid(e.value)} />
                </div>
                <div className="col">
                    <div>
                        <label htmlFor="libretaMilitar">Libreta militar</label>
                    </div>
                    <InputSwitch id="libretaMilitar" checked={inf_libreta_militar} onChange={(e) => setInf_libreta_militar(e.value)} />
                </div>
            </div>

            <div className="row fila">
                <div className="col">
                    <div>
                        <label htmlFor="certificadoLaborales">Certificados laborales</label>
                    </div>
                    <InputSwitch id="certificadosLaborales" checked={inf_certificados_laborales}
                        onChange={(e) => setInf_certificados_laborales(e.value)} />
                </div>
                <div className="col">
                    <div>
                        <label htmlFor="iessEntrada">Entrada IESS</label>
                    </div>
                    <InputSwitch id="iessEntrada" checked={inf_iess_entrada}
                        onChange={(e) => setInf_iess_entrada(e.value)} />
                </div>
                <div className="col">
                    <div>
                        <label htmlFor="mrl">MRL</label>
                    </div>
                    <InputSwitch id="mrl" checked={inf_mrl}
                        onChange={(e) => setInf_mrl(e.value)} />
                </div>
                <div className="col">
                    <div>
                        <label htmlFor="hojaDatos">Hoja de datos</label>
                    </div>
                    <InputSwitch id="hojaDatos" checked={inf_hoja_datos}
                        onChange={(e) => setInf_hoja_datos(e.value)} />
                </div>
            </div>

            <div className="row fila">
                <div className="col">
                    <div>
                        <label htmlFor="afi">AFI</label>
                    </div>
                    <InputSwitch id="afi" checked={inf_afi}
                        onChange={(e) => setInf_afi(e.value)} />
                </div>
                <div className="col">
                    <div>
                        <label htmlFor="sicosep">SICOSEP</label>
                    </div>
                    <InputSwitch id="sicosep" checked={inf_sicosep}
                        onChange={(e) => setInf_sicosep(e.value)} />
                </div>
                <div className="col">
                    <div>
                        <label htmlFor="actaFiniquito">Acta finiquitó</label>
                    </div>
                    <InputSwitch id="actaFiniquito" checked={inf_acta_finiquito}
                        onChange={(e) => setInf_acta_finiquito(e.value)} />
                </div>
                <div className="col">
                    <div>
                        <label htmlFor="hojaVida">Hoja de vida</label>
                    </div>
                    <InputSwitch id="hojaVida" checked={inf_hoja_vida}
                        onChange={(e) => setInf_hoja_vida(e.value)} />
                </div>
            </div>


        </div>
    );
};

export default ActualizacionEmpleado;