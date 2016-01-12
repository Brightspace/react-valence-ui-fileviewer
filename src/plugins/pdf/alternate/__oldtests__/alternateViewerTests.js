'use strict';

jest.dontMock('../alternateViewer');

var React = require('react/addons'),
	TestUtils = React.addons.TestUtils,
	pdfjs = require('../pdfjs-lib'),
	pdfjsWorkerSrcInit = require('../pdfjsWorkerSrcInit'),
	AlternateViewer = require('../alternateViewer');

describe('PDF Alternate Viewer', function() {
	pdfjsWorkerSrcInit.mockImpl(function() {
		return Promise.resolve();
	});

	beforeEach(function() {
		pdfjs.getDocument.mockClear();
		pdfjsWorkerSrcInit.mockClear();
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
		var removeEventListenerMock = sinon.stub();
		viewer.state.container.removeEventListener = removeEventListenerMock;

		viewer.componentWillUnmount();

		expect(removeEventListenerMock.calledOnce).toBe(true);
		expect(removeEventListenerMock.firstCall.args[0]).toEqual('pagesinit');
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
		var progressFunc = sinon.stub();

		TestUtils.renderIntoDocument(
			<AlternateViewer
				src='test.pdf'
				progressCallback={progressFunc} />
		);

		expect(progressFunc.calledOnce).toBe(true);
		expect(progressFunc.firstCall.args[0]).toBe(10);
		expect(progressFunc.firstCall.args[1]).toBe('guess');
	});

	it('Calls the progressCallback when updateProgress is called', function() {
		var progressFunc = sinon.stub();

		var viewer = TestUtils.renderIntoDocument(
			<AlternateViewer
				src='test.pdf'
				progressCallback={progressFunc} />
		);

		progressFunc = sinon.stub();

		viewer.updateProgress(55);

		expect(progressFunc).toBeCalledWith(55, 'guess');
	});
});
