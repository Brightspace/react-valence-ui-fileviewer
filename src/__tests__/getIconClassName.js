'use strict';

jest.dontMock('../getIconClassName.js');

var getIconClassName = require('../getIconClassName.js');

describe('GetIconClassName', function() {

	['wav', 'mp3'].forEach(function(extension) {
		it('should should return audio icon for "' + extension + '"', function() {
			var type = getIconClassName(extension);
			expect(type).toEqual('audio');
		});
	});

	['abc'].forEach(function(extension) {
		it('should should return generic type for "' + extension + '"', function() {
			var type = getIconClassName(extension);
			expect(type).toEqual('generic');
		});
	});

});
