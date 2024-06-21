module.exports = {
	// ORIGINAL COMMENT FROM REMOVED KARMA CONFIG:
	// 		There's a pre-test stall on Travis builds that can cause Karma to
	//  	fail with the default timeout of 10s.  I'm not sure what's causing
	//  	the stall, but this mitigates it for now.
	//
	// KEEPING THE TIMEOUT JUST IN CASE
	testTimeout: 30000,
	testEnvironment: "jsdom",
	transform: {
		'^.+\\.js$': 'babel-jest',
	},
	transformIgnorePatterns: [
		"node_modules/(?!(\@?lit|lit-html|lit-element|sinon|react-valence-ui-iframe|react-frau-intl)/)"
	],
	testPathIgnorePatterns: [
		"/__tests__/utils/"
	],
	moduleFileExtensions: ['js', 'jsx', 'json', 'node']
  };
