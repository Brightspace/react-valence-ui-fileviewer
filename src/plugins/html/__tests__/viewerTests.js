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

	it('Calls the progressCallback and passes 100 in as the value', function() {

		var progressFunc = jest.genMockFunction();

		TestUtils.renderIntoDocument(
			<Viewer
				src='test.html'
				progressCallback={progressFunc} />
		);

		expect(progressFunc.mock.calls[0][0]).toBe(100);
	});
});
