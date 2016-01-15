'use strict';

var React = require('react/addons'),
	sinon = require('sinon'),
	TestUtils = React.addons.TestUtils,
	Viewer = require('../viewer.js');

describe('HTML Viewer', function() {

	var addEventListener, removeEventListener;

	beforeEach(function() {
		addEventListener = sinon.spy(window, 'addEventListener');
		removeEventListener = sinon.spy(window, 'removeEventListener');
	});

	afterEach(function() {
		addEventListener.restore();
		removeEventListener.restore();
	});

	it('should render wrapper with expected class name', function() {
		var elem = TestUtils.renderIntoDocument(
			<Viewer src='foo.bar' />
		);
		var wrapper = TestUtils.findRenderedDOMComponentWithClass(
			elem,
			'vui-fileviewer-html-native'
		);
		expect(wrapper).toBeDefined(true);
	});

	it('should render an IFRAME pointing at "src"', function() {
		var elem = TestUtils.renderIntoDocument(
			<Viewer src='foo.bar' />
		);
		var iframe = TestUtils.findRenderedDOMComponentWithTag(
			elem,
			'iframe'
		);

		expect(React.findDOMNode(iframe).src).toContain('foo.bar');
	});

	it('should calls the progressCallback and pass 100 in as the value', function() {
		var progressFunc = sinon.stub();

		var elem = TestUtils.renderIntoDocument(
			<Viewer
				src='test.html'
				progressCallback={progressFunc} />
		);

		TestUtils.Simulate.load(TestUtils.findRenderedDOMComponentWithClass(elem, 'vui-fileviewer-html-native'));

		expect(progressFunc.calledTwice).toBe(true);
		expect(progressFunc.firstCall.args[0]).toBe(0);
		expect(progressFunc.secondCall.args[0]).toBe(100);
	});
});
