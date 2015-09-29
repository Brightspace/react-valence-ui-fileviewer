'use strict';

var React = require('react');

var extensions = [
	'html',
	'htm'
];

var style = {
	width: '100%',
	height: '100%',
	border: '0px'
};

var HtmlViewer = React.createClass({
	render: function() {
		return <iframe seamless='seamless' src={this.props.src} style={style} />;
	}
});

var plugin = {
	getComponent: function(props) {
		return <HtmlViewer {...props} />;
	},
	test: function(extension) {
		var isHtml = (extensions.indexOf(extension) > -1);
		return isHtml;
	}
};

module.exports = plugin;
