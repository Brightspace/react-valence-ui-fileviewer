'use strict';

jest.dontMock('../alternateViewer.js');

var React = require('react/addons'),
	TestUtils = React.addons.TestUtils,
	isInView = require('../isInView.js'),
	AlternateViewer = require('../alternateViewer.js'),
	getPixelRatio = require('../pixelRatio/getPixelRatio.js');

require('../pdfjs-lib');

describe('PDF Alternate Viewer', function() {
	isInView.mockImpl(function() {
		return true;
	});

	beforeEach(function() {
		window.PDFJS.getDocument.mockClear();
		isInView.mockClear();
	});

	it('should render with expected class name', function() {
		var viewer = TestUtils.renderIntoDocument(
			<AlternateViewer src='some/path' />
		);
		var div = TestUtils.scryRenderedDOMComponentsWithClass(
			viewer,
			'vui-fileviewer-pdf-alternate'
		);
		expect(div.length).toBe(1);
	});

	it('should get the pixel ratio', function() {
		TestUtils.renderIntoDocument(
			<AlternateViewer src='some/path' />
		);

		expect(getPixelRatio).toBeCalled();
	});

	it('getMaxScale returns the default if no maxScale prop is provided', function() {
		var defaultMaxScale = 1.5;
		var viewer = TestUtils.renderIntoDocument(
			<AlternateViewer src='some/path' />
		);
		expect(viewer.getMaxScale()).toEqual(defaultMaxScale);
	});

	it('getMaxScale returns the provided maxScale', function() {
		var myCustomMaxScale = 3.25;
		var viewer = TestUtils.renderIntoDocument(
			<AlternateViewer src='some/path' maxScale={myCustomMaxScale} />
		);
		expect(viewer.getMaxScale()).toEqual(myCustomMaxScale);
	});

	it('gets the document requested in src', function() {
		TestUtils.renderIntoDocument(
			<AlternateViewer
				src='test.pdf' />
		);

		expect(window.PDFJS.getDocument).toBeCalledWith('test.pdf');
	});

	it('Calls the progressCallback and passes 10 in as the initial value', function() {

		var progressFunc = jest.genMockFunction();

		TestUtils.renderIntoDocument(
			<AlternateViewer
				src='test.pdf'
				progressCallback={progressFunc} />
		);

		expect(progressFunc.mock.calls.length).toBe(1);
		expect(progressFunc.mock.calls[0][0]).toBe(10);
	});

	it('Calls the progressCallback when updateProgress is called', function() {

		var progressFunc = jest.genMockFunction();

		var viewer = TestUtils.renderIntoDocument(
			<AlternateViewer
				src='test.pdf'
				progressCallback={progressFunc} />
		);

		progressFunc.mockClear();

		viewer.updateProgress(55);

		expect(progressFunc).toBeCalledWith(55);
	});
});
