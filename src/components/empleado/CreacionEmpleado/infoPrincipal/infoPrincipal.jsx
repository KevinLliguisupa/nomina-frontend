import React, { useEffect, useState } from "react";
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { InputSwitch } from 'primereact/inputswitch';
import { SelectButton } from 'primereact/selectbutton';
import { Dropdown } from 'primereact/dropdown';
import { Dialog } from 'primereact/dialog';
import { classNames } from 'primereact/utils';
import NivelService from "../../../../services/nivelService";
import TituloService from "../../../../services/tituloService";
import CiudadService from "../../../../services/ciudadService";
import EstadoCivilService from "../../../../services/estadoCivilService";
import './infoPrincipal.css'


const InfoPrincipal = ({ datos, onSiguiente, vista }) => {
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
    const [tit_id, setTit_id] = useState(datos.infoEmpleado.tit_id || '');
    const [ciu_nacimiento_id, setCiu_nacimiento_id] = useState(datos.infoEmpleado.ciu_nacimiento_id || '');
    const [submitted, setSubmitted] = useState(false);
    const [niveles, setNiveles] = useState([]);
    const [titulos, setTitulos] = useState([]);
    const [estadosCiv, setEstadosCiv] = useState([]);
    const [ciudades, setCiudades] = useState([]);
    const [archivo, setArchivo] = useState(null);

    //Modal Crear
    const [dialogcrear, setDialogcrear] = useState(false);

    //Cerrar Modal Crear
    const handleClosecrear = () => setDialogcrear(false);

    //Abrir Modal Crear
    const handleShowcrear = () => setDialogcrear(true);

    const [titulonuevo, setTitulonuevo] = useState({
        tit_nombre: "",
        niv_id: "",
    });

    //Post Cargos
    const PostTitulo = async () => {
        const formData = {
            tit_nombre: titulonuevo.tit_nombre
        };
        await TituloService.postTitulo(formData).then(response => {
            getTitulos();
            setTit_id(response.data.tit_id);
        }).catch(error => {
            console.log(error.message);
        });
        handleClosecrear();
    };

    useEffect(() => {
        getCiudades();
        getNiveles();
        getEstados();
        getTitulos();
    }, []);

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

    const actionsTemplate = () => {
        if (vista === "creacion") {
            return (
                <div className="d-flex justify-content-end">
                    <Button label="Siguiente" icon="pi pi-check" onClick={handleSiguiente} />
                </div>
            )
        }
    };

    const handleSiguiente = () => {
        setSubmitted(true);
        if (emp_cedula !== '' && emp_cedula.length === 10 && emp_apellidos !== '' && emp_nombres !== '' && emp_sexo !== null &&
            niv_id !== '' && est_id !== '' && ciu_nacimiento_id !== '' && tit_id !== '') {
            var nuevoEmpleado = {
                emp_cedula: emp_cedula,
                emp_apellidos: emp_apellidos,
                emp_nombres: emp_nombres,
                emp_celular: emp_celular,
                emp_email: emp_email,
                emp_imagen: null,
                emp_direccion: emp_direccion,
                emp_lugar_nacimiento: emp_lugar_nacimiento,
                emp_discapacidad: emp_discapacidad,
                emp_sexo: emp_sexo,
                emp_estado: true,
                ciu_nacimiento_id: ciu_nacimiento_id,
                emp_cursos: emp_cursos === '' ? "Ninguno" : emp_cursos,
                emp_credencial120: emp_credencial120,
                emp_reentrenado: emp_reentrenado,
                niv_id: niv_id,
                est_id: est_id,
                tit_id: tit_id,
                nivel: niveles.find((nivel) => nivel.niv_id === niv_id),
                titulo: titulos.find((titulo) => titulo.tit_id === tit_id),
                estadoCivil: estadosCiv.find((estado) => estado.est_id === est_id),
                ciudad: ciudades.find((ciudad) => ciudad.ciu_id === ciu_nacimiento_id),
                foto: archivo
            }
            onSiguiente({ infoEmpleado: nuevoEmpleado });
        }
    };

    const handleChange = (event) => {
        setArchivo(event.target.files[0]);
      };

    return (
        <div style={{ paddingLeft: "1rem" }}>
            <div className="row fila">
                <div className="col">
                    <div>
                        <label htmlFor="cedula">Número de cédula</label>
                    </div>
                    <InputText id="cedula" keyfilter="pnum" minLength="10" maxLength="10" required
                        value={emp_cedula} onChange={(e) => setEmp_cedula(e.target.value)} autoFocus
                        className={classNames("input-text", { 'p-invalid': submitted && emp_cedula.length !== 10 })} />
                    <div>
                        {submitted && emp_cedula.length !== 10 && <small className="p-error">Campo incorrecto.</small>}
                    </div>
                </div>
                <div className="col">
                    <div>
                        <label htmlFor="apellidos">Apellidos</label>
                    </div>
                    <InputText id="apellidos" value={emp_apellidos}
                        onChange={(e) => setEmp_apellidos(e.target.value)} required
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
                        onChange={(e) => setEmp_nombres(e.target.value)} required
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
                        optionLabel="ciu_nombre" filter placeholder="Ciudad de nacimiento" required
                        optionValue="ciu_id"
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
                    <SelectButton value={emp_sexo} options={sexoOpciones} onChange={(e) => setEmp_sexo(e.value)} required
                        className={classNames("input-text", { 'p-invalid': submitted && !emp_sexo })} />
                    <div>
                        {submitted && !emp_sexo && <small className="p-error">Campo obligatorio.</small>}
                    </div>
                </div>
            </div>

            <div className="row fila">
                <div className="col">
                    <div>
                        <label htmlFor="estado">Estado civil</label>
                    </div>
                    <Dropdown value={est_id} options={estadosCiv} onChange={(e) => setEst_id(e.target.value)}
                        optionLabel="est_descipcion" filter placeholder="Estado civil" required
                        optionValue="est_id"
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
                        optionLabel="niv_descripcion" filter placeholder="Nivel de estudios" required
                        optionValue="niv_id"
                        className={classNames("input-text", { 'p-invalid': submitted && !niv_id })} />
                    <div>
                        {submitted && !niv_id && <small className="p-error">Campo obligatorio.</small>}
                    </div>
                </div>
                <div className="col">
                    <div>
                        <label htmlFor="nivel">Titulo académico</label>
                    </div>
                    <div className="p-inputgroup">
                        <Dropdown value={tit_id} options={titulos} onChange={(e) => setTit_id(e.target.value)}
                            optionLabel="tit_nombre" filter placeholder="Título" required optionValue="tit_id"
                            className={classNames("input-text", { 'p-invalid': submitted && !tit_id })} />
                        <div>
                            {submitted && !tit_id && <small className="p-error">Campo obligatorio.</small>}
                        </div>
                        <Button icon="pi pi-plus" className="p-button-sucess" onClick={handleShowcrear} />
                    </div>
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

                <div className="col">
                    <div>
                        <label htmlFor="reentrenado">Fotografía</label>
                    </div>
                    <input type="file" accept="image/*" onChange={handleChange} />
                </div>
            </div>
            <br />
            <div className="row">

                <div>
                    <label htmlFor="cursos">Cursos</label>
                </div>
                <InputTextarea id="cursos" aria-describedby="cursos-help" rows={3} style={{ width: "60rem" }}
                    value={emp_cursos} onChange={(e) => setEmp_cursos(e.target.value)} />
            </div>
            <br />
            {actionsTemplate()}

            <Dialog header="Nuevo Titulo" visible={dialogcrear} style={{ width: '30vw' }} onHide={handleClosecrear} >
                <label htmlFor="tit_nombre">Titulo</label><br></br>
                <InputText required id="tit_nombre" aria-describedby="tit_nombre-help" value={titulonuevo.tit_nombre}
                    onChange={(e) => setTitulonuevo({ tit_nombre: e.target.value })} />
                <br></br>
                <small id="tit_nombre-help">
                    Ingresa un nuevo Titulo
                </small><br></br><br></br>

                <Button label="Cancelar" className="p-button-rounded p-button-danger p-button-text"
                    icon="pi pi-times" onClick={handleClosecrear} />
                <Button label="Crear" icon="pi pi-check" className="p-button-rounded p-button-text"
                    onClick={PostTitulo} />
            </Dialog>
        </div>
    );
}

export default InfoPrincipal; 