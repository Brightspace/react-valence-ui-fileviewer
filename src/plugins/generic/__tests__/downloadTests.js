'use strict';

var React = require('react/addons'),
	TestUtils = React.addons.TestUtils,
	Download = require('../download.js'),
	sinon = require('sinon'),
	stubIntlMessage = require('./utils/stubIntlMessage');

describe('Generic Download View', function() {
	var DownloadTester,
		downloadStub;

	beforeEach(function() {
		downloadStub = sinon.stub();
		Download.prototype.__reactAutoBindMap.download = downloadStub;

		DownloadTester = stubIntlMessage(
			Download,
			{},
			function() {return 'Download';},
			function() {return 'Download';}
		);
	});

	it('should render nothing if "src" is not provided', function() {
		var elem = TestUtils.renderIntoDocument(
			<DownloadTester />
		);
		var wrapper = TestUtils.scryRenderedDOMComponentsWithClass(
			elem,
			'vui-fileviewer-generic-download'
		);
		expect(wrapper.length).toBe(0);
	});

	it('should render outer DIV with expected class name', function() {
		var elem = TestUtils.renderIntoDocument(
			<DownloadTester src='some/path' />
		);

		var wrapper = TestUtils.findRenderedDOMComponentWithClass(
			elem,
			'vui-fileviewer-generic-download'
		);

		expect(TestUtils.isDOMComponent(wrapper)).toBe(true);
	});

	it('should render a "download" button', function() {
		var elem = TestUtils.renderIntoDocument(
			<DownloadTester src='some/path' />
		);
		var button = TestUtils.findRenderedDOMComponentWithTag(
			elem,
			'button'
		);
		expect(button).toBeDefined();
		expect(React.findDOMNode(button).textContent).toEqual('Download');
	});

	it('should navigate when clicked', function() {
		var elem = TestUtils.renderIntoDocument(
			<DownloadTester src='http://www.google.ca/' />
		);

		var button = TestUtils.findRenderedDOMComponentWithTag(
			elem,
			'button'
		);
		var buttonNode = React.findDOMNode(button);
		TestUtils.Simulate.click(buttonNode);
		expect(downloadStub.called).toBe(true);
	});

});
