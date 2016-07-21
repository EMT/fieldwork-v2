import React, { Component } from 'react';

export default class ImageTile extends Component{
	render () {
		return (
		  <img src={this.props.src} />
		)
	}
};