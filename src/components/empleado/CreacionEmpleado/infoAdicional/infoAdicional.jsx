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


const CreacionInformacion = ({ datos, onSiguiente, onAnterior }) => {

    const url = "http://localhost:4000/nominaweb/api/v1/empleado";

    const [emp_cedula, setEmp_cedula] = useState(datos.infoEmpleado.emp_cedula || '');
    const [inf_historial_laboral, setInf_historial_laboral] = useState(datos.infoAdicional.inf_historial_laboral || '');
    const [inf_experiencia, setInf_experiencia] = useState(datos.infoAdicional.inf_experiencia || '');
    const [inf_referencias_laborales, setInf_referencias_laborales] = useState(datos.infoAdicional.inf_referencias_laborales || 0);
    const [inf_certantecedentes, setInf_certantecedentes] = useState(datos.infoAdicional.inf_certantecedentes || '');
    const [inf_certmedico_msp, setInf_certmedico_msp] = useState(datos.infoAdicional.inf_certmedico_msp || '');
    const [inf_certpsicologico, setInf_certpsicologico] = useState(datos.infoAdicional.inf_certpsicologico || '');
    const [inf_cargas_familiares, setInf_cargas_familiares] = useState(datos.infoAdicional.inf_cargas_familiares || 0);
    const [inf_iees_salida, setInf_iees_salida] = useState(datos.infoAdicional.inf_iees_salida || '');
    const [inf_poliza, setInf_poliza] = useState(datos.infoAdicional.inf_poliza || '');
    const [inf_copia_cedula, setInf_copia_cedula] = useState(datos.infoAdicional.inf_copia_cedula || false);
    const [inf_copia_papeleta, setInf_copia_papeleta] = useState(datos.infoAdicional.inf_copia_papeleta || false);
    const [inf_foto, setInf_foto] = useState(datos.infoAdicional.inf_foto || false);
    const [inf_canet_covid, setInf_canet_covid] = useState(datos.infoAdicional.inf_canet_covid || false);
    const [inf_libreta_militar, setInf_libreta_militar] = useState(datos.infoAdicional.inf_libreta_militar || false);
    const [inf_certificados_laborales, setInf_certificados_laborales] = useState(datos.infoAdicional.inf_certificados_laborales || false);
    const [inf_iess_entrada, setInf_iess_entrada] = useState(datos.infoAdicional.inf_iess_entrada || false);
    const [inf_mrl, setInf_mrl] = useState(datos.infoAdicional.inf_mrl || false);
    const [inf_hoja_datos, setInf_hoja_datos] = useState(datos.infoAdicional.inf_hoja_datos || false);
    const [inf_hoja_vida, setInf_hoja_vida] = useState(datos.infoAdicional.inf_hoja_vida || false);
    const [inf_afi, setInf_afi] = useState(datos.infoAdicional.inf_afi || false);
    const [inf_sicosep, setInf_sicosep] = useState(datos.infoAdicional.inf_sicosep || false);
    const [inf_acta_finiquito, setInf_acta_finiquito] = useState(datos.infoAdicional.inf_acta_finiquito || false);

    const crearInformacion = () => {
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

    const handleSiguiente = () => {
        var infoAdicional = {
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
        onSiguiente({ infoAdicional: infoAdicional });
    };


    return (
        <div className="card inputs">


            <div class="row">
                <div class="col">
                    <div>
                        <label htmlFor="historialLaboral">Historial laboral</label>
                    </div>
                    <InputMask id="historialLaboral" mask="99/99/9999" value={inf_historial_laboral} placeholder="99/99/9999" slotChar="mm/dd/yyyy"
                        onChange={(e) => setInf_historial_laboral(e.value)}></InputMask>
                </div>

                <div class="col">
                    <div>
                        <label htmlFor="experiencia">Experiencia laboral </label>
                    </div>
                    <InputText id="experiencia"
                        value={inf_experiencia} onChange={(e) => setInf_experiencia(e.target.value)} />
                </div>

                <div class="col">
                    <div>
                        <label htmlFor="referenciasLaborales">Referencias laborales</label>
                    </div>
                    <InputNumber inputId="minmax-buttons" value={inf_referencias_laborales}
                        onValueChange={(e) => setInf_referencias_laborales(e.value)} showButtons min={0} max={100} />
                </div>
            </div>

            <div class="row">
                <div class="col">
                    <div>
                        <label htmlFor="certantecedentes">Certificado de antecedentes penales</label>
                    </div>
                    <InputMask id="certantecedentes" mask="99/99/9999" value={inf_certantecedentes} placeholder="99/99/9999" slotChar="mm/dd/yyyy"
                        onChange={(e) => setInf_certantecedentes(e.value)}></InputMask>
                </div>

                <div class="col">
                    <div>
                        <label htmlFor="certmedico">Certificado médico (MSP)</label>
                    </div>
                    <InputMask id="certmedico" mask="99/99/9999" value={inf_certmedico_msp} placeholder="99/99/9999" slotChar="mm/dd/yyyy"
                        onChange={(e) => setInf_certmedico_msp(e.value)}></InputMask>

                </div>

                <div class="col">
                    <div>
                        <label htmlFor="certpsicologico">Certificado psicológico</label>
                    </div>
                    <InputMask id="certpsicologico" mask="99/99/9999" value={inf_certpsicologico} placeholder="99/99/9999" slotChar="mm/dd/yyyy"
                        onChange={(e) => setInf_certpsicologico(e.value)}></InputMask>
                </div>
            </div>

            <div class="row">
                <div class="col">
                    <div>
                        <label htmlFor="cargasFamiliares">Número de cargas familiares</label>
                    </div>
                    <InputNumber inputId="minmax-buttons" value={inf_cargas_familiares}
                        onValueChange={(e) => setInf_cargas_familiares(e.value)} showButtons min={0} max={100} />
                </div>

                <div class="col">
                    <div>
                        <label htmlFor="ieesSalida">Salida IESS</label>
                    </div>
                    <InputMask id="ieesSalida" mask="99/99/9999" value={inf_iees_salida} placeholder="99/99/9999" slotChar="mm/dd/yyyy"
                        onChange={(e) => setInf_iees_salida(e.value)}></InputMask>
                </div>

                <div class="col">
                    <div>
                        <label htmlFor="poliza">Póliza</label>
                    </div>
                    <InputMask id="poliza" mask="99/99/9999" value={inf_poliza} placeholder="99/99/9999" slotChar="mm/dd/yyyy"
                        onChange={(e) => setInf_poliza(e.value)}></InputMask>
                </div>
            </div>

            <div class="row">
                <div class="col">
                    <div>
                        <label htmlFor="copiaCedula">Copia de cédula</label>
                    </div>
                    <InputSwitch id="copiaCedula" checked={inf_copia_cedula} onChange={(e) => setInf_copia_cedula(e.value)} />
                </div>

                <div class="col">
                    <div>
                        <label htmlFor="copiaPapeleta">Copia de papeleta de votación</label>
                    </div>
                    <InputSwitch id="copiaPapeleta" checked={inf_copia_papeleta} onChange={(e) => setInf_copia_papeleta(e.value)} />
                </div>

                <div class="col">
                    <div>
                        <label htmlFor="foto">Foto</label>
                    </div>
                    <InputSwitch id="foto" checked={inf_foto} onChange={(e) => setInf_foto(e.value)} />
                </div>

                <div class="col">
                    <div>
                        <label htmlFor="canetCovid">Carnet Covid</label>
                    </div>
                    <InputSwitch id="canetCovid" checked={inf_canet_covid} onChange={(e) => setInf_canet_covid(e.value)} />
                </div>

                <div class="col">
                    <div>
                        <label htmlFor="libretaMilitar">Libreta militar</label>
                    </div>
                    <InputSwitch id="libretaMilitar" checked={inf_libreta_militar} onChange={(e) => setInf_libreta_militar(e.value)} />
                </div>
            </div>

            <div class="row">
                <div class="col">
                    <div>
                        <label htmlFor="certificadoLaborales">Certificados laborales</label>
                    </div>
                    <InputSwitch id="certificadosLaborales" checked={inf_certificados_laborales}
                        onChange={(e) => setInf_certificados_laborales(e.value)} />
                </div>

                <div class="col">
                    <div>
                        <label htmlFor="iessEntrada">Entrada IESS</label>
                    </div>
                    <InputSwitch id="iessEntrada" checked={inf_iess_entrada}
                        onChange={(e) => setInf_iess_entrada(e.value)} />
                </div>

                <div class="col">
                    <div>
                        <label htmlFor="mrl">MRL</label>
                    </div>
                    <InputSwitch id="mrl" checked={inf_mrl}
                        onChange={(e) => setInf_mrl(e.value)} />
                </div>

                <div class="col">
                    <div>
                        <label htmlFor="hojaDatos">Hoja de datos</label>
                    </div>
                    <InputSwitch id="hojaDatos" checked={inf_hoja_datos}
                        onChange={(e) => setInf_hoja_datos(e.value)} />
                </div>

                <div class="col">
                    <div>
                        <label htmlFor="hojaVida">Hoja de vida</label>
                    </div>
                    <InputSwitch id="hojaVida" checked={inf_hoja_vida}
                        onChange={(e) => setInf_hoja_vida(e.value)} />
                </div>
            </div>

            <div class="row">
                <div class="col">
                    <div>
                        <label htmlFor="afi">AFI</label>
                    </div>
                    <InputSwitch id="afi" checked={inf_afi}
                        onChange={(e) => setInf_afi(e.value)} />
                </div>

                <div class="col">
                    <div>
                        <label htmlFor="sicosep">SICOSEP</label>
                    </div>
                    <InputSwitch id="sicosep" checked={inf_sicosep}
                        onChange={(e) => setInf_sicosep(e.value)} />
                </div>

                <div class="col">
                    <div>
                        <label htmlFor="actaFiniquito">Acta finiquitó</label>
                    </div>
                    <InputSwitch id="actaFiniquito" checked={inf_acta_finiquito}
                        onChange={(e) => setInf_acta_finiquito(e.value)} />
                </div>

                <div class="col">

                </div>

                <div class="col">

                </div>
            </div>

            {/* <Button label="Submit" icon="pi pi-check" onClick={crearInformacion} /> */}
            <Button label="Anterior" icon="pi pi-angle-left" onClick={onAnterior} />
            <Button label="Siguiente" icon="pi pi-angle-right" onClick={handleSiguiente} />
        </div>
    )
}

export default CreacionInformacion; 