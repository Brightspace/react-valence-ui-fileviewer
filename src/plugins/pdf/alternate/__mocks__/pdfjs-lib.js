'use strict';

window.PDFJS = {
	getDocument: jest.genMockFunction().mockImpl(
		function() {
			return Promise.resolve(
				{
					getPage: jest.genMockFunction().mockImpl(function() {
						return Promise.resolve();
					})
				});
		}
	),
	workerSrc: ''
};
