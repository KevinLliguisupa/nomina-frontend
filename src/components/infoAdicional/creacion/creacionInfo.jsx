import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { InputSwitch } from 'primereact/inputswitch';
import { SelectButton } from 'primereact/selectbutton';
import { InputMask } from 'primereact/inputmask';
import { InputNumber } from 'primereact/inputnumber';


const CreacionInformacion = () => {

    const url = "http://localhost:4000/nominaweb/api/v1/empleado";

    const [emp_cedula, setEmp_cedula] = useState('');
    const [inf_historial_laboral, setInf_historial_laboral] = useState('');
    const [inf_experiencia, setInf_experiencia] = useState('');
    const [inf_referencias_laborales, setInf_referencias_laborales] = useState('');
    const [inf_certantecedentes, setInf_certantecedentes] = useState('');
    const [inf_certmedico_msp, setInf_certmedico_msp] = useState('');
    const [inf_certpsicologico, setInf_certpsicologico] = useState('');
    const [inf_cargas_familiares, setInf_cargas_familiares] = useState('');
    const [inf_iees_salida, setInf_iees_salida] = useState('');
    const [inf_poliza, setInf_poliza] = useState('');
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


    const crearInformacion = () => {
        console.log(emp_cedula)
        console.log(inf_copia_cedula)
        console.log(inf_copia_papeleta)
        console.log(inf_foto)
        console.log(inf_canet_covid)
        console.log(inf_libreta_militar)
        console.log(inf_historial_laboral)
        console.log(inf_experiencia)
        console.log(inf_certificados_laborales)
        console.log(inf_referencias_laborales)
        console.log(inf_certantecedentes)
        console.log(inf_certmedico_msp)
        console.log(inf_certpsicologico)
        console.log(inf_iess_entrada)
        console.log(inf_cargas_familiares)
        console.log(inf_mrl)
        console.log(inf_hoja_datos)
        console.log(inf_hoja_vida)
        console.log(inf_afi)
        console.log(inf_sicosep)
        console.log(inf_iees_salida)
        console.log(inf_poliza)
        console.log(inf_acta_finiquito)
        var nuevaInfo = {
            emp_cedula: emp_cedula,
            inf_copia_cedula: inf_copia_cedula,
            inf_copia_papeleta: inf_copia_papeleta,
            inf_foto: inf_foto,
            inf_canet_covid: inf_canet_covid,
            inf_libreta_militar: inf_libreta_militar,
            inf_historial_laboral: inf_historial_laboral,
            inf_experiencia: inf_experiencia,
            inf_certificados_laborales: inf_certificados_laborales,
            inf_referencias_laborales: inf_referencias_laborales,
            inf_certantecedentes: inf_certantecedentes,
            inf_certmedico_msp: inf_certmedico_msp,
            inf_certpsicologico: inf_certpsicologico,
            inf_iess_entrada: inf_iess_entrada,
            inf_cargas_familiares: inf_cargas_familiares,
            inf_mrl: inf_mrl,
            inf_hoja_datos: inf_hoja_datos,
            inf_hoja_vida: inf_hoja_vida,
            inf_afi: inf_afi,
            inf_sicosep: inf_sicosep,
            inf_iees_salida: inf_iees_salida,
            inf_poliza: inf_poliza,
            inf_acta_finiquito: inf_acta_finiquito,
        }
        console.log(nuevaInfo)


    }

    return (
        <div className="card inputs">
            {/* <label htmlFor="cedula">Número de cédula</label>
            <InputText id="cedula"
                value={emp_cedula} onChange={(e) => setEmp_cedula(e.target.value)} /> */}

            <label htmlFor="historialLaboral">Historial laboral</label>
            <InputMask id="historialLaboral" mask="99/99/9999" value={inf_historial_laboral} placeholder="99/99/9999" slotChar="mm/dd/yyyy"
                onChange={(e) => setInf_historial_laboral(e.value)}></InputMask>


            <label htmlFor="experiencia">Experiencia laboral </label>
            <InputText id="experiencia"
                value={inf_experiencia} onChange={(e) => setInf_experiencia(e.target.value)} />

            <label htmlFor="referenciasLaborales">Referencias laborales</label>
            <InputNumber inputId="minmax-buttons" value={inf_referencias_laborales}
                onValueChange={(e) => setInf_referencias_laborales(e.value)} showButtons min={0} max={100} />


            <label htmlFor="certantecedentes">Certificado de antecedentes penales</label>
            <InputMask id="certantecedentes" mask="99/99/9999" value={inf_certantecedentes} placeholder="99/99/9999" slotChar="mm/dd/yyyy"
                onChange={(e) => setInf_certantecedentes(e.value)}></InputMask>

            <label htmlFor="certmedico">Certificado médico (MSP)</label>
            <InputMask id="certmedico" mask="99/99/9999" value={inf_certmedico_msp} placeholder="99/99/9999" slotChar="mm/dd/yyyy"
                onChange={(e) => setInf_certmedico_msp(e.value)}></InputMask>

            <label htmlFor="certpsicologico">Certificado psicológico</label>
            <InputMask id="certpsicologico" mask="99/99/9999" value={inf_certpsicologico} placeholder="99/99/9999" slotChar="mm/dd/yyyy"
                onChange={(e) => setInf_certpsicologico(e.value)}></InputMask>

            <label htmlFor="cargasFamiliares">Número de cargas familiares</label>
            <InputNumber inputId="minmax-buttons" value={inf_cargas_familiares}
                onValueChange={(e) => setInf_cargas_familiares(e.value)} showButtons min={0} max={100} />

            <label htmlFor="ieesSalida">Salida IESS</label>
            <InputMask id="ieesSalida" mask="99/99/9999" value={inf_iees_salida} placeholder="99/99/9999" slotChar="mm/dd/yyyy"
                onChange={(e) => setInf_iees_salida(e.value)}></InputMask>

            <label htmlFor="poliza">Póliza</label>
            <InputMask id="poliza" mask="99/99/9999" value={inf_poliza} placeholder="99/99/9999" slotChar="mm/dd/yyyy"
                onChange={(e) => setInf_poliza(e.value)}></InputMask>



            <label htmlFor="copiaCedula">Copia de cédula</label>
            <InputSwitch id="copiaCedula" checked={inf_copia_cedula} onChange={(e) => setInf_copia_cedula(e.value)} />

            <label htmlFor="copiaPapeleta">Copia de papeleta de votación</label>
            <InputSwitch id="copiaPapeleta" checked={inf_copia_papeleta} onChange={(e) => setInf_copia_papeleta(e.value)} />

            <label htmlFor="foto">Foto</label>
            <InputSwitch id="foto" checked={inf_foto} onChange={(e) => setInf_foto(e.value)} />

            <label htmlFor="canetCovid">Carnet Covid</label>
            <InputSwitch id="canetCovid" checked={inf_canet_covid} onChange={(e) => setInf_canet_covid(e.value)} />

            <label htmlFor="libretaMilitar">Libreta militar</label>
            <InputSwitch id="libretaMilitar" checked={inf_libreta_militar} onChange={(e) => setInf_libreta_militar(e.value)} />



            <label htmlFor="certificadoLaborales">Certificados laborales</label>
            <InputSwitch id="certificadosLaborales" checked={inf_certificados_laborales}
                onChange={(e) => setInf_certificados_laborales(e.value)} />




            <label htmlFor="iessEntrada">Entrada IESS</label>
            <InputSwitch id="iessEntrada" checked={inf_iess_entrada}
                onChange={(e) => setInf_iess_entrada(e.value)} />



            <label htmlFor="mrl">MRL</label>
            <InputSwitch id="mrl" checked={inf_mrl}
                onChange={(e) => setInf_mrl(e.value)} />

            <label htmlFor="hojaDatos">Hoja de datos</label>
            <InputSwitch id="hojaDatos" checked={inf_hoja_datos}
                onChange={(e) => setInf_hoja_datos(e.value)} />

            <label htmlFor="hojaVida">Hoja de vida</label>
            <InputSwitch id="hojaVida" checked={inf_hoja_vida}
                onChange={(e) => setInf_hoja_vida(e.value)} />

            <label htmlFor="afi">AFI</label>
            <InputSwitch id="afi" checked={inf_afi}
                onChange={(e) => setInf_afi(e.value)} />

            <label htmlFor="sicosep">SICOSEP</label>
            <InputSwitch id="sicosep" checked={inf_sicosep}
                onChange={(e) => setInf_sicosep(e.value)} />



            <label htmlFor="actaFiniquito">Acta finiquitó</label>
            <InputSwitch id="actaFiniquito" checked={inf_acta_finiquito}
                onChange={(e) => setInf_acta_finiquito(e.value)} />

            <Button label="Submit" icon="pi pi-check" onClick={crearInformacion} />

        </div>
    )
}

export default CreacionInformacion; 