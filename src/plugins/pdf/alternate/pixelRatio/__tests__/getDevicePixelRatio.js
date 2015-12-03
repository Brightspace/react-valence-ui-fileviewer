'use strict';

jest.dontMock('../getDevicePixelRatio.js');

var getDevicePixelRatio = require('../getDevicePixelRatio');

describe('getDevicePixelRatio', function() {

	it('should default to 1 if there is no window provided', function() {
		expect(getDevicePixelRatio()).toEqual(1);
	});

	it('should default to 1 if there is no window.devicePixelRatio', function() {

		var myWindow = {};

		expect(getDevicePixelRatio(myWindow)).toEqual(1);
	});

	it ('should return the window.devicePixelRatio', function() {
		var myWindow = {
			devicePixelRatio: 2
		};

		expect(getDevicePixelRatio(myWindow)).toEqual(2);
	});
});
