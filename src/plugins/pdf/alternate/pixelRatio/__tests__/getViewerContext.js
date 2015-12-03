'use strict';

jest.dontMock('../getViewerContext.js');

var getViewerContext = require('../getViewerContext');

var getContext = jest.genMockFunction();
var createElement = jest.genMockFunction().mockImpl(function() {
	return {
		getContext: getContext
	};
});

document.createElement = createElement;

describe('getViewerContext', function() {

	beforeEach(function() {
		getContext.mockClear();
		createElement.mockClear();
	});

	it('should create a canvas element on the document', function() {
		getViewerContext();

		expect(document.createElement).toBeCalledWith('canvas');
	});

	it('should get the 2d context of the created canvas element', function() {
		getViewerContext();

		expect(getContext).toBeCalledWith('2d');
	});
});
