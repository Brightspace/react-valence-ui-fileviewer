import React from 'react'; //eslint-disable-line no-unused-vars
import TestUtils from 'react-addons-test-utils';
import sinon from 'sinon';
import FileViewerResolved from '../fileViewerResolved.js';
import chai from '@esm-bundle/chai';

const expect = chai.expect;

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
			<FileViewerResolved mimeType='text/html' src='test.html' />
		);
		var wrapper = TestUtils.findRenderedDOMComponentWithClass(
			elem,
			'vui-fileviewer'
		);
		expect(wrapper).to.equalDefined();
	});

	it('should render plugin which tests true', function() {
		TestUtils.renderIntoDocument(
			<FileViewerResolved mimeType='text/html' src='test.html' />
		);
		expect(getComponentStub.calledOnce).to.equal(true);
	});

	it('should render a generic viewer if mimeType is null', function() {
		TestUtils.renderIntoDocument(
			<FileViewerResolved mimeType={null} src='test.html' />
		);

		expect(genericViewerStub.called).to.equal(true);
	});
});
