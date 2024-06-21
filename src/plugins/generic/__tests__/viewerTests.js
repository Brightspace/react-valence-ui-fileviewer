'use strict';

var React = require('react'), //eslint-disable-line no-unused-
	TestUtils = require('react-dom/test-utils'),
	Viewer = require('../viewer.js'),
	Icon = require('../icon.js'),
	Size = require('../size.js'),
	Download = require('../download.js'),
	sinon = require('sinon'),
	stubIntlMessage = require('./utils/stubIntlMessage.js');

describe('Generic Viewer', function() {
	var ViewerTester,
		providerStub,
		sandbox;

	beforeEach(function() {
		sandbox = sinon.sandbox.create();
		sandbox.stub(Icon.prototype, 'render').returns(<div></div>);
		sandbox.stub(Download.prototype, 'render').returns(<div></div>);
		sandbox.stub(Size.prototype, 'render').returns(<div></div>);

		ViewerTester = stubIntlMessage(
			Viewer,
			{},
			function() {return 'test';},
			function() {return 'test';}
		);
		providerStub = sinon.stub();
		providerStub.withArgs('file1.gif').callsArgWith(1, null, null);
		providerStub.withArgs('foo.mp3').callsArgWith(1, null, {size: 100, mimeType: 'audio/mp3'});
		providerStub.withArgs('foo2.mp3').callsArgWith(1, null, {size: 100});
		providerStub.withArgs('foo.bar').callsArgWith(1, 'error1');

		Viewer.__Rewire__('fileInfoProvider', providerStub);
	});

	afterEach(function() {
		sandbox.restore();
	});

	it('should render wrapper with expected class name', function() {
		var elem = TestUtils.renderIntoDocument(

			<ViewerTester mimeType='audio/mp3' srcdownload='foo.mp3' />
		);
		var wrapper = TestUtils.findRenderedDOMComponentWithClass(
			elem.refs.component,
			'vui-fileviewer-generic'
		);
		expect(wrapper).toBeDefined();
	});

	it('should render a download area if fileInfoProvider returns data', function() {
		var elem = TestUtils.renderIntoDocument(
			<ViewerTester mimeType='audio/mp3' srcdownload='foo.mp3' />
		);
		var wrapper = TestUtils.scryRenderedDOMComponentsWithClass(
			elem.refs.component,
			'generic-download-area'
		);
		expect(wrapper[0]).toBeDefined();
	});

	it('should call the resizeCallback function', function() {
		var resizeCallback = sinon.stub();

		TestUtils.renderIntoDocument(
			<ViewerTester mimeType='audio/mp3' srcdownload='foo.mp3' resizeCallback={resizeCallback}/>
		);

		expect(resizeCallback.called).toBe(true);
	});

	it('should not render a download area if fileInfoProvider returns an error', function() {
		var elem = TestUtils.renderIntoDocument(
			<ViewerTester mimeType='audio/mp3' srcdownload='foo.bar' />
		);
		var wrapper = TestUtils.scryRenderedDOMComponentsWithClass(
			elem.refs.component,
			'generic-download-area'
		);
		expect(wrapper[0]).not.toBeDefined();
	});

	it('should not render if fileInfoProvider returns no file info', function() {
		var elem = TestUtils.renderIntoDocument(
			<ViewerTester mimeType='audio/mp3' srcdownload='file1.gif' />
		);
		var wrapper = TestUtils.scryRenderedDOMComponentsWithClass(
			elem.refs.component,
			'vui-fileviewer-generic'
		);
		expect(wrapper[0]).not.toBeDefined();
	});

	it('should use the mimetype from the download if it exists', function() {
		var elem = TestUtils.renderIntoDocument(
			<ViewerTester srcdownload='foo.mp3' />
		);
		var wrapper = TestUtils.findRenderedComponentWithType(
			elem.refs.component,
			Icon
		);

		expect(wrapper.props.mimeType === 'audio/mp3');
	});

	it('should use the mimetype passed in as a prop if the download one does not exist', function() {
		var elem = TestUtils.renderIntoDocument(
			<ViewerTester mimeType='testType' srcdownload='foo2.mp3' />
		);
		var wrapper = TestUtils.findRenderedComponentWithType(
			elem.refs.component,
			Icon
		);

		expect(wrapper.props.mimeType === 'testType');
	});

	it('should render the download button to the screen', function() {
		var elem = TestUtils.renderIntoDocument(
			<ViewerTester mimeType='testType' srcdownload='foo2.mp3' />
		);
		var wrapper = TestUtils.findRenderedComponentWithType(
			elem.refs.component,
			Download
		);

		expect(wrapper).toBeDefined();
	});

	it('should render the file Size to the screen', function() {
		var elem = TestUtils.renderIntoDocument(
			<ViewerTester mimeType='testType' srcdownload='foo.mp3' />
		);
		var wrapper = TestUtils.findRenderedComponentWithType(
			elem.refs.component,
			Size
		);

		expect(wrapper).toBeDefined();
		expect(wrapper.props.value).toBe(100);
	});
});
