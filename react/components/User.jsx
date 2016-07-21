import React, { Component } from 'react';

export default class User extends Component{
	render () {
		return (
			<div>
	            <h2>{this.props.name}<span>{this.props.role}</span></h2>
	            <ul className="social-icons">
	              { this.props.twitter ? <li><a href={this.props.twitter} className="icon-twitter"></a></li> : null }
	              { this.props.instagram ? <li><a href={this.props.instagram} className="icon-instagram"></a></li> : null }
	              { this.props.github ? <li><a href={this.props.github} className="icon-github"></a></li> : null }
	              { this.props.website ? <li><a href={this.props.website} className="icon-globe"></a></li> : null }
	              { this.props.pinterest ? <li><a href={this.props.pinterest} className="icon-pinterest-circled"></a></li> : null }
	            </ul>
            </div>
		)
	}
};