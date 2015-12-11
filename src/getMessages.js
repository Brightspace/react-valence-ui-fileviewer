'use strict';

var languages = {
	'ar-sa': require('./lang/ar-sa.json'),
	'en-ca': require('./lang/en-ca.json'),
	'en-gb': require('./lang/en-gb.json'),
	'en-us': require('./lang/en-us.json'),
	'es-mx': require('./lang/es-mx.json'),
	'fr-ca': require('./lang/fr-ca.json'),
	'ja': require('./lang/ja.json'),
	'ko-kr': require('./lang/ko-kr.json'),
	'pt-br': require('./lang/pt-br.json'),
	'sv-se': require('./lang/sv-se.json'),
	'tr-tr': require('./lang/tr-tr.json'),
	'zh-cn': require('./lang/zh-cn.json'),
	'zh-tw': require('./lang/zh-tw.json')
};

function getMessages(locale) {
	var localeLower = typeof locale === 'string' ? locale.toLowerCase() : locale;
	return (languages[localeLower]) ? languages[localeLower] : languages['en-us'];
}

module.exports = getMessages;
