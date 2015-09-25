'use strict';

jest.dontMock('../getExtension.js');
jest.dontMock('../plugins/generic.js');

var React = require('react/addons'),
	TestUtils = React.addons.TestUtils,
	Generic = require('../plugins/generic.js');

describe('Generic', function() {
	it('Renders the image icon for a .jpg file', function() {
		var genericViewer = Generic.getComponent('foo.jpg');
		var elem = TestUtils.renderIntoDocument(
			genericViewer
		);

		var imageIcons = TestUtils.scryRenderedDOMComponentsWithClass(elem, 'vui-icon-file-image-large');
		expect(imageIcons.length).toEqual(1);
	});
});
