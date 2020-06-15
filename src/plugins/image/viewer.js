'use strict';

var token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IjRjYWU3ZGMzLWMzN2MtNDViNy1hZmZjLWRlMzk4ZGU4NGMxNiJ9.eyJpc3MiOiJodHRwczovL2FwaS5icmlnaHRzcGFjZS5jb20vYXV0aCIsImF1ZCI6Imh0dHBzOi8vYXBpLmJyaWdodHNwYWNlLmNvbS9hdXRoL3Rva2VuIiwiZXhwIjoxNTkyMjQ1MjA2LCJuYmYiOjE1OTIyNDE2MDYsInN1YiI6IjE2OSIsInRlbmFudGlkIjoiMzBiYjZhZjgtODdhZi00ODcwLTk0ZjMtYmNlNmEzNjZlYzkzIiwiYXpwIjoiRXhwYW5kb0NsaWVudCIsInNjb3BlIjoiKjoqOioiLCJqdGkiOiJiZTRiMDljYS00ZDQ0LTRhMmItYTg3MC03ODU2OTRmNjBlNDkifQ.QuPsR7xpGMAwuLe8v-ILwgmRXMPyDziAVib_jgYEZGptwA9FGVYFafRspsqz9V8MytAjHQDolySda8qyFfPNGcq07HLz11t2Sz4Zt_K8DS2jE4tWlbWMq56C_wmcVMqoU9gOHG4JIrYfwNNH6aT02VT4KKoBy4Mn-mwUZOF4XQKd9M_JQN0MSWmp1vISNlArHYkDUhmyk6M0C2FP3a3pAy831OHpddYIvV51QHyJSoslIGh9-sI-90HZOp8uO99AAEUE-T28l0nIE1mviIMLKQ1LrrKFrN9TT4WP_WEhgKrjOmw4jJiyH7soavN3CMmNQPOqP2CFHTQ1_EWBNkxHyA';

var React = require('react'),
	ReactDOM = require( 'react-dom' );

var ImageViewer = React.createClass({
	propTypes: {
		src: React.PropTypes.string.isRequired,
		resizeCallback: React.PropTypes.func
	},
	getInitialState: function() {
		if (token) {
			this.getDataUri(this.props.src);
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
	getDataUri(href) {
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
