'use strict';

var React = require('react'),
	pdfjs = require('./pdfjs-lib'),
	pdfjsWorkerSrcInit = require('./pdfjsWorkerSrcInit');

var AlternativeViewer = React.createClass({
	propTypes: {
		src: React.PropTypes.string.isRequired,
		progressCallback: React.PropTypes.func
	},
	container: null,
	pdfLinkService: null,
	pdfViewer: null,
	onPagesInit: function() {
		this.pdfViewer.currentScaleValue = 'page-width';
	},
	loadDocument: function() {
		var self = this;
		pdfjs.getDocument({
			url: self.props.src,
			withCredentials: true
		}).then(function(pdfDocument) {
			self.pdfViewer.setDocument(pdfDocument);
			self.pdfLinkService.setDocument(pdfDocument, null);
			self.updateProgress(100);
		});
	},
	componentDidMount: function() {
		this.container = React.findDOMNode(this);
		this.pdfLinkService = new pdfjs.PDFLinkService();

		this.updateProgress(10);

		this.pdfViewer = new pdfjs.PDFViewer({
			container: this.container,
			linkService: this.pdfLinkService
		});
		this.pdfLinkService.setViewer(this.pdfViewer);

		this.container.addEventListener('pagesinit', this.onPagesInit);

		pdfjsWorkerSrcInit.init().then(this.loadDocument);
	},
	componentWillUnmount: function() {
		this.container.removeEventListener('pagesinit', this.onPagesInit);
		this.container = null;
		this.pdfLinkService = null;
		this.pdfViewer = null;
	},
	updateProgress: function(progress) {
		if (this.props.progressCallback) {
			this.props.progressCallback(progress, 'guess');
		}
	},
	render: function() {
		return (
			<div className="vui-fileviewer-pdf-alternate">
				<div ref="viewer" className="pdfViewer"></div>
			</div>
		);
	}
});

module.exports = AlternativeViewer;
