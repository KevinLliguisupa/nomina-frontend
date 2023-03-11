import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

import { Steps } from 'primereact/steps'
import { Toast } from 'primereact/toast';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { InputSwitch } from 'primereact/inputswitch';
import { SelectButton } from 'primereact/selectbutton';

import './creacionEmpleado.css'

const CreacionEmpleado = () => {

    const url = "http://localhost:4000/nominaweb/api/v1/empleado";

    const estadosCiviles = [
        {
            est_id: 1,
            est_descipcion: "Soltero/a"
        },
        {
            est_id: 2,
            est_descipcion: "Casado/a"
        },
        {
            est_id: 3,
            est_descipcion: "Divorciado/a"
        },
        {
            est_id: 4,
            est_descipcion: "Union libre"
        },
        {
            est_id: 5,
            est_descipcion: "Viudo/a"
        }]

    const sexoOpciones = ["Masculino", "Femenino"]

    const [emp_cedula, setEmp_cedula] = useState('');
    const [emp_apellidos, setEmp_apellidos] = useState('');
    const [emp_nombres, setEmp_nombres] = useState('');
    const [emp_celular, setEmp_celular] = useState('');
    const [emp_email, setEmp_email] = useState('');
    const [emp_cursos, setEmp_cursos] = useState('');
    const [emp_direccion, setEmp_direccion] = useState('');
    const [emp_lugar_nacimiento, setEmp_lugar_nacimiento] = useState('');
    const [emp_discapacidad, setEmp_discapacidad] = useState('');
    const [emp_sexo, setEmp_sexo] = useState('');
    const [emp_credencial120, setEmp_credencial120] = useState('');
    const [emp_reentrenado, setEmp_reentrenado] = useState('');
    const [emp_imagen, setEmp_imagen] = useState('');
    const [emp_estado, setEmp_estado] = useState('');
    const [niv_id, setNiv_id] = useState('');
    const [est_id, setEst_id] = useState('');
    const [ciu_nacimiento_id, setCiu_nacimiento_id] = useState('');

    const crearEmpleado = () => {
        // console.log(emp_cedula)
        // console.log(emp_apellidos)
        // console.log(emp_nombres)
        // console.log(emp_celular)
        // console.log(emp_email)
        // console.log(emp_direccion)
        // console.log(est_id)
        // console.log(ciu_nacimiento_id)
        // console.log(emp_lugar_nacimiento)
        // console.log(emp_discapacidad)
        // console.log(emp_sexo)
        // console.log(niv_id)
        // console.log(emp_credencial120)
        // console.log(emp_reentrenado)
        // console.log(emp_cursos)
        // console.log(emp_estado)

        var nuevoEmpleado = {
            emp_cedula: emp_cedula,
            emp_apellidos: emp_apellidos,
            emp_nombres: emp_nombres,
            emp_celular: emp_celular,
            emp_email: emp_email,
            emp_direccion: emp_direccion,
            emp_lugar_nacimiento: emp_lugar_nacimiento,
            emp_discapacidad: emp_discapacidad,
            emp_sexo: emp_sexo,
            emp_estado: 'true',
            ciu_nacimiento_id: ciu_nacimiento_id,
            emp_cursos: emp_cursos,
            emp_credencial120: emp_credencial120,
            emp_reentrenado: emp_reentrenado,
            niv_id: niv_id,
            est_id: est_id,
        }
        // console.log(nuevoEmpleado)
        axios.post(url, nuevoEmpleado)
    }

    return (
        <div className="card flex justify-content-center flex-column gap-2 inputs">

            <label htmlFor="cedula">Número de cédula</label>
            <InputText id="cedula"
                value={emp_cedula} onChange={(e) => setEmp_cedula(e.target.value)} />

            <label htmlFor="apellidos">Apellidos</label>
            <InputText id="apellidos"
                value={emp_apellidos} onChange={(e) => setEmp_apellidos(e.target.value)} />

            <label htmlFor="nombres">Nombres</label>
            <InputText id="nombres"
                value={emp_nombres} onChange={(e) => setEmp_nombres(e.target.value)} />

            <label htmlFor="celular">Celular</label>
            <InputText id="celular"
                value={emp_celular} onChange={(e) => setEmp_celular(e.target.value)} />

            <label htmlFor="email">Correo electrónico</label>
            <InputText id="email"
                value={emp_email} onChange={(e) => setEmp_email(e.target.value)} />

            <label htmlFor="direccion">Dirección</label>
            <InputText id="direccion"
                value={emp_direccion} onChange={(e) => setEmp_direccion(e.target.value)} />

            <label htmlFor="estado">Estado civil</label>

            {estadosCiviles.map((estadoCivil) => (
                <div className="field-radiobutton">
                    {/* <RadioButton inputId="estadoCivil" key={estadoCivil.est_id} value={estadoCivil.est_id} /> */}

                    <RadioButton inputId={estadoCivil.est_id} value={estadoCivil.est_id} onChange={(e) => setEst_id(e.value)} 
                    />

                    {/*                     
                    <label htmlFor="estadoCivil" >
                        </label> */}
                    {estadoCivil.est_descipcion}
                </div>
            ))}

            {/* <InputText id="estado"
                value={est_id} onChange={(e) => setEst_id(e.target.value)} /> */}

            <label htmlFor="ciu_nacimiento_id">Ciudad de nacimiento</label>
            <InputText id="ciu_nacimiento_id" aria-describedby="ciu_nacimiento_id-help"
                value={ciu_nacimiento_id} onChange={(e) => setCiu_nacimiento_id(e.target.value)} />
            <small id="ciu_nacimiento_id-help">
                Enter your username to reset your password.
            </small>

            <label htmlFor="lugarNacimiento">Lugar de nacimiento</label>
            <InputText id="lugarNacimiento" aria-describedby="lugarNacimiento-help"
                value={emp_lugar_nacimiento} onChange={(e) => setEmp_lugar_nacimiento(e.target.value)} />
            <small id="lugarNacimiento-help">
                Enter your username to reset your password.
            </small>

            <label htmlFor="discapacidad">Discapacidad</label>

                <InputSwitch checked={emp_discapacidad} onChange={(e) => setEmp_discapacidad(e.value)} />

            {/* <InputText id="discapacidad" aria-describedby="discapacidad-help"
                value={emp_discapacidad} onChange={(e) => setEmp_discapacidad(e.target.value)} /> */}

            <label htmlFor="sexo">Sexo</label>
            {/* <InputText id="sexo" aria-describedby="sexo-help"
                value={emp_sexo} onChange={(e) => setEmp_sexo(e.target.value)} /> */}
            <SelectButton value={emp_sexo} options={sexoOpciones} onChange={(e) => setEmp_sexo(e.value)}></SelectButton>


            <label htmlFor="nivel">Nivel de instrucción</label>
            <InputText id="nivel" aria-describedby="nivel-help"
                value={niv_id} onChange={(e) => setNiv_id(e.target.value)} />
            <small id="nivel-help">
                Enter your username to reset your password.
            </small>

            <label htmlFor="credencial120">Credencial 120 horas</label>
            {/* <InputText id="credencial120" aria-describedby="credencial120-help"
                value={emp_credencial120} onChange={(e) => setEmp_credencial120(e.target.value)} /> */}
                <InputSwitch checked={emp_credencial120} onChange={(e) => setEmp_credencial120(e.value)} />

            <label htmlFor="reentrenado">Reentrenado</label>
            {/* <InputText id="reentrenado" aria-describedby="reentrenado-help"
                value={emp_reentrenado} onChange={(e) => setEmp_reentrenado(e.target.value)} /> */}
            <InputSwitch checked={emp_reentrenado} onChange={(e) => setEmp_reentrenado(e.value)} />

            <label htmlFor="cursos">Cursos</label>
            <InputTextarea id="cursos" aria-describedby="cursos-help" rows={5} cols={30}
                value={emp_cursos} onChange={(e) => setEmp_cursos(e.target.value)} />
            <small id="cursos-help">
                Enter your username to reset your password.
            </small>

            <Button label="Submit" icon="pi pi-check" onClick={crearEmpleado} />

        </div>
    );

}

export default CreacionEmpleado; 