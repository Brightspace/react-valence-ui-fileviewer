'use strict';

var React = require('react'),
	GenericViewer = require('../generic/viewer.js');

var NativeViewer = React.createClass({
	componentDidMount: function() {
		window.addEventListener('resize', this.handleResize);
		document.body.style.overflow = 'hidden';
		this.handleResize();
		this.updateProgress(100);
	},
	componentWillUnmount: function() {
		window.removeEventListener('resize', this.handleResize);
		document.body.style.overflow = 'visible';
	},
	getInitialState: function() {
		return { height: null };
	},
	handleResize: function() {
		var chromeHeight = (this.props.chromeElement) ? this.props.chromeElement.getBoundingClientRect().height : 0;
		var height = (window.innerHeight - chromeHeight);
		this.setState({height: height});
	},
	updateProgress: function(progress) {
		if (this.props.progressCallback) {
			this.props.progressCallback(progress);
		}
	},
	render: function() {
		var style = this.state.height ? { height: this.state.height } : null;
		return <object
			data={this.props.src}
			type="application/pdf"
			className="vui-fileviewer-pdf-native"
			ref="wrapper"
			style={style}>
			<GenericViewer {...this.props} />
		</object>;
	}
});

module.exports = NativeViewer;
