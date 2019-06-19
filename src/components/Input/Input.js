import React, {Component} from 'react';

class Input extends Component{ 

    constructor(props){
        super(props)

        //el prop se guarda en un state para poder modificarse despues
        this.state = {
            value: props.value 
        }
    }

    //ocupamos ciclo de vida de react
    //validacion que permite escribir en el formdata
    componentDidUpdate(prevProps){
        if (prevProps.value !== this.props.value) { //compara el estado previo de los props con los nuevos
            this.setState({ //si hay lago diferente, acutaliza el state automaticamente
                value: this.props.value
            });
        }

    }

    render(){
        const {label,placeholder,name,type,onChange,required, isTextArea} = this.props;
        const {value} = this.state;
        return(
            (isTextArea) ? (
                <div className="form-group">
                    <label>{label}</label>
                    <textarea className="form-control" 
                    cols="30"
                    rows="15"
                    value={value} 
                    name={name} 
                    onChange={onChange} required={required}/>
                </div>
            ) : (
            <div className="form-group">
                <label>{label}</label>
                <input className="form-control" 
                    value={value} 
                    placeholder={placeholder} 
                    name={name} 
                    type={type} onChange={onChange} required={required}/>
            </div>
            )
        )
    }
}

export default Input;