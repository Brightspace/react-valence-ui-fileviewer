'use strict';

jest.dontMock('../fileViewerResolved.js');

var genericViewer = require('../plugins/generic/generic.js'),
	React = require('react/addons'),
	TestUtils = React.addons.TestUtils,
	FileViewerResolved = require('../fileViewerResolved.js');

genericViewer.test.mockImpl(function() { return true; });

describe('FileViewer Resolved', function() {

	afterEach(function() {
		genericViewer.getComponent.mockClear();
	});

	it('should render wrapper with expected class name', function() {
		var elem = TestUtils.renderIntoDocument(
			<FileViewerResolved mimeType='text/html' size={1234} />
		);
		var wrapper = TestUtils.findRenderedDOMComponentWithClass(
			elem,
			'vui-fileviewer'
		);
		expect(wrapper).toBeDefined();
	});

	it('should render plugin which tests true', function() {
		TestUtils.renderIntoDocument(
			<FileViewerResolved mimeType='text/html' size={1234} />
		);
		expect(genericViewer.getComponent.mock.calls.length).toBe(1);
	});

});
