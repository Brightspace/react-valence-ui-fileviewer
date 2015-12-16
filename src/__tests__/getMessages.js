'use strict';

jest.dontMock('../getMessages.js');

var getMessages = require('../getMessages.js');

describe('getMessages', function() {
	it('should default to english', function() {
		var messages = getMessages();

		expect(messages.Plugins.Generic.Download).toBe('Download');
	});

	it('should default to english on empty string', function() {
		var messages = getMessages('');

		expect(messages.Plugins.Generic.Download).toBe('Download');
	});

	it('should default to english on invalid short string', function() {
		var messages = getMessages('q');

		expect(messages.Plugins.Generic.Download).toBe('Download');
	});

	it('should be case insensitive', function() {
		var messages = getMessages('Fr-cA');

		expect(messages.Plugins.Generic.Download).toBe('Téléverser');
	});

	it('should support ar-sa', function() {
		var messages = getMessages('ar-sa');

		expect(messages.Plugins.Generic.Download).toBe('تنزيل');
	});

	it('should support ar', function() {
		var messages = getMessages('ar');

		expect(messages.Plugins.Generic.Download).toBe('تنزيل');
	});

	it('should support en', function() {
		var messages = getMessages('en');

		expect(messages.Plugins.Generic.Download).toBe('Download');
	});

	it('should support en-ca', function() {
		var messages = getMessages('en-ca');

		expect(messages.Plugins.Generic.Download).toBe('Download');
	});

	it('should support en-gb', function() {
		var messages = getMessages('en-gb');

		expect(messages.Plugins.Generic.Download).toBe('Download');
	});

	it('should support es-mx', function() {
		var messages = getMessages('es-mx');

		expect(messages.Plugins.Generic.Download).toBe('Descargar');
	});

	it('should support es', function() {
		var messages = getMessages('es');

		expect(messages.Plugins.Generic.Download).toBe('Descargar');
	});

	it('should support fr-ca', function() {
		var messages = getMessages('fr-ca');

		expect(messages.Plugins.Generic.Download).toBe('Téléverser');
	});

	it('should support fr', function() {
		var messages = getMessages('fr');

		expect(messages.Plugins.Generic.Download).toBe('Téléverser');
	});

	it('should support ja', function() {
		var messages = getMessages('ja');

		expect(messages.Plugins.Generic.Download).toBe('ダウンロード');
	});

	it('should support ko-kr', function() {
		var messages = getMessages('ko-kr');

		expect(messages.Plugins.Generic.Download).toBe('다운로드');
	});

	it('should support ko', function() {
		var messages = getMessages('ko');

		expect(messages.Plugins.Generic.Download).toBe('다운로드');
	});

	it('should support pt-br', function() {
		var messages = getMessages('pt-br');

		expect(messages.Plugins.Generic.Download).toBe('Baixar');
	});

	it('should support pt', function() {
		var messages = getMessages('pt');

		expect(messages.Plugins.Generic.Download).toBe('Baixar');
	});

	it('should support sv-se', function() {
		var messages = getMessages('sv-se');

		expect(messages.Plugins.Generic.Download).toBe('Ladda ned');
	});

	it('should support sv', function() {
		var messages = getMessages('sv');

		expect(messages.Plugins.Generic.Download).toBe('Ladda ned');
	});

	it('should support tr-tr', function() {
		var messages = getMessages('tr-tr');

		expect(messages.Plugins.Generic.Download).toBe('İndir');
	});

	it('should support tr', function() {
		var messages = getMessages('tr');

		expect(messages.Plugins.Generic.Download).toBe('İndir');
	});

	it('should support zh-cn', function() {
		var messages = getMessages('zh-cn');

		expect(messages.Plugins.Generic.Download).toBe('下载');
	});

	it('should support zh', function() {
		var messages = getMessages('zh');

		expect(messages.Plugins.Generic.Download).toBe('下载');
	});

	it('should support zh-tw', function() {
		var messages = getMessages('zh-tw');

		expect(messages.Plugins.Generic.Download).toBe('下載');
	});
});
