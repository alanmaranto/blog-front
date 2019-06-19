import React, {Component} from 'react';
import { Input } from '../Input';
import { API } from '../../utils/http'; //importa la api 

class FormPost extends Component {

    constructor(props){
        super(props);

        this.state={
            title:"",
            text:"",
            image:"",
            imagePreview:""
        }

    }

    inputChange = (event) => {
        const {name,value} = event.target;
        this.setState({[name]: value});
    }

    //cachar imagen
    imageChange = (event) => {
        const reader = new FileReader();
        const file = event.target.files[0];

        reader.onloadend = () => {
            this.setState(
                {
                    file,
                    image:file.filename, //archivo a subir
                    imagePreview:reader.result //vemos que imagen estamos subiendo
                }
            )
        }

        reader.readAsDataURL(file);
    }

    //funcion que manda la imagen en multipartes ya que la imagen se descomprime en cachitos
    sendImage = async () => {
        const {file} = this.state;
        const data = new FormData();
        data.append('image', file); //creo un nuevo atributo llamado image que simula ser el postman
        const config = {
            headers:{
                'content-type':"multipart-form-data" //lo envia por cachitos al serv y el serv lo reconstruye y lo manda en una url
            }
        }

        const response = await API.post('/posts/upload', data,config) //esperamos por la respuesta que manda cloudinary para poder anexarlo al formulario y se guarde en la bd
        if (response && response.status == 200) {
            return response.data.url;
        }
   }

    //funcion que manda a llamar nuestro api para mandarle los datos del post
    submitForm = async (e) => {
        e.preventDefault();
        const {title,text} = this.state;
        const token = localStorage.getItem('blogToken');
        const image = await this.sendImage() //manda a llamar la funcion sendimage

        //manda headers sin request
        const config = {
            headers: {
            "Authorization":`JWT ${token}`,
            "Content-Type":"application/json"
            }
        }

        const data = {
            title,
            text,
            image
        }

        const response = await API.post('/posts', data,config);

        if (response && response.status == 201) {
            this.props.history.push('/'); //cuando mando a pintar una router con react-router dom, se pasa al history que contiene todas las direcciones que se han hecho y posibilita movernos entre pagina a otra y el push para forzar de nuevo al home (ver routes.js)
        }else{
            console.log("Hubo un error")
        }

    }

    render(){
        return(
            <div className="container">
                <div className="row my-4">
                    <h2>Desde FormPost</h2>
                    <div className="col-md-8 my-5 py-5">
                        <form className="" onSubmit={this.submitForm}>
                            <Input name="title" label="Title:" placeholder="Awesome Title" 
                                value={this.state.title} type="text" onChange={this.inputChange} required />
                            <Input name="text" label="Text:"
                            value={this.state.text} onChange={this.inputChange} required isTextArea/>
                            <Input name="image" label="Image:" 
                             type="file" onChange={this.imageChange} required/>

                            <img src={this.state.imagePreview} width="150"/>

                            <button className="btn btn-danger btn-lg">Enviar</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default FormPost;
