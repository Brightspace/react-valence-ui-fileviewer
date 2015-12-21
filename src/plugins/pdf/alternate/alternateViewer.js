'use strict';

var React = require('react'),
	pdfjs = require('./pdfjs-lib'),
	pdfjsWorkerSrcInit = require('./pdfjsWorkerSrcInit');

var AlternativeViewer = React.createClass({
	propTypes: {
		src: React.PropTypes.string.isRequired,
		progressCallback: React.PropTypes.func
	},
	onPagesInit: function() {
		this.state.pdfViewer.currentScaleValue = 'page-width';
	},
	loadDocument: function() {
		var self = this;
		pdfjs.getDocument({
			url: self.props.src,
			withCredentials: true
		}).then(function(pdfDocument) {
			self.state.pdfViewer.setDocument(pdfDocument);
			self.state.pdfLinkService.setDocument(pdfDocument, null);
			self.updateProgress(100);
		});
	},
	shouldComponentUpdate: function() {
		return false;
	},
	componentDidMount: function() {
		var container = React.findDOMNode(this),
			pdfLinkService = new pdfjs.PDFLinkService();

		this.updateProgress(10);

		var pdfViewer = new pdfjs.PDFViewer({
			container: container,
			linkService: pdfLinkService
		});
		pdfLinkService.setViewer(this.pdfViewer);

		container.addEventListener('pagesinit', this.onPagesInit);

		this.setState({
			container: container,
			pdfLinkService: pdfLinkService,
			pdfViewer: pdfViewer
		});

		pdfjsWorkerSrcInit.init().then(this.loadDocument);
	},
	componentWillUnmount: function() {
		this.state.container.removeEventListener('pagesinit', this.onPagesInit);
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
