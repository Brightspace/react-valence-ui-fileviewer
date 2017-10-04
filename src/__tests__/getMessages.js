'use strict';

var getMessages = require('../getMessages.js');

describe('getMessages', function() {
	[
		{ locale: undefined, output: 'Download' },
		{ locale: '', output: 'Download' },
		{ locale: 'd', output: 'Download' },
		{ locale: 'QQQQQQQQQ', output: 'Download' },
		{ locale: null, output: 'Download' },
		{ locale: 'ar', output: 'تنزيل' },
		{ locale: 'Ar-SA', output: 'تنزيل' },
		{ locale: 'ar-sa', output: 'تنزيل' },
		{ locale: 'en', output: 'Download' },
		{ locale: 'en-ca', output: 'Download' },
		{ locale: 'en-gb', output: 'Download' },
		{ locale: 'en-us', output: 'Download' },
		{ locale: 'es-mx', output: 'Descargar' },
		{ locale: 'es', output: 'Descargar' },
		{ locale: 'fr-ca', output: 'Télécharger' },
		{ locale: 'fr', output: 'Télécharger' },
		{ locale: 'ja', output: 'ダウンロード' },
		{ locale: 'ko-kr', output: '다운로드' },
		{ locale: 'ko', output: '다운로드' },
		{ locale: 'nl', output: 'Downloaden' },
		{ locale: 'pt-br', output: 'Baixar' },
		{ locale: 'pt', output: 'Baixar' },
		{ locale: 'sv-se', output: 'Hämta' },
		{ locale: 'sv', output: 'Hämta' },
		{ locale: 'tr-tr', output: 'İndir' },
		{ locale: 'tr', output: 'İndir' },
		{ locale: 'zh-cn', output: '下载' },
		{ locale: 'zh', output: '下载' },
		{ locale: 'zh-tw', output: '下載' }
	].forEach(function(val) {
		it('Should return: ' + val.output + ' for the locale: ' + val.locale, function() {
			expect(getMessages(val.locale).Plugins.Generic.Download).toBe(val.output);
		});
	});
});
