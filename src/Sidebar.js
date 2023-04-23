import { NavLink } from 'react-router-dom';

export default function Sidebar() {
    return (

        <div id="wrapper">

            <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar" >

                {/* <!-- Sidebar - Brand --> */}
                < a className="sidebar-brand d-flex align-items-center justify-content-center" href="/empleados" >
                    <div className="sidebar-brand-icon rotate-n-15">
                        <i className="fas fa-laugh-wink"></i>
                    </div>
                    <div className="sidebar-brand-text mx-3">Nómina de empleados</div>
                </a >

                {/* <!-- Nav Item - Dashboard --> */}
                < li className="nav-item active " >
                    <div className="nav-link" >
                        <i className="fas fa-fw fa-tachometer-alt"></i>
                        <span>Dashboard</span>
                    </div>
                </li >

                {/* <!-- Heading --> */}
                < div className="sidebar-heading" >
                    Empleados
                </div >

                {/* <!-- Nav Item - Pages Collapse Menu --> */}
                < li className="nav-item" >
                    <NavLink className="nav-link" to='/empleados' >
                        <i className="fas fa-fw fa-cog"></i>
                        <span>Listado</span>
                    </NavLink>
                </li >

                < li className="nav-item" >
                    <NavLink className="nav-link" to='/empleados/creacion' >
                        <i className="fas fa-fw fa-cog"></i>
                        <span>Crear</span>
                    </NavLink>
                </li >

                {/* <!-- Heading --> */}
                < div className="sidebar-heading" >
                    Contratos
                </div >

                {/* <!-- Nav Item - Pages Collapse Menu --> */}
                < li className="nav-item" >
                    <NavLink className="nav-link" to='/contract' >
                        <i className="fas fa-fw fa-cog"></i>
                        <span>Listado</span>
                    </NavLink>
                </li >

                < div className="sidebar-heading" >
                    Parametros
                </div >

                {/* <!-- Nav Item - Pages Collapse Menu --> */}
                < li className="nav-item" >
                    <NavLink className="nav-link" to='/cargos' >
                        <i className="fas fa-fw fa-cog"></i>
                        <span>Cargos</span>
                    </NavLink>
                </li >

                < li className="nav-item" >
                    <NavLink className="nav-link" to='/titulos' >
                        <i className="fas fa-fw fa-cog"></i>
                        <span>Titulos</span>
                    </NavLink>
                </li >

                < li className="nav-item" >
                    <NavLink className="nav-link" to='/puestos' >
                        <i className="fas fa-fw fa-cog"></i>
                        <span>Puestos</span>
                    </NavLink>
                </li >
            </ul >
        </div>

    )

}