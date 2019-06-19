import React, { Component} from 'react';
import {API} from '../../utils/http'

class Login extends Component {

    constructor(props){
        super(props); //ejecuta el constructor del componente Login y el del componente padre

        this.state = {
            username:"",
            password:""
        }
    }

    changeInput = (event) => {
        const {name, value} = event.target;
        this.setState({[name]:value}); //dentro del state busca lo que se llame como lo de arriba y lo de abajo en la funcion
    }

    //pd. el postman que se generó para calm.string fue user: pureba y password: prueba
    sendData = (event) => {
        event.preventDefault();
        console.log(this.state);
        API.post('/login', this.state).then((response) => {
            const {data} = response //nos regresa el token de uath que es el jwt
            localStorage.setItem("blogToken", data.token); //lo guarda en el local storage que solo acepta strings y setitem crea un nuevoitem
            this.props.history.push('/'); //mueve a otra pagina que en este caso es login que me lleva home
        }).catch((err) => {
            console.log(err)
        })
    }

    render(){
        const {username,password} = this.state
        return(
            <div className="container">
                <h2>Login</h2>
                <div className="row justify-content-center">
                    <div className="col-md-9">
                        <form onSubmit={this.sendData}>
                            <div className="form-group">
                                <label>Username:</label>
                                <input className="form-control" value={username} placeholder="prueba" name="username" type="text" onChange={this.changeInput} required/>
                            </div>
                            <div className="form-group">
                                <label>Password:</label>
                                <input className="form-control" value={password} placeholder="prueba" name="password" type="password" onChange={this.changeInput} required/>
                            </div>
                            <button type="submit" className="btn btn-lg btn-dark">Enviar</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;