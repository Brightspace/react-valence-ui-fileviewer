'use strict';

jest.dontMock('../size.js');

var React = require('react/addons'),
	TestUtils = React.addons.TestUtils,
	Size = require('../size.js');

describe('Generic Size View', function() {
	it('should test things eventually', function() {
		var elem = TestUtils.renderIntoDocument(
			<Size value='1234' />
		);
		var wrapper = TestUtils.scryRenderedDOMComponentsWithClass(
			elem,
			'vui-fileviewer-generic-size'
		);
		expect(wrapper.length).toBe(1);
	});
});
