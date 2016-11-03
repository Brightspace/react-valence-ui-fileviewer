'use strict';

var React = require('react'), //eslint-disable-line no-unused-vars
	TestUtils = require( 'react-addons-test-utils' ),
	sinon = require('sinon'),
	FileViewerResolved = require('../fileViewerResolved.js');

describe('FileViewer Resolved', function() {
	var getComponentStub,
		genericViewerStub;

	beforeEach(function() {
		getComponentStub = sinon.stub();
		FileViewerResolved.__Rewire__('viewers', [{
			test: function() { return true; },
			getComponent: getComponentStub
		}]);

		genericViewerStub = sinon.stub();
		FileViewerResolved.__Rewire__('genericViewer', { getComponent: genericViewerStub });
	});

	it('should render wrapper with expected class name', function() {
		var elem = TestUtils.renderIntoDocument(
			<FileViewerResolved mimeType='text/html' src="test.html"/>
		);
		var wrapper = TestUtils.findRenderedDOMComponentWithClass(
			elem,
			'vui-fileviewer'
		);
		expect(wrapper).toBeDefined();
	});

	it('should render plugin which tests true', function() {
		TestUtils.renderIntoDocument(
			<FileViewerResolved mimeType='text/html' src="test.html" />
		);
		expect(getComponentStub.calledOnce).toBe(true);
	});

	it('should render a generic viewer if mimeType is null', function() {
		TestUtils.renderIntoDocument(
			<FileViewerResolved mimeType={null} src="test.html"/>
		);

		expect(genericViewerStub.called).toBe(true);
	});
});
