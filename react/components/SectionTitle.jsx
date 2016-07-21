import React, { Component } from 'react';

export default class SectionTitle extends Component{
	render () {
	  	return (
			<div className="section-title">
			  	<h1>{this.props.title}</h1>
	  		</div>
	  	)
	}
};