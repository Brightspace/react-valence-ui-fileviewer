'use strict';

var React = require('react'),
	d2lIntl = require('d2l-intl');

var Size = React.createClass({
	propTypes: {
		value: React.PropTypes.number.isRequired,
		locale: React.PropTypes.string
	},
	contextTypes : {
		getIntlMessage: React.PropTypes.func,
		formatMessage: React.PropTypes.func
	},
	render: function() {
		var size = this.props.value;
		if (!size || size === '0') {
			return;
		} else {
			var locale = this.props.locale;
			size = new d2lIntl.FileSizeFormat(locale).format(size);
		}

		var message = this.context.getIntlMessage('Plugins.Generic.FileSize');
		var sizeString = this.context.formatMessage(message, {'fileSize': size});
		return <div className="vui-fileviewer-generic-size">{sizeString}</div>;
	}
});

module.exports = Size;
