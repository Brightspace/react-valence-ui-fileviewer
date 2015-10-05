'use strict';

var React = require('react');

var NativeViewer = React.createClass({
	componentDidMount: function() {
		window.addEventListener('resize', this.handleResize);
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
	render: function() {
		var style = this.state.height ? { height: this.state.height } : null;
		return <iframe
			src={this.props.src}
			// this forces react to destroy the iframe instead of updating it when the src changes
			key={this.props.src}
			type="application/html"
			className="vui-fileviewer-html-native"
			ref="wrapper"
			style={style}>
		</iframe>;
	}
});

module.exports = NativeViewer;
