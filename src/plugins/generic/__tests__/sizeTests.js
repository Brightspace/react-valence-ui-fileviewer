'use strict';

jest.dontMock('../size.js');

var React = require('react/addons'),
	TestUtils = React.addons.TestUtils,
	Size = require('../size.js'),
	d2lIntl = require('d2l-intl');

var formatMock = jest.genMockFunction().mockImpl(function(size, locale) {
	return 'formatted ' + size + ' for ' + locale;
});

d2lIntl.FileSizeFormat.mockImpl(function(locale) {
	return {
		format: function(size) {
			formatMock(size, locale);
		}
	};
});

var renderElement = function(size, locale) {
	return TestUtils.renderIntoDocument(
		<Size value={size} locale={locale} />
	);
};

describe('Generic Size View', function() {

	afterEach(function() {
		d2lIntl.FileSizeFormat.mockClear();
		formatMock.mockClear();
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
		expect(formatMock.mock.calls.length).toBe(1);
	});

	it('should pass the locale property to the d2l-intl FileSizeFormat', function() {
		renderElement(1234, 'en-ca');
		expect(d2lIntl.FileSizeFormat.mock.calls[0][0]).toBe('en-ca');
	});

	it('should pass the size property to the d2l-intl FileSizeFormat format method', function() {
		renderElement(1234, 'en-ca');
		expect(formatMock.mock.calls[0][0]).toBe(1234);
	});

	it('should pass the locale property to the d2l-intl FileSizeFormat format method', function() {
		renderElement(1234, 'en-ca');
		expect(formatMock.mock.calls[0][1]).toBe('en-ca');
	});
});
