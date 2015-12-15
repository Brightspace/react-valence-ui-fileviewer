'use strict';

var React = require('react');

var stubIntlMessage = function(Component) {

	return React.createClass({
		childContextTypes: {
			getIntlMessage: React.PropTypes.func,
			formatMessage: React.PropTypes.func
		},

		getChildContext() {
			return {
				getIntlMessage: function() { return 'TEST'; },
				formatMessage: function() { return 'TEST'; }
			};
		},

		render() {
			return (
				<div className="intl-stub">
					<Component {...this.props} {...this.state} />
				</div>
			);
		}
	});
};

var frauThing = {
	i18n: jest.genMockFunction().mockImpl(stubIntlMessage)
};

module.exports = frauThing;
