'use strict';

var cachedResult = null;

function get() {
	return cachedResult;
}

function set(val) {
	cachedResult = val;
}

function clear() {
	cachedResult = null;
}

module.exports = {
	clear: clear,
	get: get,
	set: set
};
