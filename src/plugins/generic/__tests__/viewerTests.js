'use strict';

jest.dontMock('../viewer.js');

var React = require('react/addons'),
	TestUtils = React.addons.TestUtils,
	Viewer = require('../viewer.js'),
	Size = require('../size.js');

describe('Generic Viewer', function() {

	it('should render wrapper with expected class name', function() {
		var elem = TestUtils.renderIntoDocument(
			<Viewer mimeType='audio/mp3' size={1234} filename='foo.mp3' />
		);
		var wrapper = TestUtils.findRenderedDOMComponentWithClass(
			elem,
			'vui-fileviewer-generic'
		);
		expect(wrapper).toBeDefined();
	});

	it('should render size component', function() {
		TestUtils.renderIntoDocument(
			<Viewer mimeType='audio/mp3' size={1234} filename='foo.mp3' />
		);

		expect(Size).toBeCalled();
	});

	it('should pass locale to size component', function() {
		var wrapper = TestUtils.renderIntoDocument(
			<Viewer mimeType='audio/mp3' locale='en-ca' size={1234} filename='foo.mp3' />
		);
		var sizeComponent = TestUtils.findRenderedComponentWithType(
			wrapper,
			Size
		);

		expect(sizeComponent.props.locale).toBe('en-ca');
	});

	it('should pass size to size component', function() {
		var wrapper = TestUtils.renderIntoDocument(
			<Viewer mimeType='audio/mp3' locale='en-ca' size={1234} filename='foo.mp3' />
		);
		var sizeComponent = TestUtils.findRenderedComponentWithType(
			wrapper,
			Size
		);

		expect(sizeComponent.props.value).toBe(1234);
	});
});
