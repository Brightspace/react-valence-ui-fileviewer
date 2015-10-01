'use strict';

jest.dontMock('../getIconClassName.js');

var getIconClassName = require('../getIconClassName.js');

describe('GetIconClassName', function() {

	['audio/wav', 'audio/mp3'].forEach(function(mimeType) {
		it('should should return audio icon for "' + mimeType + '"', function() {
			var type = getIconClassName(mimeType);
			expect(type).toEqual('audio');
		});
	});

	['abc'].forEach(function(mimeType) {
		it('should should return unknown type for "' + mimeType + '"', function() {
			var type = getIconClassName(mimeType);
			expect(type).toEqual('unknown');
		});
	});

});
