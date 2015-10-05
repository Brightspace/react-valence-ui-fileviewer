'use strict';

jest.dontMock('../filename.js');

var React = require('react/addons'),
	TestUtils = React.addons.TestUtils,
	Filename = require('../filename.js');

describe('Generic Filename View', function() {
	it('should test things eventually', function() {
		var elem = TestUtils.renderIntoDocument(
			<Filename value='foo.bar' />
		);
		var wrapper = TestUtils.scryRenderedDOMComponentsWithClass(
			elem,
			'vui-fileviewer-generic-filename'
		);
		expect(wrapper.length).toBe(1);
	});
});
