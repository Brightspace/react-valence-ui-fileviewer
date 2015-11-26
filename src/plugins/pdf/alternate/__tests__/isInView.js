'use strict';

jest.dontMock('../isInView.js');

var isInView = require('../isInView');

var element = {
	offsetTop: 100,
	offsetHeight: 20
};

describe('isInView', function() {
	it('should consider the element in view if it is fully within the visible area', function() {
		var result = isInView(element, 50, 1000);

		expect(result).toBeTruthy();
	});

	it('should consider the element in view if it represents the totality of the visible area', function() {
		var result = isInView(element, 100, 120);

		expect(result).toBeTruthy();
	});

	it('should consider the element in view if the top is above the visible area but the bottom is within the area', function() {
		var result = isInView(element, 110, 1000);

		expect(result).toBeTruthy();
	});

	it('should consider the element in view if the top is above the visible area but the bottom is exactly at the top of the visible area', function() {
		var result = isInView(element, 120, 1000);

		expect(result).toBeTruthy();
	});

	it('should consider the element in view if the bottom is below the visible area but the top is within the area', function() {
		var result = isInView(element, 95, 105);

		expect(result).toBeTruthy();
	});

	it('should consider the element in view if the bottom is below the visible area but the top is exactly at the bottom of the visible area', function() {
		var result = isInView(element, 0, 100);

		expect(result).toBeTruthy();
	});

	it('should consider the element in view if the top is above the visible area and the bottom is below the visible area', function() {
		var result = isInView(element, 105, 115);

		expect(result).toBeTruthy();
	});

	it('should consider the element to not be in view if the top and bottom are both above the visible area', function() {
		var result = isInView(element, 121, 1000);

		expect(result).toBeFalsy();
	});

	it('should consider the element to not be in view if the top and bottom are both below the visible area', function() {
		var result = isInView(element, 0, 90);

		expect(result).toBeFalsy();
	});
});
