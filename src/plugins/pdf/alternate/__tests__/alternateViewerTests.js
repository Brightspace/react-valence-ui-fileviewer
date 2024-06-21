'use strict';

var React = require('react'), //eslint-disable-line no-unused-vars
	TestUtils = require('react-dom/test-utils'),
	AlternateViewer = require('../alternateViewer'),
	sinon = require('sinon'),
	Promise = require('es6-promise').Promise,
	getPdfjsMock = require('./utils/getPdfjsMock');

var pdfjs;
describe('PDF Alternate Viewer', function() {
	beforeEach(function() {
		AlternateViewer.__Rewire__('pdfjsWorkerSrcInit', function() { return Promise.resolve(); });
		pdfjs = getPdfjsMock();
		AlternateViewer.__Rewire__('pdfjs', pdfjs);
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

	describe('gets the document requested in src', function() {
		beforeEach(function(done) {
			TestUtils.renderIntoDocument(
				<AlternateViewer
					src='test.pdf' />
			);

			Promise.resolve().then(function() {
				done();
			});
		});

		it('test', function() {
			expect(pdfjs.getDocument.calledWithExactly({
				url: 'test.pdf',
				withCredentials: true
			})).toBeTruthy();
		});
	});

	it('Calls the progressCallback and passes 10 in as the initial value', function() {
		var progressFunc = sinon.stub();

		TestUtils.renderIntoDocument(
			<AlternateViewer
				src='test.pdf'
				progressCallback={progressFunc} />
		);

		expect(progressFunc.calledWith(10, 'guess')).toBe(true);
	});

	it('Calls the resizeCallback and passes 100%, false', function() {
		var resizeFunc = sinon.stub();

		TestUtils.renderIntoDocument(
			<AlternateViewer
				src='test.pdf'
				resizeCallback={resizeFunc} />
		);

		expect(resizeFunc.calledWith('100%', false)).toBe(true);
	});

	it('Calls the progressCallback when updateProgress is called', function() {
		var progressFunc = sinon.stub();

		var viewer = TestUtils.renderIntoDocument(
			<AlternateViewer
				src='test.pdf'
				progressCallback={progressFunc} />
		);

		progressFunc.reset();
		viewer.updateProgress(55);

		expect(progressFunc.calledWithExactly(55, 'guess')).toBe(true);
	});

	describe('should not set withCredentials when getting document with withCredentials false in fileInfo', function() {
		beforeEach( function(done) {

			var fileInfo = {
				withCredentials: false
			};

			TestUtils.renderIntoDocument(
				<AlternateViewer
					src='test.pdf'
					fileInfo={fileInfo}/>
			);

			Promise.resolve().then(function() {
				done();
			});
		});

		it( 'test', function() {
			expect(pdfjs.getDocument.calledWithExactly({
				url: 'test.pdf',
				withCredentials: false
			})).toBeTruthy();
		});
	});

	describe('should set withCredentials when getting document with empty fileInfo', function() {
		beforeEach( function(done) {
			var fileInfo = {
				// empty
			};

			TestUtils.renderIntoDocument(
				<AlternateViewer
					src='test.pdf'
					fileInfo={fileInfo} />
			);

			Promise.resolve().then(function() {
				done();
			});
		});

		it('test', function() {
			expect(pdfjs.getDocument.calledWithExactly({
				url: 'test.pdf',
				withCredentials: true
			})).toBeTruthy();
		});
	});

	describe('should set withCredentials when getting document with no fileInfo prop', function() {
		beforeEach( function(done) {
			TestUtils.renderIntoDocument(
				<AlternateViewer
					src='test.pdf'
				/>
			);

			Promise.resolve().then(function() {
				done();
			});
		});

		it('test', function() {
			expect(pdfjs.getDocument.calledWithExactly({
				url: 'test.pdf',
				withCredentials: true
			})).toBeTruthy();
		});
	});
});
