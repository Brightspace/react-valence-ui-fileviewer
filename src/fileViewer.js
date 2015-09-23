'use strict';

var React = require('react'),
	GenericViewer = require('./plugins/generic.js'),
	LegacyViewer = require('./plugins/legacy.js');

var viewers = [
	LegacyViewer,
	GenericViewer
];

var FileViewer = React.createClass({
	render: function() {
		for (var i = 0; i < viewers.length; i++) {
			if (viewers[i].test()) {
				return viewers[i].getComponent();
			}
		};
		return null;
	}
});

module.exports = FileViewer;
