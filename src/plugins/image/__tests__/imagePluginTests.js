'use strict';

var ImagePlugin = require('../image.js'),
	mimeTypes = require('../mimeTypes.js');

describe('Image Plugin', function() {

	mimeTypes.forEach(function(mimeType) {
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
