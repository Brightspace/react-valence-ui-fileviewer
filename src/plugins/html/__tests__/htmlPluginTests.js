'use strict';

var HtmlPlugin = require('../html.js');

describe('Html Plugin', function() {

	it('should return true for "text/html" mime type', function() {
		var value = HtmlPlugin.test('text/html');
		expect(value).toBeTruthy();
	});

	it('should return false for "text/plain" mime type', function() {
		var value = HtmlPlugin.test('text/plain');
		expect(value).toBeFalsy();
	});

	it('should return a view', function() {
		var viewer = HtmlPlugin.getComponent();
		expect(viewer).toBeDefined();
	});

});
