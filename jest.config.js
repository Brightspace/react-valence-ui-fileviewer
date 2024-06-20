module.exports = {
	  setupFilesAfterEnv: [

	  ],
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
