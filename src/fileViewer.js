'use strict';

var React = require('react'),
	image = require('./plugins/image.js'),
	genericViewer = require('./plugins/generic/generic.js');

var viewers = [
	image,
	genericViewer
];

var FileViewer = React.createClass({
	propTypes: {
		src: React.PropTypes.string.isRequired
	},
	render: function() {
		var viewer;
		for (var i = 0; i < viewers.length; i++) {
			if (viewers[i].test(this.props.src)) {
				viewer = viewers[i].getComponent(this.props);
				break;
			}
		};
		return (<div className="vui-fileviewer">{viewer}</div>);
	}
});

module.exports = FileViewer;
