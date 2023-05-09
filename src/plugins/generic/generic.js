import React from 'react'; // eslint-disable-line no-unused-vars
import Viewer from './viewer';

var plugin = {
	getComponent: function(props) {
		return (<Viewer {...props} />);
	},
	test: function() {
		return true;
	}
};

export default plugin;
