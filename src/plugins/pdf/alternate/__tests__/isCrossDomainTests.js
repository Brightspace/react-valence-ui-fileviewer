'use strict';

var isCrossDomain = require('../isCrossDomain');

describe('isCrossDomain', function() {
	beforeEach(function() {
		isCrossDomain.__Rewire__('getHref', function() { return 'https://s.brightspace.com/lib/pdf.js/pdf.worker.js'; });
	});

	it('should be false when protocol, host name, and port are the same', function() {
		expect(isCrossDomain('https://s.brightspace.com/lib/pdf.js/pdf.worker.js')).toEqual(false);
	});

	it('should be true when protocols differ', function() {
		expect(isCrossDomain('http://s.brightspace.com/lib/pdf.js/pdf.worker.js')).toEqual(true);
	});

	it('should be true when host names differ', function() {
		expect(isCrossDomain('https://www.brightspace.com/lib/pdf.js/pdf.worker.js')).toEqual(true);
	});

	it('should be true when ports differ', function() {
		expect(isCrossDomain('https://s.brightspace.com:1234/lib/pdf.js/pdf.worker.js')).toEqual(true);
	});

	it('should be false when url is not a string', function() {
		expect(isCrossDomain(1)).toEqual(false);
		expect(isCrossDomain([])).toEqual(false);
		expect(isCrossDomain({})).toEqual(false);
	});
});
