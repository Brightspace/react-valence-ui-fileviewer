var isDev = process.env.NODE_ENV === 'development';

const puppeteer = require('puppeteer');
process.env.CHROME_BIN = puppeteer.executablePath();

var babelify = ['babelify', {
	plugins: ['babel-plugin-rewire']
}];
var istanbul = ['browserify-istanbul', {
	ignore: ['**/node_modules/**', '**/test/**', '**/__tests__/**']
}];

module.exports = function(config) {
	config.set({
		coverageReporter: {
			dir : 'coverage',
			reporters: [
				{ type: 'text' },
				{ type: 'lcov' }
			]
		},
		browserify: {
			debug: isDev,
			extensions: ['.js'],
			transform: isDev ? [babelify] : [babelify, istanbul],
			plugin: ['esmify']
		},
		// There's a pre-test stall on Travis builds that can cause Karma to
		//  fail with the default timeout of 10s.  I'm not sure what's causing
		//  the stall, but this mitigates it for now.
		browserNoActivityTimeout: 30000,
		browsers: ['ChromeHeadless'],
		files: [
			'./src/**/__tests__/**/*.js'
		],
		frameworks: ['browserify', 'jasmine'],
		// level of logging
		// possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
		logLevel: config.LOG_INFO,
		port: 9877,
		preprocessors: {
			'./src/**/__tests__/**/*.js': ['browserify']
		},
		//'services/*.tests.js': [ 'browserify' ]
		reporters : ['progress', 'coverage']
	});
};
