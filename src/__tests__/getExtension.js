'use strict';

jest.dontMock('../getExtension.js');

var getExtension = require('../getExtension.js');

describe('GetExtension', function() {

	[undefined, null, '', true, {}].forEach(function(path) {
		it('should should return empty string for "' + path + '"', function() {
			var extension = getExtension(path);
			expect(extension).toEqual('');
		});
	});

	it('should return path if no extension', function() {
		var extension = getExtension('foo');
		expect(extension).toEqual('foo');
	});

	it('should return lowercase path if no extension', function() {
		var extension = getExtension('FoO');
		expect(extension).toEqual('foo');
	});

	it('should return extension', function() {
		var extension = getExtension('foo.bar');
		expect(extension).toEqual('bar');
	});

	it('should return last extension', function() {
		var extension = getExtension('foo.bar.bleep.bloop');
		expect(extension).toEqual('bloop');
	});

	it('should return lowercase extension', function() {
		var extension = getExtension('foo.BaR');
		expect(extension).toEqual('bar');
	});

	it('should return extension for path with leading .', function() {
		var extension = getExtension('.foo');
		expect(extension).toEqual('foo');
	});

	it('should return empty string for path with trailing .', function() {
		var extension = getExtension('foo.');
		expect(extension).toEqual('');
	});

});
