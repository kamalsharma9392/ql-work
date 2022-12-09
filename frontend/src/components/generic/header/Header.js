import React, {Fragment} from "react";
import './Header.css';
import {Navigate, NavLink} from "react-router-dom";

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn:false,
            redirect:false
        };
        this.logout = this.logout.bind(this);
    }

    componentWillUnmount() {
        const token = localStorage.getItem('_uTk');
        if(token!==null){
            this.setState({
                isLoggedIn:true
            })
        }
    }

    logout = () =>{
        localStorage.removeItem('_uTk')
        this.setState({
            redirect:true
        })
    }

    render() {
        return(
            <header>
                {
                    this.state.redirect && <Navigate to='/login' replace={true}/>
                }
                <div>
                    <nav className='navbar navbar-expand-lg bg-light'>
                        <div className='container-fluid'>
                            <a className='navbar-brand' href='/'>
                                QL Test Work
                            </a>
                            <button
                                className='navbar-toggler'
                                type='button'
                                data-bs-toggle='collapse'
                                data-bs-target='#navbarSupportedContent'
                                aria-controls='navbarSupportedContent'
                                aria-expanded='false'
                                aria-label='Toggle navigation'
                            >
                                <span className='navbar-toggler-icon' />
                            </button>
                            <div className='collapse navbar-collapse' id='navbarSupportedContent'>
                                <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
                                    <li className='nav-item'>
                                        <NavLink to="/" className="nav-link">
                                            Home
                                        </NavLink>
                                    </li>
                                    <li className='nav-item'>
                                        <NavLink to="/about" className="nav-link">
                                            About
                                        </NavLink>
                                    </li>
                                    {
                                        this.state.isLoggedIn &&
                                        <Fragment>
                                            <li className='nav-item'>
                                                <NavLink to="/dashboard" className="nav-link">
                                                    Dashboard
                                                </NavLink>
                                            </li>
                                            <li className='nav-item'>
                                                <a onClick={this.logout} className="nav-link logout">
                                                    Logout
                                                </a>
                                            </li>
                                        </Fragment>
                                    }
                                    {
                                        !this.state.isLoggedIn &&
                                        <Fragment>
                                            <li className='nav-item'>
                                                <NavLink to="/login" className="nav-link">
                                                    Login
                                                </NavLink>
                                            </li>
                                            <li className='nav-item'>
                                                <NavLink to="/register" className="nav-link">
                                                    Register
                                                </NavLink>
                                            </li>
                                        </Fragment>
                                    }
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>
            </header>
        );
    }
}