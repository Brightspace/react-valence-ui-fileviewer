'use strict';

jest.dontMock('../viewer.js');

var React = require('react/addons'),
	TestUtils = React.addons.TestUtils,
	Viewer = require('../viewer.js');

describe('HTML Viewer', function() {
	it('should test things eventually', function() {
		var elem = TestUtils.renderIntoDocument(
			<Viewer src='foo.bar' />
		);
		var wrapper = TestUtils.scryRenderedDOMComponentsWithClass(
			elem,
			'vui-fileviewer-html-native'
		);
		expect(wrapper.length).toBe(1);
	});

	it('Calls the progressCallback twice with values 0 then 100', function() {

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
