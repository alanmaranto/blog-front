import React, {Component, Fragment } from 'react';
import './navbar.scss';
import payload from '../../utils/payload';
import isAuthenticated from '../../utils/isAuthenticathed';

class Navbar extends Component {

    render(){
        return(
            <nav className="navbar navbar-expand-lg navbar-dark bg-blue">
                <a className="navbar-brand" href="#">Mi blog</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">

                        {
                            (isAuthenticated()) ? 
                                (<Fragment>
                                    <a href="#" className="nav-item nav-link">Hola {payload().username}</a>
                                    <a href="/logout" className="nav-item nav-link">Logout</a>
                                </Fragment>
                                )
                                :(<a className="nav-item nav-link" href="/login">Login</a>)
                        }
                    </div>
                </div>
            </nav>
        )
    }
}

export default Navbar;