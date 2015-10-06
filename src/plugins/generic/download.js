'use strict';

var React = require('react');

var Download = React.createClass({
	propTypes: {
		src: React.PropTypes.string
	},
	download: function() {
		document.location.href = this.props.src;
	},
	render: function() {
		if (!this.props.src) {
			return null;
		}
		return <div className="vui-fileviewer-generic-download">
			<button onClick={this.download}>Download</button>
		</div>;
	}
});

module.exports = Download;
