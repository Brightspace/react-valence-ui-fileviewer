/* global PDFJS */
'use strict';

var React = require('react'),
	AlternateViewerPage = require('./AlternateViewerPage');

require('./pdfjs-lib');

var MAX_SCALE = 1.5;

var AlternativeViewer = React.createClass({
	propTypes: {
		src: React.PropTypes.string.isRequired,
		progressCallback: React.PropTypes.func,
		maxScale: React.PropTypes.number
	},
	getMaxScale: function() {
		return this.props.maxScale || MAX_SCALE;
	},
	componentDidMount: function() {
		this.updateProgress(10);
		document.addEventListener('scroll', this.onScroll);

		var url = this.props.src;
		PDFJS.getDocument(url).then(this.onDocumentLoaded);
	},
	updateProgress: function(progress) {
		if (this.props.progressCallback) {
			this.props.progressCallback(progress);
		}
	},
	getInitialState: function() {
		return {
			pages: [],
			pixelRatio: this.getPixelRatio(),
			scale: 1
		};
	},
	render: function() {
		var self = this;
		return (
			<div className="vui-fileviewer-pdf-alternate">
				{self.state.pages.map(function(page) {
					return <AlternateViewerPage key={page.ref} ref={page.ref}
						page={page}
						pixelRatio={self.state.pixelRatio}
						scale={self.state.scale}
						pageHeight={self.state.pageHeight}
						pageWidth={self.state.pageWidth} />;
				})}
			</div>
		);
	},
	getPixelRatio: function() {
		var ctx = document.createElement('canvas').getContext('2d'),
			devicePixelRatio = window.devicePixelRatio || 1,
			backingStorePixelRatio = 1;

		if (ctx) {
			backingStorePixelRatio =
				ctx.webkitBackingStorePixelRatio
				|| ctx.mozBackingStorePixelRatio
				|| ctx.msBackingStorePixelRatio
				|| ctx.oBackingStorePixelRatio
				|| ctx.backingStorePixelRatio
				|| 1;
		}

		return devicePixelRatio / backingStorePixelRatio;
	},
	onDocumentLoaded: function(pdf) {
		if (!pdf || !this.isMounted()) {
			return;
		}

		var self = this;

		self.updateProgress(70);

		pdf.getPage(1).then(function(page) {
			var unscaledViewport = page.getViewport(1),
				containerNode = React.findDOMNode(self),
				scale = Math.min(self.getMaxScale(), (containerNode.clientWidth - 20) / unscaledViewport.width),
				pageViewport = page.getViewport(scale),
				pages = [];

			for (var i = 1; i <= pdf.numPages; i++) {
				pages.push({
					isInView: i === 1,
					pageNumber: i,
					pdfPage: i === 1 ? page : null,
					ref: 'page_' + i,
					requested: i === 1
				});
			}

			self.setState({
				pdf: pdf,
				pageHeight: pageViewport.height,
				pageWidth: pageViewport.width,
				pages: pages,
				scale: scale
			});

			self.loadVisiblePages();

			self.updateProgress(100);
		});
	},
	loadPage: function(page) {
		var self = this;
		this.state.pdf.getPage(page.pageNumber).then(function(newPage) {
			var pageFromState = self.state.pages[page.pageNumber - 1];
			pageFromState.pdfPage = newPage;
			self.setState({
				pages: self.state.pages
			});
		});
	},
	onScroll: function() {
		this.loadVisiblePages();
	},
	loadVisiblePages: function() {
		var scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop,
			visibleAreaHeight = window.innerHeight;

		for (var page of this.state.pages) {
			var pageDOMNode = this.refs[page.ref].getDOMNode();

			page.isInView = this.isInView(pageDOMNode, scrollPosition, visibleAreaHeight);

			if (page.isInView && !page.requested) {
				page.requested = true;
				this.loadPage(page);
			}
		}
	},
	isInView: function(element, scrollPosition, visibleAreaHeight) {
		var visibleAreaStart = scrollPosition,
			visibleAreaEnd = visibleAreaStart + visibleAreaHeight,
			elementTop = element.offsetTop,
			elementBottom = elementTop + element.offsetHeight;

		return (elementTop >= visibleAreaStart && elementTop <= visibleAreaEnd)
			|| (elementBottom >= visibleAreaStart && elementBottom <= visibleAreaEnd)
			|| (elementTop <= visibleAreaStart && elementBottom >= visibleAreaEnd);
	}
});

module.exports = AlternativeViewer;
