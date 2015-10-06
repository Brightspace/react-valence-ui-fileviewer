'use strict';

jest.dontMock('../viewer.js');

var React = require('react/addons'),
	TestUtils = React.addons.TestUtils,
	Viewer = require('../viewer.js');

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

});
