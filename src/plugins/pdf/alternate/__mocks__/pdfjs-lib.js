'use strict';

var PDFJS = {
	getDocument: jest.genMockFunction().mockImpl(
		function() {
			return Promise.resolve(
				{
					getPage: jest.genMockFunction().mockImpl(function() {
						return Promise.resolve({
							getViewport: jest.genMockFunction().mockImpl(function() {
								return {
									width: 800,
									height: 600
								};
							}),
							render: jest.genMockFunction().mockImpl(function() {
								return {
									promise: Promise.resolve()
								};
							})
						});
					}),
					numPages: 2
				});
		}
	),
	PDFLinkService: jest.genMockFunction().mockImpl(function() {
		/* eslint no-invalid-this: 0 */
		this.setDocument = jest.genMockFunction();
		this.setViewer = jest.genMockFunction();
	}),
	PDFViewer: jest.genMockFunction().mockImpl(function() {
		/* eslint no-invalid-this: 0 */
		this.setDocument = jest.genMockFunction();
		this.currentScale = '';
	})
};

module.exports = PDFJS;
