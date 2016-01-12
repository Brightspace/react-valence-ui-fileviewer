'use strict';

var React = require('react/addons'),
	TestUtils = React.addons.TestUtils,
	Viewer = require('../viewer.js'),
	sinon = require('sinon'),
	Size = require('../size.js'),
	stubIntlMessage = require('./utils/stubIntlMessage.js');

describe('Generic Viewer', function() {
	var SizeStub,
	ViewerTester;

	beforeEach(function() {
		Viewer.__Rewire__('Filename',  'div');
		Viewer.__Rewire__('Icon', 'div');
		Viewer.__Rewire__('Download', 'div');
		SizeStub = sinon.stub().returns(new Size());
		Viewer.__Rewire__('Size', SizeStub);
		ViewerTester = stubIntlMessage(
			Viewer,
			{},
			function() {return 'test';},
			function() {return 'test';}
		);
	});

	it('should render wrapper with expected class name', function() {
		var elem = TestUtils.renderIntoDocument(
			<ViewerTester mimeType='audio/mp3' size={1234} filename='foo.mp3' />
		);
		var wrapper = TestUtils.findRenderedDOMComponentWithClass(
			elem,
			'vui-fileviewer-generic'
		);
		expect(wrapper).toBeDefined();
	});

	it('should render size component', function() {
		TestUtils.renderIntoDocument(
			<ViewerTester mimeType='audio/mp3' size={1234} filename='foo.mp3' />
		);

		expect(SizeStub.called).toBe(true);
	});

	it('should pass locale to size component', function() {
		var wrapper = TestUtils.renderIntoDocument(
			<ViewerTester mimeType='audio/mp3' locale='en-ca' size={1234} filename='foo.mp3' />
		);
		var sizeComponent = TestUtils.findRenderedComponentWithType(
			wrapper,
			Size
		);

		expect(sizeComponent.props.locale).toBe('en-ca');
	});

	it('should pass size to size component', function() {
		var wrapper = TestUtils.renderIntoDocument(
			<ViewerTester mimeType='audio/mp3' locale='en-ca' size={1234} filename='foo.mp3' />
		);
		var sizeComponent = TestUtils.findRenderedComponentWithType(
			wrapper,
			Size
		);

		expect(sizeComponent.props.value).toBe(1234);
	});
});
