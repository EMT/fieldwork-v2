import React, { Component } from 'react';

export default class Section extends Component{
	render () {
		return (
			<div className={"page-section " + this.props.customClass}>
			    <div className="section-inner">
					{ this.props.children }
				</div>
			</div>
		)
	}
};