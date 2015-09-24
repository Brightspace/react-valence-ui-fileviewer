'use strict';

var React = require('react'),
	GenericViewer = require('./plugins/generic.js');

var viewers = [
	GenericViewer
];

var FileViewer = React.createClass({
	propTypes: {
		src: React.PropTypes.string.isRequired
	},
	render: function() {
		var src = this.props.src;
		for (var i = 0; i < viewers.length; i++) {
			if (viewers[i].test(src)) {
				return viewers[i].getComponent(src);
			}
		};
		return null;
	}
});

module.exports = FileViewer;
