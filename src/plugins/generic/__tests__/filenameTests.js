'use strict';

jest.dontMock('../filename.js');

var React = require('react/addons'),
	TestUtils = React.addons.TestUtils,
	Filename = require('../filename.js');

describe('Generic Filename View', function() {

	it('should render outer wrapper with expected class name', function() {
		var elem = TestUtils.renderIntoDocument(
			<Filename value='foo.bar' />
		);
		var wrapper = TestUtils.findRenderedDOMComponentWithClass(
			elem,
			'vui-fileviewer-generic-filename'
		);
		expect(wrapper).toBeDefined();
	});

	it('should render the specified filename', function() {
		var elem = TestUtils.renderIntoDocument(
			<Filename value='foo.bar' />
		);
		var wrapper = TestUtils.findRenderedDOMComponentWithClass(
			elem,
			'vui-fileviewer-generic-filename'
		);
		expect(React.findDOMNode(wrapper).textContent).toBe('foo.bar');
	});

});
