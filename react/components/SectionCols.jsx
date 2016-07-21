import React, { Component } from 'react';

import SectionText from './SectionText.jsx';

export default class SectionCols extends Component{
	render() {
		return (
			<SectionText>
				<div className="content-col-wrapper">
					{this.props.children}
				</div>
			</SectionText>
		)
	}
};