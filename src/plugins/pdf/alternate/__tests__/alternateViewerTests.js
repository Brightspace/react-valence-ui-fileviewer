'use strict';

jest.dontMock('../alternateViewer.js');

var React = require('react/addons'),
	TestUtils = React.addons.TestUtils,
	pdfjs = require('../pdfjs-lib'),
	pdfjsWorkerSrcInit = require('../pdfjsWorkerSrcInit'),
	AlternateViewer = require('../alternateViewer.js');

describe('PDF Alternate Viewer', function() {
	pdfjsWorkerSrcInit.init.mockImpl(function() {
		return Promise.resolve();
	});

	beforeEach(function() {
		pdfjs.getDocument.mockClear();
		pdfjsWorkerSrcInit.init.mockClear();
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

	it('should remove event listeners on unmount', function() {
		var viewer = TestUtils.renderIntoDocument(
			<AlternateViewer src='some/path' />
		);
		var removeEventListenerMock = jest.genMockFunction();
		viewer.container.removeEventListener = removeEventListenerMock;

		viewer.componentWillUnmount();

		expect(removeEventListenerMock.mock.calls.length).toBe(1);
		expect(removeEventListenerMock.mock.calls[0][0]).toEqual('pagesinit');
	});

	pit('gets the document requested in src', function() {
		TestUtils.renderIntoDocument(
			<AlternateViewer
				src='test.pdf' />
		);

		return Promise.resolve().then(function() {
			expect(pdfjs.getDocument).toBeCalledWith({
				url: 'test.pdf',
				withCredentials: true
			});
		});
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
		expect(progressFunc.mock.calls[0][1]).toBe('guess');
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

		expect(progressFunc).toBeCalledWith(55, 'guess');
	});
});
