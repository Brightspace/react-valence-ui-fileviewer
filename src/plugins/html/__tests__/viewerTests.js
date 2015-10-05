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

	it('Makes at least one call to the progress callback', function() {

		var called = false;
		var progressFunc = function() { called = true; };

		TestUtils.renderIntoDocument(
			<Viewer
				src='test.html'
				progressCallback={progressFunc} />
		);

		expect(called).toBeTruthy();
	});
});
