'use strict';

jest.dontMock('../nativeViewer.js');

var React = require('react/addons'),
	TestUtils = React.addons.TestUtils,
	NativeViewer = require('../nativeViewer.js');

describe('PDF Native Viewer', function() {
	it('should test things eventually', function() {
		var elem = TestUtils.renderIntoDocument(
			<NativeViewer src='some/path' />
		);
		var div = TestUtils.scryRenderedDOMComponentsWithClass(
			elem,
			'vui-fileviewer-pdf-native'
		);
		expect(div.length).toBe(1);
	});
});
