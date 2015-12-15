'use strict';

var languages = {
	'ar-sa': require('./lang/compiled/ar-SA.json'),
	'ar': require('./lang/compiled/ar.json'),
	'en-ca': require('./lang/compiled/en-CA.json'),
	'en': require('./lang/compiled/en.json'),
	'en-gb': require('./lang/compiled/en-GB.json'),
	'en-us': require('./lang/compiled/en-US.json'),
	'es-mx': require('./lang/compiled/es-MX.json'),
	'es': require('./lang/compiled/es.json'),
	'fr-ca': require('./lang/compiled/fr-CA.json'),
	'fr': require('./lang/compiled/fr.json'),
	'ja': require('./lang/compiled/ja.json'),
	'ko-kr': require('./lang/compiled/ko-KR.json'),
	'ko': require('./lang/compiled/ko.json'),
	'pt-br': require('./lang/compiled/pt-BR.json'),
	'pt': require('./lang/compiled/pt.json'),
	'sv-se': require('./lang/compiled/sv-SE.json'),
	'sv': require('./lang/compiled/sv.json'),
	'tr-tr': require('./lang/compiled/tr-TR.json'),
	'tr': require('./lang/compiled/tr.json'),
	'zh-cn': require('./lang/compiled/zh-CH.json'),
	'zh': require('./lang/compiled/zh.json'),
	'zh-tw': require('./lang/compiled/zh-TW.json')
};

function getMessages(locale) {
	var localeLower = typeof locale === 'string' ? locale.toLowerCase() : locale;
	return (languages[localeLower]) ? languages[localeLower] : languages['en-us'];
}

module.exports = getMessages;
