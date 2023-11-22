'use strict';

var supportsNativePdf = require('../supportsNativePdf.js');

describe('PDF Native Support', function() {

	beforeEach(function() {
		window.ActiveXObject = undefined;
	});

	it('should return false if no mimeType entry', function() {
		navigator.mimeTypes['application/pdf'] = undefined;
		var result = supportsNativePdf();
		expect(result).toBeFalse();
	});

	it('should return true if mimeType entry present', function() {
		navigator.mimeTypes['application/pdf'] = {};
		var result = supportsNativePdf();
		expect(result).toBeTruthy();
	});

	it('should return true if ActiveXObject does not throw', function() {
		window.ActiveXObject = function() {};
		var result = supportsNativePdf();
		expect(result).toBeTruthy();
	});

	it('should return true for Microsoft Edge', function() {
		var result = supportsNativePdf(undefined, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.10240');
		expect(result).toBeTruthy();
	});

	['iphone', 'iPad', 'IPOD'].forEach(function(platform) {
		it('should return false for iOS device ' + platform, function() {
			navigator.mimeTypes['application/pdf'] = {};
			var result = supportsNativePdf(platform);
			expect(result).toBeFalsy();
		});
	});

});
