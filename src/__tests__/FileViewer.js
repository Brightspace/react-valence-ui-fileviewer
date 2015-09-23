'use strict';

jest.dontMock('../index.js');

var React = require('react/addons'),
	TestUtils = React.addons.TestUtils,
	FileViewer = require('../index.js');

describe('Hello World', function() {
	it('contains "hello world"', function() {

		var elem = TestUtils.renderIntoDocument(
			<FileViewer />
		);

		var div = TestUtils.findRenderedDOMComponentWithTag(elem, 'div');
		expect(React.findDOMNode(div).textContent).toEqual('Hello World!');

	});
});
