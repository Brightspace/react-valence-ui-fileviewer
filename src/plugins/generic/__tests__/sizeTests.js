'use strict';

jest.dontMock('../size.js');

var React = require('react/addons'),
	TestUtils = React.addons.TestUtils,
	Size = require('../size.js');

describe('Generic Size View', function() {

	it('should render wrapper with expected class name', function() {
		var elem = TestUtils.renderIntoDocument(
			<Size value={1234} />
		);
		var wrapper = TestUtils.findRenderedDOMComponentWithClass(
			elem,
			'vui-fileviewer-generic-size'
		);
		expect(wrapper).toBeDefined();
	});

	it('should render provided size in bytes', function() {
		var elem = TestUtils.renderIntoDocument(
			<Size value={1234} />
		);
		var wrapper = TestUtils.findRenderedDOMComponentWithClass(
			elem,
			'vui-fileviewer-generic-size'
		);
		expect(React.findDOMNode(wrapper).textContent).toBe('1234 bytes');
	});

	it('should treat 0 bytes as ??', function() {
		var elem = TestUtils.renderIntoDocument(
			<Size value={0} />
		);
		var wrapper = TestUtils.findRenderedDOMComponentWithClass(
			elem,
			'vui-fileviewer-generic-size'
		);
		expect(React.findDOMNode(wrapper).textContent).toBe('?? bytes');
	});

});
