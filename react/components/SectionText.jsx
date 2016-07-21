import React, { Component } from 'react';

export default class SectionText extends Component{
	render () {
		return (
			<div className="section-text section-text--large content-columns">
				{this.props.children}
			</div>
		)
	}
};