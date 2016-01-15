'use strict';

var	React = require('react/addons'),
	TestUtils = React.addons.TestUtils,
	sinon = require('sinon'),
	FileViewerResolved = require('../fileViewerResolved.js');

describe('FileViewer Resolved', function() {
	var getComponentStub;

	beforeEach(function() {
		getComponentStub = sinon.stub();
		FileViewerResolved.__Rewire__('viewers', [{
			test: function() { return true; },
			getComponent: getComponentStub
		}]);
	});

	it('should render wrapper with expected class name', function() {
		var elem = TestUtils.renderIntoDocument(
			<FileViewerResolved mimeType='text/html' size={1234} src="test.html"/>
		);
		var wrapper = TestUtils.findRenderedDOMComponentWithClass(
			elem,
			'vui-fileviewer'
		);
		expect(wrapper).toBeDefined();
	});

	it('should render plugin which tests true', function() {
		TestUtils.renderIntoDocument(
			<FileViewerResolved mimeType='text/html' size={1234} src="test.html" />
		);
		expect(getComponentStub.calledOnce).toBe(true);
	});

});
