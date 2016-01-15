'use strict';

var React = require('react/addons'),
	TestUtils = React.addons.TestUtils,
	Icon = require('../icon.js'),
	sinon = require('sinon');

var getIconClassName;

describe('Generic Icon View', function() {
	beforeEach(function() {
		getIconClassName = sinon.stub().returns('test');
		Icon.__Rewire__('getIconClassName', getIconClassName);
	});

	it('should render wrapper with expected class name', function() {
		var elem = TestUtils.renderIntoDocument(
			<Icon mimeType='image/jpeg' />
		);
		var wrapper = TestUtils.scryRenderedDOMComponentsWithClass(
			elem,
			'vui-fileviewer-icon'
		);
		expect(wrapper.length).toBe(1);
	});

	it('should pass mimeType to getIconClassName', function() {
		TestUtils.renderIntoDocument(
			<Icon mimeType='image/jpeg' />
		);
		expect(getIconClassName.calledOnce).toBe(true);
		expect(getIconClassName.firstCall.args[0]).toBe('image/jpeg');
	});

	it('should append mimeType-specific class name', function() {
		var elem = TestUtils.renderIntoDocument(
			<Icon mimeType='foo/bar' />
		);
		var wrapper = TestUtils.scryRenderedDOMComponentsWithClass(
			elem,
			'vui-fileviewer-icon-test'
		);
		expect(wrapper.length).toBe(1);
	});

});
