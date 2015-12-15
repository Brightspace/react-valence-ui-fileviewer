'use strict';

jest.dontMock('../nativeViewer.js');

var React = require('react/addons'),
	TestUtils = React.addons.TestUtils,
	NativeViewer = require('../nativeViewer.js');

describe('PDF Native Viewer', function() {
	it('should test things eventually', function() {
		var elem = TestUtils.renderIntoDocument(
			<NativeViewer src='some/path' />
		);
		var div = TestUtils.scryRenderedDOMComponentsWithClass(
			elem,
			'vui-fileviewer-pdf-native'
		);
		expect(div.length).toBe(1);
	});

	it('Calls the progressCallback and passes 0', function() {

		var progressFunc = jest.genMockFunction();

		TestUtils.renderIntoDocument(
			<NativeViewer
				src='test.pdf'
				progressCallback={progressFunc} />
		);

		expect(progressFunc.mock.calls[0][0]).toBe(0);
	});

	it('Calls the progressCallback a second time and passes 100', function() {

		var progressFunc = jest.genMockFunction();

		TestUtils.renderIntoDocument(
			<NativeViewer
				src='test.pdf'
				progressCallback={progressFunc} />
		);

		expect(progressFunc.mock.calls[1][0]).toBe(100);
	});

	it('Calls the progressCallback both times with certainty none', function() {

		var progressFunc = jest.genMockFunction();

		TestUtils.renderIntoDocument(
			<NativeViewer
				src='test.pdf'
				progressCallback={progressFunc} />
		);

		expect(progressFunc.mock.calls[0][1]).toBe('none');
		expect(progressFunc.mock.calls[1][1]).toBe('none');
	});
});
