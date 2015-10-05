'use strict';

var React = require('react');

var style = {
	maxWidth: '100%',
	maxHeight: '100%'
};

var ImageViewer = React.createClass({
	render: function() {
		return <img src={this.props.src} alt="" style={style} />;
	}
});

module.exports = ImageViewer;
