'use strict';

jest.dontMock('../getIconClassName.js');
jest.dontMock('../plugins/generic/icon.js');
jest.dontMock('../plugins/generic/viewer.js');

var React = require('react/addons'),
	TestUtils = React.addons.TestUtils,
	Generic = require('../plugins/generic/viewer.js');

describe('Generic', function() {
	it('Renders the audio icon for a .mp3 file', function() {

		var elem = TestUtils.renderIntoDocument(
			<Generic mimeType='audio/mp3' />
		);

		var audioIcons = TestUtils.scryRenderedDOMComponentsWithClass(elem, 'vui-fileviewer-icon-audio');
		expect(audioIcons.length).toEqual(1);
	});
});
