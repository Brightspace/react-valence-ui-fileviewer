'use strict';

var React = require('react/addons');

var stubIntlMessage = function(Component, props, getMessageFunction, formatMessageFunction) {

	return React.createClass({
		getChildContext() {
			return {
				formatMessage: function() { return formatMessageFunction(); },
				getIntlMessage: function() { return getMessageFunction(); }
			};
		},
		childContextTypes: {
			formatMessage: React.PropTypes.func,
			getIntlMessage: React.PropTypes.func
		},
		render() {
			return <Component ref='component' {...this.props} />;
		}
	});
};

module.exports = stubIntlMessage;
