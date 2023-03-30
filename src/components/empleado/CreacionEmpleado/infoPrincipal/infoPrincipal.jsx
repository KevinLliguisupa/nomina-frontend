import React, { useEffect, useState } from "react";
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { InputSwitch } from 'primereact/inputswitch';
import { SelectButton } from 'primereact/selectbutton';
import axios from "axios";
import { Dropdown } from 'primereact/dropdown';
import ShowCiudad from "../../../Parametros/ciudad/ShowCiudad";
import ShowNivel from "../../../Parametros/nivel/nivel";
import './infoPrincipal.css'

const InfoPrincipal = ({ datos, onSiguiente }) => {

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

    const [emp_cedula, setEmp_cedula] = useState(datos.infoEmpleado.emp_cedula || '');
    const [emp_apellidos, setEmp_apellidos] = useState(datos.infoEmpleado.emp_apellidos || '');
    const [emp_nombres, setEmp_nombres] = useState(datos.infoEmpleado.emp_nombres || '');
    const [emp_celular, setEmp_celular] = useState(datos.infoEmpleado.emp_celular || '');
    const [emp_email, setEmp_email] = useState(datos.infoEmpleado.emp_email || '');
    const [emp_cursos, setEmp_cursos] = useState(datos.infoEmpleado.emp_cursos || '');
    const [emp_direccion, setEmp_direccion] = useState(datos.infoEmpleado.emp_direccion || '');
    const [emp_lugar_nacimiento, setEmp_lugar_nacimiento] = useState(datos.infoEmpleado.emp_lugar_nacimiento || '');
    const [emp_discapacidad, setEmp_discapacidad] = useState(datos.infoEmpleado.emp_discapacidad || false);
    const [emp_sexo, setEmp_sexo] = useState(datos.infoEmpleado.emp_sexo || null);
    const [emp_credencial120, setEmp_credencial120] = useState(datos.infoEmpleado.emp_credencial120 || false);
    const [emp_reentrenado, setEmp_reentrenado] = useState(datos.infoEmpleado.emp_reentrenado || false);
    const [emp_imagen, setEmp_imagen] = useState(datos.infoEmpleado.emp_imagen || '');
    const [niv_id, setNiv_id] = useState(datos.infoEmpleado.niv_id || '');
    const [est_id, setEst_id] = useState(datos.infoEmpleado.est_id || '');
    const [ciu_nacimiento_id, setCiu_nacimiento_id] = useState(datos.infoEmpleado.ciu_nacimiento_id || '');
    const handleSiguiente = () => {
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
            emp_estado: true,
            ciu_nacimiento_id: ciu_nacimiento_id,
            emp_cursos: emp_cursos,
            emp_credencial120: emp_credencial120,
            emp_reentrenado: emp_reentrenado,
            niv_id: niv_id,
            est_id: est_id,
        }
        onSiguiente({ infoEmpleado: nuevoEmpleado });
    };

    useEffect(() => {
        getCiudades();
        getNiveles();
        getEstados();
    }, []);

    const [ciudades, setCiudades] = useState([]);

    const getCiudades = async () => {

        const link = 'http://localhost:4000/nominaweb/api/v1/ciudad';
        const response = await axios.get(link);
        const ciudades = response.data;
        ciudades.map((key) => {
            key.ciu_nombre = key.ciu_nombre + " - " + key.ciu_provincia.pro_nombre;
            return 0;
        });
        setCiudades(ciudades);
    }
    const [niveles, setNiveles] = useState([]);

    const getNiveles = async () => {

        const link = 'http://localhost:4000/nominaweb/api/v1/nivel';
        const response = await axios.get(link);
        const niveles = response.data;
        setNiveles(niveles);
    }


    const [estadosCiv, setEstadosCiv] = useState([]);

    const getEstados = async () => {

        const link = 'http://localhost:4000/nominaweb/api/v1/estado-civil';
        const response = await axios.get(link);
        const estados = response.data;
        setEstadosCiv(estados);
    }

    return (
        <div className="card inputs" >
            <div className="row">
                <div className="col">
                    <div>
                        <label htmlFor="cedula">Número de cédula</label>
                    </div>
                    <InputText id="cedula" keyfilter="pnum" minLength="10" maxLength="10"
                        value={emp_cedula} onChange={(e) => setEmp_cedula(e.target.value)} />
                </div>
                <div className="col">
                    <div>
                        <label htmlFor="apellidos">Apellidos</label>
                    </div>
                    <InputText id="apellidos" value={emp_apellidos}
                        onChange={(e) => setEmp_apellidos(e.target.value)} />
                </div>
                <div className="col">
                    <div>
                        <label htmlFor="nombres">Nombres</label>
                    </div>
                    <InputText id="nombres" value={emp_nombres} 
                        onChange={(e) => setEmp_nombres(e.target.value)} />
                </div>
            </div>

            <div className="row">
                <div className="col">
                    <div>
                        <label htmlFor="celular">Celular</label>
                    </div>
                    <InputText id="celular" keyfilter="pnum" minLength="10" maxLength="10"
                        value={emp_celular} onChange={(e) => setEmp_celular(e.target.value)} />
                </div>
                <div className="col">
                    <div>
                        <label htmlFor="email">Correo electrónico</label>
                    </div>
                    <InputText id="email" value={emp_email}
                        onChange={(e) => setEmp_email(e.target.value)} />
                </div>
                <div className="col">
                    <div>
                        <label htmlFor="direccion">Dirección</label>
                    </div>
                    <InputText id="direccion" value={emp_direccion} 
                        onChange={(e) => setEmp_direccion(e.target.value)} />
                </div>
            </div>

            <div className="row">
                <div className="col">
                    <div>
                        <label htmlFor="ciu_nacimiento_id">Ciudad de nacimiento</label>
                    </div>
                    {/* optionValue="ciu_id" */}
                    <Dropdown value={ciu_nacimiento_id} options={ciudades} onChange={(e) => setCiu_nacimiento_id(e.target.value)}
                        optionLabel="ciu_nombre" filter placeholder="Ciudad de nacimiento" />
                </div>
                <div className="col">
                    <div>
                        <label htmlFor="lugarNacimiento">Lugar de nacimiento</label>
                    </div>
                    <InputText id="lugarNacimiento" aria-describedby="lugarNacimiento-help"
                        value={emp_lugar_nacimiento} onChange={(e) => setEmp_lugar_nacimiento(e.target.value)} />
                </div>
                <div className="col">
                    <div>
                        <label htmlFor="sexo">Sexo</label>
                    </div>
                    <SelectButton value={emp_sexo} options={sexoOpciones} onChange={(e) => setEmp_sexo(e.value)}></SelectButton>
                </div>
            </div>

            <div className="row">
                <div className="col">
                    <div>
                        <label htmlFor="estado">Estado civil</label>
                    </div>
                    {/* optionValue="est_id"  */}
                    <Dropdown value={est_id} options={estadosCiv} onChange={(e) => setEst_id(e.target.value)}
                        optionLabel="est_descipcion" filter placeholder="Estado civil" />

                </div>
                <div className="col">
                    <div>
                        <label htmlFor="nivel">Nivel de instrucción</label>
                    </div>
                    {/* optionValue="niv_id"  */}
                    <Dropdown value={niv_id} options={niveles} onChange={(e) => setNiv_id(e.target.value)}
                        optionLabel="niv_descripcion" filter placeholder="Nivel de estudios" />
                </div>
                <div className="col">

                </div>
            </div>
            <br />
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
            <InputTextarea id="cursos" aria-describedby="cursos-help" rows={4} cols={120}
                value={emp_cursos} onChange={(e) => setEmp_cursos(e.target.value)} />
            <br />
            <div className="d-flex justify-content-end">
                <Button label="Siguiente" icon="pi pi-check" onClick={handleSiguiente} />
            </div>
        </div>
    );
}

export default InfoPrincipal; 