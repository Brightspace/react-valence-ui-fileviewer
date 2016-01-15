'use strict';

var native = require('../native.js');

describe('PDF Native Plugin', function() {

	it('does not handle non-PDF files', function() {
		native.__Rewire__('supportsNativePdf', function() { return true; });
		var result = native.test('foo/bar');
		expect(result).toBeFalsy();
	});

	it('does not handle PDF files if no native support', function() {
		native.__Rewire__('supportsNativePdf', function() { return false; });
		var result = native.test('application/pdf');
		expect(result).toBeFalsy();
	});

	it('does handle PDF files if native support', function() {
		native.__Rewire__('supportsNativePdf', function() { return true; });
		var result = native.test('application/pdf');
		expect(result).toBeTruthy();
	});

	it('returns a viewer', function() {
		var viewer = native.getComponent();
		expect(viewer).toBeDefined();
	});

});
