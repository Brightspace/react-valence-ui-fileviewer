'use strict';

var React = require('react'),
	d2lIntl = require('d2l-intl');

var Size = React.createClass({
	propTypes: {
		value: React.PropTypes.number.isRequired,
		locale: React.PropTypes.string
	},
	render: function() {
		var size = this.props.value;
		if (size === 0) {
			size = '??';
		} else {
			var locale = this.props.locale;
			size = new d2lIntl.FileSizeFormat(locale).format(size);
		}
		return <div className="vui-fileviewer-generic-size">{size}</div>;
	}
});

module.exports = Size;
