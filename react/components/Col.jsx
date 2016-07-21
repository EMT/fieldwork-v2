import React, { Component } from 'react';

export default class Col extends Component{
	constructor(props) {
		super(props);
	}
	render () {
		return (
		  <div className={"content-col content-col--" + this.props.cols + "-" + this.props.rows}>
		  	{this.props.children}
          </div>
		)
	}
};

Col.propTypes = {
    cols: React.PropTypes.string.isRequired,
    rows: React.PropTypes.string.isRequired,
}