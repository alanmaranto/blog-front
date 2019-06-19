import React, { Component } from 'react';
import { API } from '../../utils/http';
import { Card } from '../Card';


class Home extends Component {

	constructor() {
		super();

		this.state = {
			posts: [],
			isLoading:true
		}
	}

	componentDidMount() {
		API.get('/posts').then((response) => {
			this.setState({isLoading:false, posts: response.data });
		}).catch((err) => {
			// eslint-disable-next-line no-console
			console.log(err);
		})

	}

	render() {
		const {posts,isLoading} =  this.state
		const cardPost = posts.map((post,index) => <Card title={post.title} image={post.image} key={index}/>) //funcion que regresa un maping de objetos cards
		return (
			<div className="container">
				<h2>Post recientes</h2>
				<div className="row mt-4">
					{
						(isLoading) ? (<h3>Cargando...</h3>) : (cardPost)	
					}
				</div>
			</div>
		)
	}
}

export default Home;
