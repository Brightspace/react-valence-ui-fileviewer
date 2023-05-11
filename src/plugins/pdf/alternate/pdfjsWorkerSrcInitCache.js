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

export default {
	clear: clear,
	get: get,
	set: set
};
