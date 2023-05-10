import ar from './lang/ar.json';
import en from './lang/en.json';
import es from './lang/es.json';
import fr from './lang/fr.json';
import ja from './lang/ja.json';
import ko from './lang/ko.json';
import nl from './lang/nl.json';
import pt from './lang/pt.json';
import sv from './lang/sv.json';
import tr from './lang/tr.json';
import zh_cn from './lang/zh-CN.json';
import zh from './lang/zh.json';
import zh_tw from './lang/zh-TW.json';

var languages = {
	'ar': ar,
	'en': en,
	'es': es,
	'fr': fr,
	'ja': ja,
	'ko': ko,
	'nl': nl,
	'pt': pt,
	'sv': sv,
	'tr': tr,
	'zh-cn': zh_cn,
	'zh': zh,
	'zh-tw': zh_tw
};

function getMessages(locale) {
	var defaultLang = languages['en'];

	if (typeof locale !== 'string') {
		return defaultLang;
	}

	var localeLower = locale.toLowerCase();

	if (languages[localeLower]) {
		return languages[localeLower];
	}

	var baseLang = languages[localeLower.substring(0, 2)];
	return baseLang || defaultLang;
}

export default getMessages;
