'use strict';

jest.dontMock('../image.js');

var ImagePlugin = require('../image.js');

describe('Image Plugin', function() {

	[
		'image/jpeg',
		'image/png',
		'image/gif',
		'image/svg+xml'
	].forEach(function(mimeType) {
		it('should return true for "' + mimeType + '" mime type', function() {
			var value = ImagePlugin.test(mimeType);
			expect(value).toBeTruthy();
		});
	});

	it('should return false for "text/plain" mime type', function() {
		var value = ImagePlugin.test('text/plain');
		expect(value).toBeFalsy();
	});

	it('should return a view', function() {
		var viewer = ImagePlugin.getComponent();
		expect(viewer).toBeDefined();
	});

});
