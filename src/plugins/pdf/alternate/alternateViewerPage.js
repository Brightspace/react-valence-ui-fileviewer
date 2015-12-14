'use strict';

var React = require('react');

var AlternateViewerPage = React.createClass({
	componentDidMount: function() {
		this.renderPdfPage(this.props.page.pdfPage);
	},
	componentWillReceiveProps: function(nextProps) {
		this.renderPdfPage(nextProps.page.pdfPage);
	},
	shouldComponentUpdate: function() {
		// pdf.js renders into the canvas element so as of right now we have no need for updating.
		return false;
	},
	canRenderPdfPage: function(pdfPage) {
		return !this.isRendering
			&& !this.isRendered
			&& typeof pdfPage === 'object'
			&& pdfPage !== null;
	},
	isRendering: false,
	isRendered: false,
	renderPdfPage: function(pdfPage) {
		if (!this.canRenderPdfPage(pdfPage)) {
			return;
		}

		this.isRendering = true;

		var self = this,
			canvas = this.refs.canvas.getDOMNode(),
			context = canvas.getContext('2d'),
			viewport = pdfPage.getViewport(this.props.scale * this.props.pixelRatio);

		var renderContext = {
			canvasContext: context,
			viewport: viewport
		};

		pdfPage.render(renderContext).promise.then(function() {
			self.isRendering = false;
			self.isRendered = true;
		});
	},
	render: function() {
		var canvasWidth = this.props.pageWidth * this.props.pixelRatio;
		var canvasHeight = this.props.pageHeight * this.props.pixelRatio;
		var canvasStyle = {
			width: this.props.pageWidth + 'px',
			height: this.props.pageHeight + 'px'
		};
		return (
			<div className="vui-fileviewer-pdf-alternate-page"
				width={this.props.pageWidth}
				height={this.props.pageHeight}>
				<canvas ref="canvas"
					width={canvasWidth}
					height={canvasHeight}
					style={canvasStyle} />
			</div>
		);
	}
});

module.exports = AlternateViewerPage;
