import { NavLink } from 'react-router-dom';

export default function Sidebar() {
    return (
  
            <div id="wrapper">

                <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar" >

                    {/* <!-- Sidebar - Brand --> */}
                    < a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html" >
                        <div className="sidebar-brand-icon rotate-n-15">
                            <i className="fas fa-laugh-wink"></i>
                        </div>
                        <div className="sidebar-brand-text mx-3">SB Admin <sup>2</sup></div>
                    </a >

                    {/* <!-- Divider --> */}
                    < hr className="sidebar-divider my-0" />

                    {/* <!-- Nav Item - Dashboard --> */}
                    < li className="nav-item active" >
                        <NavLink className="nav-link" to='/'>
                            <i className="fas fa-fw fa-tachometer-alt"></i>
                            <span>Dashboard</span>
                        </NavLink>
                    </li >

                    {/* <!-- Divider --> */}
                    < hr className="sidebar-divider" />

                    {/* <!-- Heading --> */}
                    < div className="sidebar-heading" >
                        Interface
                    </div >

                    {/* <!-- Nav Item - Pages Collapse Menu --> */}
                    < li className="nav-item" >
                        <NavLink className="nav-link" to='/contract' >
                            <i className="fas fa-fw fa-cog"></i>
                            <span>Contratos</span>
                        </NavLink>
                    </li >

                    {/* <!-- Nav Item - Utilities Collapse Menu --> */}
                    < li className="nav-item" >
                        <NavLink className="nav-link" to='/' >
                            <i className="fas fa-fw fa-cog"></i>
                            <span>Empleados</span>
                        </NavLink>
                    </li >

                    {/* <!-- Divider --> */}
                    < hr className="sidebar-divider" />

                    {/* <!-- Heading --> */}


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

            < li className="nav-item" >
                <NavLink className="nav-link" to='/informacion/nuevo' >
                    <i className="fas fa-fw fa-cog"></i>
                    <span>Crea Información</span>
                </NavLink>
            </li >
                    {/* <!-- Nav Item - Pages Collapse Menu --> */}
                    < li className="nav-item" >
                        <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapsePages"
                            aria-expanded="true" aria-controls="collapsePages">
                            <i className="fas fa-fw fa-folder"></i>
                            <span>Pages</span>
                        </a>
                        <div id="collapsePages" className="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
                            <div className="bg-white py-2 collapse-inner rounded">
                                <h6 className="collapse-header">Login Screens:</h6>
                                <a className="collapse-item" href="login.html">Login</a>
                                <a className="collapse-item" href="register.html">Register</a>
                                <a className="collapse-item" href="forgot-password.html">Forgot Password</a>
                                <div className="collapse-divider"></div>
                                <h6 className="collapse-header">Other Pages:</h6>
                                <a className="collapse-item" href="404.html">404 Page</a>
                                <a className="collapse-item" href="blank.html">Blank Page</a>
                            </div>
                        </div>
                    </li >

                    {/* <!-- Nav Item - Charts --> */}
                    < li className="nav-item" >
                        <a className="nav-link" href="charts.html">
                            <i className="fas fa-fw fa-chart-area"></i>
                            <span>Charts</span></a>
                    </li >

                    {/* <!-- Nav Item - Tables --> */}
                    < li className="nav-item" >
                        <a className="nav-link" href="tables.html">
                            <i className="fas fa-fw fa-table"></i>
                            <span>Tables</span></a>
                    </li >

                    {/* <!-- Divider --> */}
                    < hr className="sidebar-divider d-none d-md-block" />

                    {/* <!-- Sidebar Toggler (Sidebar) --> */}
                    < div className="text-center d-none d-md-inline" >
                        <button className="rounded-circle border-0" id="sidebarToggle"></button>
                    </div >

                    {/* <!-- Sidebar Message --> */}
                    < div className="sidebar-card d-none d-lg-flex" >
                        <img className="sidebar-card-illustration mb-2" src="img/undraw_rocket.svg" alt="..." />
                        <p className="text-center mb-2"><strong>SB Admin Pro</strong> is packed with premium features, components, and more!</p>
                        <a className="btn btn-success btn-sm" href="https://startbootstrap.com/theme/sb-admin-pro">Upgrade to Pro!</a>
                    </div >

                </ul >
            </div>

    )

}