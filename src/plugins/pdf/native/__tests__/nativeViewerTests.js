'use strict';

var React = require('react/addons'),
	TestUtils = React.addons.TestUtils,
	sinon = require('sinon'),
	NativeViewer = require('../nativeViewer.js');

describe('PDF Native Viewer', function() {

	beforeEach(function() {
		NativeViewer.__Rewire__('GenericViewer', 'div');
	});

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

	it('Calls the progressCallback and passes 0', function() {

		var progressFunc = sinon.stub();

		TestUtils.renderIntoDocument(
			<NativeViewer
				src='test.pdf'
				progressCallback={progressFunc} />
		);

		expect(progressFunc.firstCall.args[0]).toBe(0);
	});

	it('Calls the progressCallback a second time and passes 100', function() {

		var progressFunc = sinon.stub();

		TestUtils.renderIntoDocument(
			<NativeViewer
				src='test.pdf'
				progressCallback={progressFunc} />
		);

		expect(progressFunc.secondCall.args[0]).toBe(100);
	});

	it('Calls the progressCallback both times with certainty none', function() {

		var progressFunc = sinon.stub();

		TestUtils.renderIntoDocument(
			<NativeViewer
				src='test.pdf'
				progressCallback={progressFunc} />
		);

		expect(progressFunc.firstCall.args[1]).toBe('none');
		expect(progressFunc.secondCall.args[1]).toBe('none');
	});
});
