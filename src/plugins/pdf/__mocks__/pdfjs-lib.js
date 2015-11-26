'use strict';

window.PDFJS = {
	getDocument: jest.genMockFunction().mockImpl(
		function() {
			return Promise.resolve(function() {
				return {
					getPage: jest.genMockFunction().mockImpl(function() {
						return Promise.resolve();
					})
				};
			});
		}
	),
	workerSrc: ''
};
