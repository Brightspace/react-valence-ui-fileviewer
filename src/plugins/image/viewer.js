import React from 'react';
import ReactDOM from 'react-dom';

var ImageViewer = React.createClass({
	propTypes: {
		src: React.PropTypes.string.isRequired,
		mimeType: React.PropTypes.string,
		token: React.PropTypes.string,
		resizeCallback: React.PropTypes.func
	},
	getInitialState: function() {
		return this.props.token
			? { src: '' }
			: { src: this.props.src };
	},
	componentWillMount: function() {
		this.updateProgress(0);
		if (this.props.resizeCallback) {
			this.props.resizeCallback('100%', true);
		}
	},
	componentDidMount: function() {
		if (this.props.token) {
			this.getDataUri(this.props.src, this.props.token)
				.then(uri => {
					this.setState({ src: uri });
					this.updateProgress(100);
				});
		} else {
			this.updateProgress(100);
		}
	},
	componentDidUpdate: function(prevProps) {
		if (this.props.src !== prevProps.src) {
			if (!this.props.token) {
				this.setState({ src: this.props.src });
				return;
			}
			this.getDataUri(this.props.src, this.props.token)
				.then(uri => this.setState({ src: uri }));
		}
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
		return fetch(href, {
			headers: {
				'Authorization': `Bearer ${token}`
			}
		}).then(res => {
			return res.arrayBuffer();
		}).then(buff => {
			let binary = '';
			const bytes = [].slice.call(new Uint8Array(buff));
			bytes.forEach(byte => binary += String.fromCharCode(byte));
			const base64String = window.btoa(binary);
			return `data:${this.props.mimeType};base64,${base64String}`;
		});
	},
	render: function() {
		// Wrapped in a Div in order to prevent it from resizing to fit the dimensions of the flex-box
		return <div className="vui-fileviewer-image-container"><img ref="image" src={this.state.src} alt="" className="vui-fileviewer-image" /></div>;
	}
});

export default ImageViewer;
