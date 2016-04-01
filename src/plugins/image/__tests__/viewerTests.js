'use strict';

var React = require('react/addons'),
	TestUtils = React.addons.TestUtils,
	Viewer = require('../viewer.js'),
	sinon = require('sinon');

describe('Image Viewer', function() {

	it('should render an "img" element', function() {
		var elem = TestUtils.renderIntoDocument(
			<Viewer src='foo.bar' />
		);
		var img = TestUtils.findRenderedDOMComponentWithTag(
			elem,
			'img'
		);
		expect(img).toBeDefined();
	});

	it('should render with expected class name', function() {
		var elem = TestUtils.renderIntoDocument(
			<Viewer src='foo.bar' />
		);
		var img = TestUtils.findRenderedDOMComponentWithClass(
			elem,
			'vui-fileviewer-image'
		);
		expect(img).toBeDefined();
	});

	it('should point at "src"', function() {
		var elem = TestUtils.renderIntoDocument(
			<Viewer src='foo.bar' />
		);
		var img = TestUtils.findRenderedDOMComponentWithTag(
			elem,
			'img'
		);
		expect(React.findDOMNode(img).src).toContain('foo.bar');
	});

	it('Calls the resizeCallback and passes 100%, true', function() {
		var resizeFunc = sinon.stub();

		TestUtils.renderIntoDocument(
			<Viewer
				src='test.jpg'
				resizeCallback={resizeFunc} />
		);

		expect(resizeFunc.calledWith('100%', true)).toBe(true);
	});

	it('Calls the progressCallback and passes 0', function() {

		var progressFunc = sinon.stub();

		TestUtils.renderIntoDocument(
			<Viewer
				src='test.jpg'
				progressCallback={progressFunc} />
		);

		expect(progressFunc.firstCall.args[0]).toBe(0);
	});

	it('Calls the progressCallback a second time and passes 100', function() {

		var progressFunc = sinon.stub();

		TestUtils.renderIntoDocument(
			<Viewer
				src='test.jpg'
				progressCallback={progressFunc} />
		);

		expect(progressFunc.secondCall.args[0]).toBe(100);
	});

	it('Calls the progressCallback both times with certainty none', function() {

		var progressFunc = sinon.stub();

		TestUtils.renderIntoDocument(
			<Viewer
				src='test.jpg'
				progressCallback={progressFunc} />
		);

		expect(progressFunc.firstCall.args[1]).toBe('none');
		expect(progressFunc.secondCall.args[1]).toBe('none');
	});
});
