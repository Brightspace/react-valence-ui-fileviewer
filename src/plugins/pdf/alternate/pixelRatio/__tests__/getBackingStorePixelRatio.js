'use strict';

jest.dontMock('../getBackingStorePixelRatio');

var getBackingStorePixelRatio = require('../getBackingStorePixelRatio'),
	getViewerContext = require('../getViewerContext');

describe('getBackingStorePixelRatio', function() {

	beforeEach(function() {
		getViewerContext.mockClear();
	});

	it('should get the viewer context', function() {
		getBackingStorePixelRatio();
		expect(getViewerContext).toBeCalled();
	});

	it('should return 1 if no context is available', function() {
		expect(getBackingStorePixelRatio()).toEqual(1);
	});

	it('should return 1 if a context is available but no backing store pixel ratio is provided on the context', function() {
		getViewerContext.mockImpl(function() {
			return {};
		});
		expect(getBackingStorePixelRatio()).toEqual(1);
	});

	it('should return the non-vendor backing store pixel ratio if no vendor specific values provided', function() {
		getViewerContext.mockImpl(function() {
			return {
				backingStorePixelRatio: 2
			};
		});
		expect(getBackingStorePixelRatio()).toEqual(2);
	});

	it('should return the webkit-vendor backing store pixel ratio if provided', function() {
		getViewerContext.mockImpl(function() {
			return {
				webkitBackingStorePixelRatio: 3,
				backingStorePixelRatio: 2
			};
		});
		expect(getBackingStorePixelRatio()).toEqual(3);
	});

	it('should return the moz-vendor backing store pixel ratio if provided', function() {
		getViewerContext.mockImpl(function() {
			return {
				mozBackingStorePixelRatio: 3,
				backingStorePixelRatio: 2
			};
		});
		expect(getBackingStorePixelRatio()).toEqual(3);
	});

	it('should return the ms-vendor backing store pixel ratio if provided', function() {
		getViewerContext.mockImpl(function() {
			return {
				msBackingStorePixelRatio: 3,
				backingStorePixelRatio: 2
			};
		});
		expect(getBackingStorePixelRatio()).toEqual(3);
	});

	it('should return the o-vendor backing store pixel ratio if provided', function() {
		getViewerContext.mockImpl(function() {
			return {
				oBackingStorePixelRatio: 3,
				backingStorePixelRatio: 2
			};
		});
		expect(getBackingStorePixelRatio()).toEqual(3);
	});
});
