'use strict';

var languages = {
	'ar': require('./lang/ar.json'),
	'en': require('./lang/en.json'),
	'es': require('./lang/es.json'),
	'fr': require('./lang/fr.json'),
	'ja': require('./lang/ja.json'),
	'ko': require('./lang/ko.json'),
	'pt': require('./lang/pt.json'),
	'sv': require('./lang/sv.json'),
	'tr': require('./lang/tr.json'),
	'zh-cn': require('./lang/zh-CH.json'),
	'zh': require('./lang/zh.json'),
	'zh-tw': require('./lang/zh-TW.json')
};

function getMessages(locale) {
	var defaultLang = languages['en'];
	var localeLower = typeof locale === 'string' ? locale.toLowerCase() : locale;

	if (languages[localeLower]) {
		return languages[localeLower];
	} else {
		if (!localeLower || localeLower === '' || localeLower.length < 2) {
			return defaultLang;
		}
		var baseLang = languages[localeLower.substring(0, 2)];
		return baseLang || defaultLang;
	}
}

module.exports = getMessages;
