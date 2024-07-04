'use strict';

var plugin = require('../native.js');

describe('PDF Native Plugin', function() {

	it('does not handle non-PDF files', function() {
		plugin.__Rewire__('supportsNativePdf', function() { return true; });
		var result = plugin.test('foo/bar');
		expect(result).toBeFalsy();
	});

	it('does not handle PDF files if no native support', function() {
		plugin.__Rewire__('supportsNativePdf', function() { return false; });
		var result = plugin.test('application/pdf');
		expect(result).toBeFalsy();
	});

	it('does handle PDF files if native support', function() {
		plugin.__Rewire__('supportsNativePdf', function() { return true; });
		var result = plugin.test('application/pdf');
		expect(result).toBeTruthy();
	});

	it('returns a viewer', function() {
		var viewer = plugin.getComponent({src: 'test'});
		expect(viewer).toBeDefined();
	});

});
