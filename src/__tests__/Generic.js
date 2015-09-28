'use strict';

jest.dontMock('../getExtension.js');
jest.dontMock('../getIconClassName.js');
jest.dontMock('../plugins/generic.js');

var React = require('react/addons'),
	TestUtils = React.addons.TestUtils,
	Generic = require('../plugins/generic.js');

describe('Generic', function() {
	it('Renders the audio icon for a .mp3 file', function() {

		var genericViewer = Generic.getComponent('foo.mp3');
		var elem = TestUtils.renderIntoDocument(
			genericViewer
		);

		var audioIcons = TestUtils.scryRenderedDOMComponentsWithClass(elem, 'vui-fileviewer-icon-audio');
		expect(audioIcons.length).toEqual(1);
	});
});
