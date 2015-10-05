'use strict';

jest.dontMock('../generic.js');

var GenericPlugin = require('../generic.js');

describe('Generic Plugin', function() {

	it('should return true for "test" always', function() {
		var value = GenericPlugin.test();
		expect(value).toBeTruthy();
	});

	it('should return a view', function() {
		var viewer = GenericPlugin.getComponent();
		expect(viewer).toBeDefined();
	});

});
