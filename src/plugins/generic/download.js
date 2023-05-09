import React from 'react';

var isIOS = function() {
	return /iP[ao]d|iPhone/.test(window.navigator.userAgent);
};

var Download = React.createClass({
	contextTypes : {
		getIntlMessage: React.PropTypes.func
	},
	propTypes: {
		src: React.PropTypes.string
	},
	download: function() {
		if (isIOS()) {
			window.open(this.props.src);
		} else {
			document.location.href = this.props.src;
		}
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

export default Download;
