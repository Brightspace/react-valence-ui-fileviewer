'use strict';

var React = require('react/addons'),
	TestUtils = React.addons.TestUtils,
	FileViewer = require('../fileViewer'),
	sinon = require('sinon'),
	i18n = require('react-frau-intl').i18n,
	FileViewerResolved = require('../fileViewerResolved'),
	IntlFileViewer = i18n(FileViewerResolved);

var providerFunc = function(src, callback) {
	switch (src) {
		case 'file1.gif':
			callback(null, {size: 1, mimeType: 'image/gif', filename: 'file1.gif'});
			break;
		case 'file2.mp3':
			callback(null, {size: 100, mimeType: 'audio/mp3', filename: 'file2.mp3'});
			break;
		case 'file3.null':
			break;
		default:
			callback('error1');
	}
};

var providerStub;

describe('FileViewer', function() {
	beforeEach(function() {
		providerStub = sinon.stub();
		FileViewer.__Rewire__('IntlFileViewer', 'div');
		FileViewer.__Rewire__('fileInfoProvider', providerFunc);
	});

	it('should get file info from provider', function() {
		FileViewer.__Rewire__('fileInfoProvider', providerStub);

		TestUtils.renderIntoDocument(
			<FileViewer src="foo.bar" />
		);

		expect(providerStub.calledOnce).toBe(true);
		expect(providerStub.calledWith('foo.bar')).toBe(true);
	});

	it('should render an error if provider fails', function() {
		var elem = TestUtils.renderIntoDocument(
			<FileViewer src="foo.bar" />
		);
		expect(React.findDOMNode(elem).textContent).toBe('error1');
	});

	it('should render nothing if file info is null', function() {
		var elem = TestUtils.renderIntoDocument(
			<FileViewer src="file3.null" />
		);
		expect(React.findDOMNode(elem)).toBeNull();
	});

	it('should render something if file info is not null', function() {
		var elem = TestUtils.renderIntoDocument(
			<FileViewer src="file1.gif" />
		);
		expect(React.findDOMNode(elem)).not.toBeNull();
	});

	it('should update file info when src changes', function() {
		var elem = TestUtils.renderIntoDocument(
			<FileViewer src="file1.gif" />
		);
		elem.setProps({src: 'file2.mp3'});
		expect(elem.state.info.mimeType).toBe('audio/mp3');
	});

	it('should re-fetch file info if src does not change', function() {
		FileViewer.__Rewire__('fileInfoProvider', providerStub);

		var elem = TestUtils.renderIntoDocument(
			<FileViewer src="file1.gif" />
		);
		elem.setProps({src: 'file1.gif'});
		expect(providerStub.calledOnce).toBe(true);
	});

	it('should not set state when unmounted', function() {
		var elem = TestUtils.renderIntoDocument(
			<FileViewer src="file1.gif" />
		);
		React.unmountComponentAtNode(
			React.findDOMNode(elem).parentNode
		);
		elem.fetchFileInfo('file2.mp3');
		expect(elem.state.info.mimeType).toBe('image/gif');
	});

	it('should pass locale to FileViewerResolved', function() {
		FileViewer.__Rewire__('IntlFileViewer', IntlFileViewer);
		var wrapper = TestUtils.renderIntoDocument(
			<FileViewer src='file1.gif' locale='en-ca' />
		);

		var fileViewerResolvedComponent = TestUtils.findRenderedComponentWithType(
			wrapper,
			FileViewerResolved
		);
		expect(fileViewerResolvedComponent.props.locale).toBe('en-ca');
	});
});
