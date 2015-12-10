'use strict';

var languages = {
	'en': require('./lang/en.json')
};

function getMessages(lang) {
	return (languages[lang]) ? languages[lang] : languages.en;
}

module.exports = getMessages;
