import React from 'react';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import "./confirmacion.css"

const Confirmacion = ({ datos, onAnterior, onSubmit, vista }) => {

    const handleSubmit = () => {
        onSubmit(datos);
    };
    const booleanIcon = (rowData) => {
        return <i className={classNames(`pi customer-badge `,
            {
                'visto-verde': rowData,
                'x-icon': !rowData
            })} />
    }

    const estadoTemplate = (estado) => {
        const nombreEstado = estado ? "Activo" : "Inactivo";
        return <div className="d-flex">
            <div className='centrar pading-10'>
                <i className={classNames(`pi customer-badge status-${nombreEstado}`,
                    { 'true-icon pi-check-circle': estado, 'false-icon pi-times-circle': !estado })} style={{ fontSize: "2rem" }} />
            </div>
            <div className='centrar'>
                <h4 style={estado ? { color: 'green' }: { color: 'red' }}>{nombreEstado}</h4>
            </div>

        </div>
    };

    const actionsTemplate = () => {
        if (vista === "creacion") {
            return (
                <div className="d-flex">
                    <div className="mr-auto p-2">
                        <Button label="Anterior" icon="pi pi-angle-left" onClick={onAnterior} />
                    </div>
                    <div className="p-2">
                        <Button label="Enviar" icon="pi pi-angle-right" onClick={handleSubmit} />
                    </div>
                </div>
            )
        }
    };

    return (
        <div className="card inputs ">
            <div className="d-flex text-gray-900">
                <div className="mr-auto ">
                    <h4>Cédula: {datos.infoEmpleado.emp_cedula}</h4>
                </div>
                {estadoTemplate(datos.infoEmpleado.emp_estado)}
            </div>
            <br />

            <div className='fila text-confirmacion text-gray-800'>
                <span className='font-weight-bold pading-10'>
                    Nombres:
                </span>
                {datos.infoEmpleado.emp_nombres}
            </div>
            <div className='text-confirmacion text-gray-800'>
                <span className='font-weight-bold pading-10'>
                    Apellidos:
                </span>
                {datos.infoEmpleado.emp_apellidos}
            </div>
            <br />

            <span className='text-primary fila-03'>
                Información del empleado
            </span>
            <div className="row fila text-confirmacion text-gray-800">
                <div className="col">
                    <span className='font-weight-bold pading-10'>
                        Celular:
                    </span>
                    {datos.infoEmpleado.emp_celular}
                </div>
                <div className="col">
                    <span className='font-weight-bold pading-10'>
                        Email:
                    </span>
                    {datos.infoEmpleado.emp_email}
                </div>
            </div>

            <div className="row fila text-confirmacion text-gray-800">
                <div className="col">
                    <span className='font-weight-bold pading-10'>
                        Dirección:
                    </span>
                    {datos.infoEmpleado.emp_direccion}
                </div>
                <div className="col">
                    <span className='font-weight-bold pading-10'>
                        Sexo:
                    </span>
                    {datos.infoEmpleado.emp_sexo}
                </div>
            </div>
            <div className="row fila text-confirmacion text-gray-800">
                <div className="col">
                    <span className='font-weight-bold pading-10'>
                        Ciudad de nacimiento:
                    </span>
                    {datos.infoEmpleado.ciu_nacimiento_id.ciu_nombre}
                </div>
                <div className="col">
                    <span className='font-weight-bold pading-10'>
                        Lugar de nacimiento:
                    </span>
                    {datos.infoEmpleado.emp_lugar_nacimiento}
                </div>
            </div>

            <div className="row text-confirmacion text-gray-800">
                <div className="col">
                    <span className='font-weight-bold pading-10'>
                        Estado civil:
                    </span>
                    {datos.infoEmpleado.ciu_nacimiento_id.ciu_nombre}
                </div>
                <div className="col">
                    <span className='font-weight-bold pading-10'>
                        Cargas familiares:
                    </span>
                    {datos.infoAdicional.inf_cargas_familiares}
                </div>
            </div>
            <br />

            <span className='text-primary fila-03'>
                Formación y experiencia laboral
            </span>
            <div className="row fila text-confirmacion text-gray-800">
                <div className="col">
                    <span className='font-weight-bold pading-10'>
                        Nivel de instrucción:
                    </span>
                    {datos.infoEmpleado.niv_id.niv_descripcion}
                </div>
                <div className="col">
                    <span className='font-weight-bold pading-10'>
                        Título:
                    </span>
                    {datos.infoEmpleado.tit_id.tit_nombre}
                </div>
            </div>

            <div className="row fila text-confirmacion text-gray-800">
                <div className="col">
                    <span className='font-weight-bold pading-10'>
                        Experiencia:
                    </span>
                    {datos.infoAdicional.inf_experiencia}
                </div>
                <div className="col">
                    <span className='font-weight-bold pading-10'>
                        Referencias laborales:
                    </span>
                    {datos.infoAdicional.inf_referencias_laborales}
                </div>
            </div>

            <div className="row text-confirmacion text-gray-800">
                <span className='font-weight-bold pading-10 fila-03'>
                    Cursos:
                </span>
                <div>
                    {datos.infoEmpleado.emp_cursos}
                </div>
            </div>
            <br />

            <span className='text-primary fila-03'>
                Información Adicional
            </span>
            <div className="row fila text-confirmacion text-gray-800">
                <div className="col">
                    <span className='font-weight-bold pading-10'>
                        Certificado médico:
                    </span>
                    {datos.infoAdicional.inf_certmedico_msp}
                </div>
                <div className="col">
                    <span className='font-weight-bold pading-10'>
                        Certificado psicológico:
                    </span>
                    {datos.infoAdicional.inf_certpsicologico}
                </div>
                <div className="col">
                    <span className='font-weight-bold pading-10'>
                        Historial laboral:
                    </span>
                    {datos.infoAdicional.inf_historial_laboral}
                </div>
            </div>

            <div className="row text-confirmacion text-gray-800" >
                <div className="col">
                    <span className='font-weight-bold pading-10'>
                        Antecedentes penales:
                    </span>
                    {datos.infoAdicional.inf_certantecedentes}
                </div>
                <div className="col">
                    <span className='font-weight-bold pading-10'>
                        Poliza:
                    </span>
                    {datos.infoAdicional.inf_poliza}
                </div>
                <div className="col">
                    <span className='font-weight-bold pading-10'>
                        Salida IESS:
                    </span>
                    {datos.infoAdicional.inf_iees_salida}
                </div>
            </div>
            <br />


            <div className="row text-gray-800" style={{ fontSize: "0.95rem" }}>
                <div className="col">
                    <div className="row fila">
                        <div className="col">
                            Copia de cédula:
                        </div>
                        <div className="col">
                            {booleanIcon(datos.infoAdicional.inf_copia_cedula)}
                        </div>
                    </div>
                    <div className="row fila">
                        <div className="col">
                            Discapacidad:
                        </div>
                        <div className="col">
                            {booleanIcon(datos.infoEmpleado.emp_discapacidad)}
                        </div>
                    </div>
                    <div className="row fila">
                        <div className="col">
                            Reentrenado:
                        </div>
                        <div className="col">
                            {booleanIcon(datos.infoEmpleado.emp_reentrenado)}
                        </div>
                    </div>
                    <div className="row fila">
                        <div className="col">
                            Credencial 120:
                        </div>
                        <div className="col">
                            {booleanIcon(datos.infoEmpleado.emp_credencial120)}
                        </div>
                    </div>
                    <div className="row fila">
                        <div className="col">
                            Acta de finiquito:
                        </div>
                        <div className="col">
                            {booleanIcon(datos.infoAdicional.inf_acta_finiquito)}
                        </div>
                    </div>
                </div>

                <div className="col">
                    <div className="row fila">
                        <div className="col">
                            Copia papeleta:
                        </div>
                        <div className="col">
                            {booleanIcon(datos.infoAdicional.inf_copia_papeleta)}
                        </div>
                    </div>
                    <div className="row fila">
                        <div className="col">
                            Hoja de datos:
                        </div>
                        <div className="col">
                            {booleanIcon(datos.infoAdicional.inf_hoja_datos)}
                        </div>
                    </div>
                    <div className="row fila">
                        <div className="col">
                            Hoja de vida:
                        </div>
                        <div className="col">
                            {booleanIcon(datos.infoAdicional.inf_hoja_vida)}
                        </div>
                    </div>
                    <div className="row fila">
                        <div className="col">
                            Entrada IESS:
                        </div>
                        <div className="col">
                            {booleanIcon(datos.infoAdicional.inf_iess_entrada)}
                        </div>
                    </div>
                    <div className="row fila">
                        <div className="col">
                            Libreta militar:
                        </div>
                        <div className="col">
                            {booleanIcon(datos.infoAdicional.inf_libreta_militar)}
                        </div>
                    </div>
                </div>

                <div className="col">
                    <div className="row fila">
                        <div className="col">
                            Certificados laborales:
                        </div>
                        <div className="col">
                            {booleanIcon(datos.infoAdicional.inf_certificados_laborales)}
                        </div>
                    </div>
                    <div className="row fila">
                        <div className="col">
                            Sicosep:
                        </div>
                        <div className="col">
                            {booleanIcon(datos.infoAdicional.inf_sicosep)}
                        </div>
                    </div>
                    <div className="row fila">
                        <div className="col">
                            Carnet Covid:
                        </div>
                        <div className="col">
                            {booleanIcon(datos.infoAdicional.inf_canet_covid)}
                        </div>
                    </div>
                    <div className="row fila">
                        <div className="col">
                            MRL:
                        </div>
                        <div className="col">
                            {booleanIcon(datos.infoAdicional.inf_mrl)}
                        </div>
                    </div>
                    <div className="row fila">
                        <div className="col">
                            AFI:
                        </div>
                        <div className="col">
                            {booleanIcon(datos.infoAdicional.inf_afi)}
                        </div>
                    </div>
                </div>
            </div>
            {actionsTemplate()}
        </div>
    );
};

export default Confirmacion;
