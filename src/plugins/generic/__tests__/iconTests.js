'use strict';

var React = require('react'), //eslint-disable-line no-unused-vars
	ReactDOM = require( 'react-dom' ),
	TestUtils = require('react-dom/test-utils'),
	Icon = require('../icon.js'),
	stubIntlMessage = require('./utils/stubIntlMessage'),
	sinon = require('sinon');

var getIconClassName;

describe('Generic Icon View', function() {
	var IconTester;

	beforeEach(function() {
		getIconClassName = sinon.stub().returns('test');
		Icon.__Rewire__('getIconClassName', getIconClassName);
		IconTester = stubIntlMessage(
			Icon,
			{},
			function() {return 'FILENAME';},
			function() {return 'FILENAME';}
		);
	});

	it('should render wrapper with expected class name', function() {
		var elem = TestUtils.renderIntoDocument(
			<IconTester mimeType='image/jpeg' />
		);
		var wrapper = TestUtils.scryRenderedDOMComponentsWithClass(
			elem.refs.component,
			'vui-fileviewer-icon'
		);
		expect(wrapper.length).toBe(1);
	});

	it('should pass mimeType to getIconClassName', function() {
		TestUtils.renderIntoDocument(
			<IconTester mimeType='image/jpeg' />
		);
		expect(getIconClassName.calledOnce).toBe(true);
		expect(getIconClassName.firstCall.args[0]).toBe('image/jpeg');
	});

	it('should append mimeType-specific class name', function() {
		var elem = TestUtils.renderIntoDocument(
			<IconTester mimeType='foo/bar' />
		);
		var wrapper = TestUtils.scryRenderedDOMComponentsWithClass(
			elem.refs.component,
			'vui-fileviewer-icon-test'
		);
		expect(wrapper.length).toBe(1);
	});

	it('should contain offscreen-text saying the file name', function() {
		var elem = TestUtils.renderIntoDocument(
			<IconTester mimeType='foo/bar' />
		);
		var wrapper = TestUtils.scryRenderedDOMComponentsWithClass(
			elem.refs.component,
			'vui-fileviewer-icon-test'
		);

		expect(ReactDOM.findDOMNode(wrapper[0]).textContent).toBe('FILENAME');
	});

});
