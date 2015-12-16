'use strict';

var React = require('react'),
	pdfjs = require('./pdfjs-lib');

var AlternativeViewer = React.createClass({
	propTypes: {
		src: React.PropTypes.string.isRequired,
		progressCallback: React.PropTypes.func
	},
	container: null,
	pdfViewer: null,
	onPagesInit: function() {
		this.pdfViewer.currentScaleValue = 'page-width';
	},
	componentDidMount: function() {
		var self = this,
			url = this.props.src,
			pdfLinkService = new pdfjs.PDFLinkService();

		this.container = React.findDOMNode(this);

		this.updateProgress(10);

		this.pdfViewer = new pdfjs.PDFViewer({
			container: this.container,
			linkService: pdfLinkService
		});
		pdfLinkService.setViewer(this.pdfViewer);

		this.container.addEventListener('pagesinit', this.onPagesInit);

		pdfjs.getDocument({
			url: url,
			withCredentials: true
		}).then(function(pdfDocument) {
			self.pdfViewer.setDocument(pdfDocument);
			pdfLinkService.setDocument(pdfDocument, null);
			self.updateProgress(100);
		});
	},
	componentWillUnmount: function() {
		this.container.removeEventListener('pagesinit', this.onPagesInit);
		this.container = null;
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
