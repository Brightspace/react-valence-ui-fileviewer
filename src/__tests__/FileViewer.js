'use strict';

jest.dontMock('../fileViewer.js');
jest.dontMock('../plugins/generic.js');

var React = require('react/addons'),
	TestUtils = React.addons.TestUtils,
	FileViewer = require('../fileViewer.js');

describe('FileViewer', function() {
	it('gets rendered by generic viewer', function() {

		var elem = TestUtils.renderIntoDocument(
			<FileViewer src="foo.wav" />
		);

		var div = TestUtils.findRenderedDOMComponentWithTag(elem, 'div');
		expect(React.findDOMNode(div).textContent).toEqual('Generic Viewer: foo.wav');

	});
});
