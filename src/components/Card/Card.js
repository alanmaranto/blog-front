import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Card extends Component {

    render(){
        return(
            <div className="col-md-3">
			<div className="card" >
				<img className="card-img-top" src={this.props.image} />
				<div className="card-body">
					<h5 className="card-title">{this.props.title}</h5>
				</div>
			</div>
		</div>
        )
    }
}

Card.propTypes = {
    title: PropTypes.string.isRequired
}

export default Card;