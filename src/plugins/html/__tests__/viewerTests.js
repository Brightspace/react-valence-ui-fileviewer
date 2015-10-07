'use strict';

jest.autoMockOff();

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
		expect(wrapper).toBeDefined();
	});

	it('should render an IFRAME pointing at "src"', function() {
		var elem = TestUtils.renderIntoDocument(
			<Viewer src='foo.bar' />
		);
		var iframe = TestUtils.findRenderedDOMComponentWithTag(
			elem,
			'iframe'
		);
		expect(iframe).toBeDefined();
		expect(React.findDOMNode(iframe).src).toBe('foo.bar');
	});

	it('should add event listener when mounted', function() {
		TestUtils.renderIntoDocument(<Viewer src='foo.bar' />);
		expect(addEventListener.calledOnce).toBeTruthy();
	});

	it('should remove event listener when unmounted', function() {
		var elem = TestUtils.renderIntoDocument(
			<Viewer src='foo.bar' />
		);
		var success = React.unmountComponentAtNode(
			React.findDOMNode(elem).parentNode
		);
		expect(success).toBeTruthy();
		expect(removeEventListener.calledOnce).toBeTruthy();
	});

	it('should calls the progressCallback and pass 100 in as the value', function() {

		var progressFunc = jest.genMockFunction();

		var elem = TestUtils.renderIntoDocument(
			<Viewer
				src='test.html'
				progressCallback={progressFunc} />
		);

		TestUtils.findRenderedDOMComponentWithClass(elem, 'vui-fileviewer-html-native').props.onLoad();

		expect(progressFunc.mock.calls.length).toBe(2);
		expect(progressFunc.mock.calls[0][0]).toBe(0);
		expect(progressFunc.mock.calls[1][0]).toBe(100);
	});
});
