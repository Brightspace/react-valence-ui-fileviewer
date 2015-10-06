'use strict';

jest.dontMock('../icon.js');

var React = require('react/addons'),
	TestUtils = React.addons.TestUtils,
	Icon = require('../icon.js'),
	getIconClassName = require('../../../getIconClassName');

getIconClassName.mockImpl(function() { return 'test'; });

describe('Generic Icon View', function() {

	afterEach(function() {
		getIconClassName.mockClear();
	});

	it('should render wrapper with expected class name', function() {
		var elem = TestUtils.renderIntoDocument(
			<Icon mimeType='image/jpeg' />
		);
		var wrapper = TestUtils.scryRenderedDOMComponentsWithClass(
			elem,
			'vui-fileviewer-icon'
		);
		expect(wrapper.length).toBe(1);
	});

	it('should pass mimeType to getIconClassName', function() {
		TestUtils.renderIntoDocument(
			<Icon mimeType='image/jpeg' />
		);
		expect(getIconClassName.mock.calls.length).toBe(1);
		expect(getIconClassName.mock.calls[0][0]).toBe('image/jpeg');
	});

	it('should append mimeType-specific class name', function() {
		var elem = TestUtils.renderIntoDocument(
			<Icon mimeType='foo/bar' />
		);
		var wrapper = TestUtils.scryRenderedDOMComponentsWithClass(
			elem,
			'vui-fileviewer-icon-test'
		);
		expect(wrapper.length).toBe(1);
	});

});
