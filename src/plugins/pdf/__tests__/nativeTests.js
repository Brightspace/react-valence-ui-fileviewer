'use strict';

jest.dontMock('../native.js');

var native = require('../native.js'),
	supportsNativePdf = require('../supportsNativePdf.js');

describe('PDF Native Plugin', function() {

	it('does not handle non-PDF files', function() {
		supportsNativePdf.mockImpl(function() { return true; });
		var result = native.test('foo');
		expect(result).toBeFalsy();
	});

	it('does not handle PDF files if no native support', function() {
		supportsNativePdf.mockImpl(function() { return false; });
		var result = native.test('pdf');
		expect(result).toBeFalsy();
	});

	it('does handle PDF files if native support', function() {
		supportsNativePdf.mockImpl(function() { return true; });
		var result = native.test('pdf');
		expect(result).toBeTruthy();
	});

	it('returns a viewer', function() {
		var viewer = native.getComponent();
		expect(viewer).toBeDefined();
	});

});
