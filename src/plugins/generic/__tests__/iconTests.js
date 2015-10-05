'use strict';

jest.dontMock('../icon.js');

var React = require('react/addons'),
	TestUtils = React.addons.TestUtils,
	Icon = require('../icon.js');

describe('Generic Icon View', function() {
	it('should test things eventually', function() {
		var elem = TestUtils.renderIntoDocument(
			<Icon mimeType='image/jpeg' />
		);
		var wrapper = TestUtils.scryRenderedDOMComponentsWithClass(
			elem,
			'vui-fileviewer-icon'
		);
		expect(wrapper.length).toBe(1);
	});
});
