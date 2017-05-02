'use strict';

var React = require('react'),
	ReactDOM = require( 'react-dom' ),
	pdfjs = require('./pdfjs-lib'),
	pdfjsWorkerSrcInit = require('./pdfjsWorkerSrcInit');

var AlternativeViewer = React.createClass({
	propTypes: {
		src: React.PropTypes.string.isRequired,
		resizeCallback: React.PropTypes.func,
		progressCallback: React.PropTypes.func,
		withCredentials: React.PropTypes.bool
	},
	onPagesInit: function() {
		this.state.pdfViewer.currentScaleValue = 'page-width';
	},
	loadDocument: function() {
		var self = this;
		var withCredentials = this.props.withCredentials === undefined ||  this.props.withCredentials;
		pdfjs.getDocument({
			url: self.props.src,
			withCredentials: withCredentials
		}).then(function(pdfDocument) {
			self.state.pdfViewer.setDocument(pdfDocument);
			self.state.pdfLinkService.setDocument(pdfDocument, null);
			self.updateProgress(100);
		});
	},
	getInitialState: function() {
		return {
			container: null,
			pdfLinkService: null,
			pdfViewer: null
		};
	},
	shouldComponentUpdate: function() {
		return false;
	},
	componentDidMount: function() {
		if (this.props.resizeCallback) {
			this.props.resizeCallback('100%', false);
		}
		var container = ReactDOM.findDOMNode(this),
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

		pdfjsWorkerSrcInit().then(this.loadDocument);
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
				<div className="pdfViewer"></div>
			</div>
		);
	}
});

module.exports = AlternativeViewer;
