'use strict';

jest.dontMock('../download.js');

var React = require('react/addons'),
	TestUtils = React.addons.TestUtils,
	Download = require('../download.js');

describe('Generic Download View', function() {
	it('should test things eventually', function() {
		var elem = TestUtils.renderIntoDocument(
			<Download src='some/path' />
		);
		var div = TestUtils.scryRenderedDOMComponentsWithClass(
			elem,
			'vui-fileviewer-generic-download'
		);
		expect(div.length).toBe(1);
	});
});
