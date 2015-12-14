'use strict';

jest.dontMock('../alternateViewerPage.js');

var React = require('react/addons'),
	TestUtils = React.addons.TestUtils,
	AlternateViewerPage = require('../alternateViewerPage.js');

function getMockPdfPage() {
	var page = {
		getViewport: function() {
			return {
				width: 800,
				height: 600
			};
		},
		render: jest.genMockFunction().mockImpl(function() {
			return {
				promise: Promise.resolve()
			};
		})
	};

	return page;
}

describe('PDF Alternate Viewer Page', function() {
	var page,
		pageWidth,
		pageHeight,
		pixelRatio,
		scale;

	beforeEach(function() {
		page = {
			pageNumber: 1,
			pdfPage: null
		};
		pageWidth = 800;
		pageHeight = 600;
		pixelRatio = 1;
		scale = 1;
	});

	it('should render empty initially', function() {
		var viewerPage = TestUtils.renderIntoDocument(
			<AlternateViewerPage
				page={page}
				pageWidth={pageWidth}
				pageHeight={pageHeight}
				pixelRatio={pixelRatio}
				scale={scale} />
		);
		var elements = TestUtils.scryRenderedDOMComponentsWithClass(
			viewerPage,
			'vui-fileviewer-pdf-alternate-page'
		);
		expect(elements.length).toBe(1);
	});

	it('should render PDF page when one is provided and page has not rendered yet', function() {
		var viewerPage = TestUtils.renderIntoDocument(
			<AlternateViewerPage
				page={page}
				pageWidth={pageWidth}
				pageHeight={pageHeight}
				pixelRatio={pixelRatio}
				scale={scale} />
		);
		var elements = TestUtils.scryRenderedDOMComponentsWithClass(
			viewerPage,
			'vui-fileviewer-pdf-alternate-page'
		);
		expect(elements.length).toBe(1);

		page.pdfPage = getMockPdfPage();
		viewerPage.setProps({
			page: page
		});

		expect(page.pdfPage.render.mock.calls.length).toBe(1);
	});

	it('should not render page if it has already been rendered', function() {
		page.pdfPage = getMockPdfPage();
		var viewerPage = TestUtils.renderIntoDocument(
			<AlternateViewerPage
				page={page}
				pageWidth={pageWidth}
				pageHeight={pageHeight}
				pixelRatio={pixelRatio}
				scale={scale} />
		);
		var elements = TestUtils.scryRenderedDOMComponentsWithClass(
			viewerPage,
			'vui-fileviewer-pdf-alternate-page'
		);
		expect(elements.length).toBe(1);
		expect(page.pdfPage.render.mock.calls.length).toBe(1);

		page.pdfPage.render.mockClear();
		viewerPage.setProps({
			newProp: 'test'
		});

		expect(page.pdfPage.render.mock.calls.length).toBe(0);
	});
});
