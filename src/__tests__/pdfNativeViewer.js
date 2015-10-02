'use strict';

jest.dontMock('../getExtension.js');
jest.dontMock('../getIconClassName.js');
jest.dontMock('../plugins/pdf/nativeViewer.js');

var React = require('react/addons'),
	TestUtils = React.addons.TestUtils,
	PdfViewer = require('../plugins/pdf/nativeViewer.js');

describe('PdfViewer', function() {

	it('Makes at least one call to the progress callback', function() {

		var called = false;
		var progressFunc = function(num) { called = true; };

		var elem = TestUtils.renderIntoDocument(
			<PdfViewer
				src='test.pdf'
				progressCallback={progressFunc} />
		);

		expect(called).toBeTruthy();
	});
});
