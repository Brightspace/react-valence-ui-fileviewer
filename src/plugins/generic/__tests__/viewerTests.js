'use strict';

jest.dontMock('../../../getIconClassName.js');
jest.dontMock('../download.js');
jest.dontMock('../filename.js');
jest.dontMock('../icon.js');
jest.dontMock('../size.js');
jest.dontMock('../viewer.js');

var React = require('react/addons'),
	TestUtils = React.addons.TestUtils,
	Viewer = require('../viewer.js');

describe('Generic Viewer', function() {
	it('Renders the audio icon for a .mp3 file', function() {
		var elem = TestUtils.renderIntoDocument(
			<Viewer mimeType='audio/mp3' size={1234} />
		);
		var audioIcons = TestUtils.scryRenderedDOMComponentsWithClass(
			elem,
			'vui-fileviewer-icon-audio'
		);
		expect(audioIcons.length).toEqual(1);
	});
});
