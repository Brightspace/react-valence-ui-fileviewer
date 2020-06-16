'use strict';

var React = require('react'),
	ReactDOM = require( 'react-dom' );

var ImageViewer = React.createClass({
	propTypes: {
		src: React.PropTypes.string.isRequired,
		mimeType: React.PropTypes.string,
		token: React.PropTypes.string,
		resizeCallback: React.PropTypes.func
	},
	getInitialState: function() {
		if (this.props.token) {
			this.getDataUri(this.props.src, this.props.token);
			return { src: '' };
		}
		return { src: this.props.src };
	},
	componentWillMount: function() {
		this.updateProgress(0);
		if (this.props.resizeCallback) {
			this.props.resizeCallback('100%', true);
		}
	},
	componentDidMount: function() {
		this.updateProgress(100);
	},
	updateProgress: function(progress) {
		if (this.props.progressCallback) {
			this.props.progressCallback(progress, 'none');
		}
	},
	componentWillUnmount: function() {
		// without this, the file continues to download after being removed from the DOM
		ReactDOM.findDOMNode(this.refs.image).src = '';
	},
	getDataUri(href, token) {
		fetch(href, {
			headers: {
				'Authorization': `Bearer ${token}`
			}
		}).then(res => {
			return res.text();
		}).then(body => {
			var data = Buffer.from(body).toString('base64');
			var uri = `data:${this.props.mimeType};base64,${data}`;
			this.setState({ src: uri });
		});
	},
	render: function() {
		// Wrapped in a Div in order to prevent it from resizing to fit the dimensions of the flex-box
		return <div className="vui-fileviewer-image-container"><img ref="image" src={this.state.src} alt="" className="vui-fileviewer-image" /></div>;
	}
});

module.exports = ImageViewer;
