'use strict';

jest.dontMock('../getExtension.js');
jest.dontMock('../getIconClassName.js');
jest.dontMock('../plugins/html/nativeViewer.js');

var React = require('react/addons'),
	TestUtils = React.addons.TestUtils,
	HtmlViewer = require('../plugins/html/nativeViewer.js');

describe('HtmlViewer', function() {

	it('Makes at least one call to the progress callback', function() {

		var called = false;
		var progressFunc = function(num) { called = true; };

		var elem = TestUtils.renderIntoDocument(
			<HtmlViewer
				src='test.html'
				progressCallback={progressFunc} />
		);

		expect(called).toBeTruthy();
	});
});
