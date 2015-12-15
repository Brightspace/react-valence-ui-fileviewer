'use strict';

var React = require('react');

var Download = React.createClass({
	contextTypes : {
		getIntlMessage: React.PropTypes.func
	},
	propTypes: {
		src: React.PropTypes.string
	},
	download: function() {
		document.location.href = this.props.src;
	},
	render: function() {
		var downloadButtonText = this.context.getIntlMessage('Plugins.Generic.Download');
		if (!this.props.src) {
			return null;
		}
		return <div className="vui-fileviewer-generic-download">
			<button onClick={this.download}>{downloadButtonText}</button>
		</div>;
	}
});

module.exports = Download;
