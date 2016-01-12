'use strict';

var React = require('react/addons'),
	TestUtils = React.addons.TestUtils,
	Size = require('../size.js'),
	d2lIntl = require('d2l-intl'),
	sinon = require('sinon');

var formatMock,
	FileSizeFormat;

var renderElement = function(size, locale) {
	return TestUtils.renderIntoDocument(
		<Size value={size} locale={locale} />
	);
};

describe('Generic Size View', function() {
	beforeEach(function() {
		formatMock = sinon.stub().returns('test');
		FileSizeFormat = sinon.stub().returns({ format: formatMock });
		Size.__Rewire__('d2lIntl', { FileSizeFormat: FileSizeFormat });
	});

	it('should render wrapper with expected class name', function() {
		var elem = renderElement(1234, 'en-ca');
		var wrapper = TestUtils.findRenderedDOMComponentWithClass(
			elem,
			'vui-fileviewer-generic-size'
		);
		expect(wrapper).toBeDefined();
	});

	it('should use the d2l-intl FileSizeFormat', function() {
		renderElement(1234, 'en-ca');
		expect(formatMock.calledOnce).toBe(true);
	});

	it('should pass the locale property to the d2l-intl FileSizeFormat', function() {
		renderElement(1234, 'en-ca');
		expect(FileSizeFormat.firstCall.args[0]).toBe('en-ca');
	});

	it('should pass the size property to the d2l-intl FileSizeFormat format method', function() {
		renderElement(1234, 'en-ca');
		expect(formatMock.firstCall.args[0]).toBe(1234);
	});
});
