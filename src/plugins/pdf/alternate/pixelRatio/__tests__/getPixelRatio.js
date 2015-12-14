'use strict';

jest.dontMock('../getPixelRatio.js');

var getPixelRatio = require('../getPixelRatio'),
	getDevicePixelRatio = require('../getDevicePixelRatio'),
	getBackingStorePixelRatio = require('../getBackingStorePixelRatio');

describe('getPixelRatio', function() {

	it('should get the device pixel ratio', function() {
		getPixelRatio();
		expect(getDevicePixelRatio).toBeCalled();
	});

	it('should get the backing store pixel ratio', function() {
		getPixelRatio();
		expect(getBackingStorePixelRatio).toBeCalled();
	});

	it ('should return the devicePixelRatio divided by the backingStorePixelRatio', function() {
		getDevicePixelRatio.mockImpl(function() {
			return 3;
		});
		getBackingStorePixelRatio.mockImpl(function() {
			return 2;
		});

		expect(getPixelRatio()).toEqual(3 / 2);
	});
});
