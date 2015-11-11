'use strict';

jest.dontMock('../nativeViewer.js');

var React = require('react/addons'),
	TestUtils = React.addons.TestUtils,
	NativeViewer = require('../nativeViewer.js');

describe('PDF Native Viewer', function() {
	it('should test things eventually', function() {
		var elem = TestUtils.renderIntoDocument(
			<NativeViewer src='some/path' />
		);
		var div = TestUtils.scryRenderedDOMComponentsWithClass(
			elem,
			'vui-fileviewer-pdf-native'
		);
		expect(div.length).toBe(1);
	});

	it('Calls the progressCallback and passes 100 in as the value', function() {

		var progressFunc = jest.genMockFunction();

		TestUtils.renderIntoDocument(
			<NativeViewer
				src='test.pdf'
				progressCallback={progressFunc} />
		);

		expect(progressFunc.mock.calls.length).toBe(1);
		expect(progressFunc.mock.calls[0][0]).toBe(100);
	});

	it('should resize to the window height when no chromeElement is passed in', function() {
		var setState = jest.genMockFunction();
		NativeViewer.prototype.setState = setState;

		TestUtils.renderIntoDocument(
			<NativeViewer src='foo.bar' />
		);

		expect(setState).toBeCalledWith({ height : window.innerHeight });
	});

	it('should resize to the window height minus the height of the chromeElement', function() {
		var setState = jest.genMockFunction();
		NativeViewer.prototype.setState = setState;
		var chromeHeight = 50;

		var chrome = {
			getBoundingClientRect : function() {
				return {height : chromeHeight};
			}
		};

		TestUtils.renderIntoDocument(
			<NativeViewer src='foo.bar' chromeElement={chrome} />
		);

		expect(setState).toBeCalledWith({ height : window.innerHeight - chromeHeight });
	});
});
