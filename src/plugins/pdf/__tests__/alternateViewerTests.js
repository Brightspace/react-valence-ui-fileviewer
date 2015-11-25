'use strict';

jest.dontMock('../alternateViewer.js');

var React = require('react/addons'),
	TestUtils = React.addons.TestUtils,
	AlternateViewer = require('../alternateViewer.js');

describe('PDF Alternate Viewer', function() {
	it('should test things eventually', function() {
		var elem = TestUtils.renderIntoDocument(
			<AlternateViewer src='some/path' />
		);
		var div = TestUtils.scryRenderedDOMComponentsWithClass(
			elem,
			'vui-fileviewer-pdf-alternate'
		);
		expect(div.length).toBe(1);
	});

	it('Calls the progressCallback and passes 100 in as the value', function() {

		var progressFunc = jest.genMockFunction();

		TestUtils.renderIntoDocument(
			<AlternateViewer
				src='test.pdf'
				progressCallback={progressFunc} />
		);

		expect(progressFunc.mock.calls.length).toBe(1);
		expect(progressFunc.mock.calls[0][0]).toBe(100);
	});
});
