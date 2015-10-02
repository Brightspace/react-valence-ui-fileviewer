'use strict';

var React = require('react');


var NativeViewer = React.createClass({
	getInitialState: function() {
		return {
			mounted: false,
			height: null
		};
	},
	componentDidMount: function() {
		this.setState({mounted: true});
		window.addEventListener('resize', this.handleResize);
		this.updateProgress(0);
		this.handleResize();
	},
	componentWillUnmount: function() {
		window.removeEventListener('resize', this.handleResize);
	},
	getInitialState: function() {
		return { height: null };
	},
	handleResize: function() {
		var rect = React.findDOMNode(this.refs.wrapper).getBoundingClientRect();
		var height = (window.innerHeight - rect.top);
		this.setState({height: height});
	},
	updateProgress: function(progress) {
		// The iframe calls 'onLoad' both during 'render' and after mounting, we only want to use the second call
		// Can't use isMounted() because this function triggers during the render and makes react throw a warning
		if (this.props.progressCallback && this.state.mounted) {
			this.props.progressCallback(progress);
		}
	},
	render: function() {
		var style = this.state.height ? { height: this.state.height } : null;
		return <iframe
			onLoad={this.updateProgress(100)}
			src={this.props.src}
			className="vui-fileviewer-html-native"
			ref="wrapper"
			style={style}>
		</iframe>;
	}
});

module.exports = NativeViewer;
