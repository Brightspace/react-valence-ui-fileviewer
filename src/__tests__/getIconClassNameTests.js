'use strict';

var getIconClassName = require('../getIconClassName.js');

describe('GetIconClassName', function() {

	[
		{ mimeType: 'application/pdf', result: 'pdf'},
		{ mimeType: 'audio/wav', result: 'audio'},
		{ mimeType: 'audio/mp3', result: 'audio'},
		{ mimeType: 'abc', result: 'unknown'},
		{ mimeType: 'application/msword', result: 'document'},
		{ mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', result: 'document'},
		{ mimeType: 'application/vnd.ms-powerpoint', result: 'presentation'},
		{ mimeType: 'application/vnd.openxmlformats-officedocument.presentationml.presentation', result: 'presentation'},
		{ mimeType: 'application/vnd.ms-excel', result: 'spreadsheet'},
		{ mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', result: 'spreadsheet'},
		{ mimeType: 'application/x-shockwave-flash', result: 'flash'},
		{ mimeType: 'text/xml', result: 'xml'},
		{ mimeType: 'application/zip', result: 'zip'},
		{ mimeType: 'image/png', result: 'image'},
		{ mimeType: 'image/gif', result: 'image'},
		{ mimeType: 'video/mp4', result: 'video'},
		{ mimeType: 'video/wmv', result: 'video'},
		{ mimeType: 'text/text', result: 'text'}
	].forEach(function(item) {
		it('should should return ' + item.result + ' type for "' + item.mimeType + '"', function() {
			var type = getIconClassName(item.mimeType);
			expect(type).toBe(item.result);
		});
	});

});
