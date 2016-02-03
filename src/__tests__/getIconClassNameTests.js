'use strict';

var getIconClassName = require('../getIconClassName.js');

describe('GetIconClassName', function() {

	[
		{ mimeType: 'application/pdf', result: 'pdf'},
		{ mimeType: 'audio/wav', result: 'audio'},
		{ mimeType: 'audio/mp3', result: 'audio'},
		{ mimeType: 'abc', result: 'unknown'},
		{ mimeType: 'aplication/msword', result: 'document'},
		{ mimeType: 'aplication/vnd.openxmlformats-officedocument.wordprocessingml.document', result: 'document'},
		{ mimeType: 'aplication/ms-powerpoint', result: 'presentation'},
		{ mimeType: 'aplication/vnd.openxmlformats-officedocument.presentationml.presentation', result: 'presentation'},
		{ mimeType: 'aplication/vnd.ms-excel', result: 'spreadsheet'},
		{ mimeType: 'aplication/vnd.openxmlformats-officedocument.spreadsheetml.sheet', result: 'spreadsheet'},
		{ mimeType: 'application/x-shockwave-flash', result: 'flash'},
		{ mimeType: 'text/xml', result: 'xml'},
		{ mimeType: 'application/zip', result: 'zip'},
		{ mimeType: 'image/png', result: 'image'},
		{ mimeType: 'image/gif', result: 'image'},
		{ mimeType: 'videp/mp4', result: 'video'},
		{ mimeType: 'video/wmv', result: 'video'},
		{ mimeType: 'text/text', result: 'text'}
	].forEach(function(item) {
		it('should should return ' + item.result + ' type for "' + item.mimeType + '"', function() {
			var type = getIconClassName(item.mimeType);
			expect(type).toBe(item.result);
		});
	});

});
